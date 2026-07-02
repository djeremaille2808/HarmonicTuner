import { A4, DEFAULT_COLORS, fifthColor, majorThirdColor, minorThirdColor, removeCookie, seventhColor, setFifthColor, setMajorThirdColor, setMinorThirdColor, setSeventhColor } from './settings-storage.js';
import { buttons, buttonsLength } from './data/notes-config.js';
			//Module analyse vibrato
			// UI elements
			const detectedNoteSpan = document.getElementById("detectedNote");
			const vibratoRateDisplay = document.getElementById("vibratoRateDisplay");
			const vibratoDepthDisplay = document.getElementById("vibratoDepthDisplay");
			const speedNeedleElement = document.getElementById("speed-needle");
			const amplitudeNeedleElement = document.getElementById("amplitude-needle");
			const hzValueElement = document.getElementById("hzValue");

			// État de l'analyse vibrato : plus de capture micro / AudioContext dédiés.
			// Le calcul est cadencé par la boucle de détection de pitch de js/mic-tuner.js,
			// qui possède déjà le seul micro et AudioContext partagés pour l'analyse audio.
			export let vibratoActive = false;
			export function setVibratoActive(v) { vibratoActive = v; }
			let pitchHistory = [];
			let lockedMidiNote = null;
			let lockedFrequency = 0;
			let lastNoteChangeTime = 0;

			// --- Configuration ---
			const A4_FREQUENCY = A4;
			const historyDuration = 1.0;
			const MIN_DEPTH_FOR_RATE_CALC = 4;
			const MAX_CENTS_DEVIATION = 90; // Maximum allowed cents deviation for calculations
			// Added: Vibrato rate filtering constants
			const MIN_VIBRATO_RATE = 3.0; // Hz
			const MAX_VIBRATO_RATE = 8.0; // Hz
			const MIN_PERIOD = 1 / MAX_VIBRATO_RATE; // 0.125 seconds
			const MAX_PERIOD = 1 / MIN_VIBRATO_RATE; // ~0.333 seconds

			// --- 60 FPS Needle Animation Variables ---
			// Speed needle
			let speedNeedleTargetPosition = 50; // Default position (50%)
			let speedNeedleCurrentPosition = 50; // Current visual position
			let lastSpeedNeedleUpdateTime = 0;
			let speedNeedleAnimationId = null;
			// Amplitude needle
			let amplitudeNeedleTargetPosition = 50; // Default position (50%)
			let amplitudeNeedleCurrentPosition = 50; // Current visual position
			let lastAmplitudeNeedleUpdateTime = 0;
			let amplitudeNeedleAnimationId = null;

			// --- Speed Needle Update Function (Modified for 60 FPS) ---
			function updateSpeedNeedlePosition(rate) {
				const minHz = 4.0;
				const maxHz = 7.0;
				const range = maxHz - minHz;
				const clampedRate = Math.max(minHz, Math.min(maxHz, rate));
				const positionRatio = (clampedRate - minHz) / range;
				// Store the target position instead of directly updating the DOM
				speedNeedleTargetPosition = (1 - positionRatio) * 100;
				lastSpeedNeedleUpdateTime = performance.now();
				// Start the animation loop if it's not running
				if (!speedNeedleAnimationId) {
					animateSpeedNeedle();
				}
			}

			// --- Amplitude Needle Update Function ---
			function updateAmplitudeNeedlePosition(depth) {
				const minCents = 4; // Updated minimum amplitude
				const maxCents = 36; // Updated maximum amplitude
				const clampedDepth = Math.max(minCents, Math.min(maxCents, depth));
				const range = maxCents - minCents;
				const positionRatio = (clampedDepth - minCents) / range;
				// Store the target position instead of directly updating the DOM
				amplitudeNeedleTargetPosition = (1 - positionRatio) * 100;
				lastAmplitudeNeedleUpdateTime = performance.now();
				// Start the animation loop if it's not running
				if (!amplitudeNeedleAnimationId) {
					animateAmplitudeNeedle();
				}
			}

			// --- Sync Amplitude Needle with Speed Needle ---
			function syncAmplitudeNeedleWithSpeedNeedle() {
				amplitudeNeedleTargetPosition = speedNeedleTargetPosition;
				lastAmplitudeNeedleUpdateTime = performance.now();
				// Start the animation loop if it's not running
				if (!amplitudeNeedleAnimationId) {
					animateAmplitudeNeedle();
				}
			}

			// --- 60 FPS Animation Function for Speed Needle ---
			function animateSpeedNeedle() {
				const now = performance.now();
				const elapsed = now - lastSpeedNeedleUpdateTime;
				// Calculate interpolation factor (0 to 1)
				// Adjust 0.2 to control how quickly the needle catches up
				const factor = Math.min(1, elapsed / 100); // 100ms to reach target
				// Interpolate between current and target position
				speedNeedleCurrentPosition = speedNeedleCurrentPosition + (speedNeedleTargetPosition - speedNeedleCurrentPosition) * factor;
				// Update the DOM directly
				if (speedNeedleElement) {
					speedNeedleElement.style.top = `${speedNeedleCurrentPosition}%`;
				}
				// Continue the animation loop
				speedNeedleAnimationId = requestAnimationFrame(animateSpeedNeedle);
				// Stop the animation if we've reached the target and no recent updates
				if (Math.abs(speedNeedleCurrentPosition - speedNeedleTargetPosition) < 0.1 && elapsed > 200) {
					cancelAnimationFrame(speedNeedleAnimationId);
					speedNeedleAnimationId = null;
				}
			}

			// --- 60 FPS Animation Function for Amplitude Needle ---
			function animateAmplitudeNeedle() {
				const now = performance.now();
				const elapsed = now - lastAmplitudeNeedleUpdateTime;
				// Calculate interpolation factor (0 to 1)
				const factor = Math.min(1, elapsed / 100); // 100ms to reach target
				// Interpolate between current and target position
				amplitudeNeedleCurrentPosition = amplitudeNeedleCurrentPosition + (amplitudeNeedleTargetPosition - amplitudeNeedleCurrentPosition) * factor;
				// Update the DOM directly
				if (amplitudeNeedleElement) {
					amplitudeNeedleElement.style.top = `${amplitudeNeedleCurrentPosition}%`;
				}
				// Continue the animation loop
				amplitudeNeedleAnimationId = requestAnimationFrame(animateAmplitudeNeedle);
				// Stop the animation if we've reached the target and no recent updates
				if (Math.abs(amplitudeNeedleCurrentPosition - amplitudeNeedleTargetPosition) < 0.1 && elapsed > 200) {
					cancelAnimationFrame(amplitudeNeedleAnimationId);
					amplitudeNeedleAnimationId = null;
				}
			}

			// --- Pitch Conversion Functions ---
			function frequencyToMidi(frequency) {
				if (frequency <= 0) return -1;
				return Math.round(69 + 12 * Math.log2(frequency / A4_FREQUENCY));
			}

			function midiToFrequency(midi) {
				return A4_FREQUENCY * Math.pow(2, (midi - 69) / 12);
			}

			function frequencyToCents(frequency, referenceFrequency) {
				if (frequency <= 0 || referenceFrequency <= 0) return 0;
				return 1200 * Math.log2(frequency / referenceFrequency);
			}

			// --- Reset & Cleanup Functions ---
			export function resetAnalysis() {
				pitchHistory = [];
				lockedMidiNote = null;
				lockedFrequency = 0;
				lastNoteChangeTime = 0;
				detectedNoteSpan.textContent = "–";
				vibratoRateDisplay.textContent = "0.0";
				vibratoDepthDisplay.textContent = "0";
				// Reset needle positions for 60 FPS implementation
				speedNeedleTargetPosition = 50;
				speedNeedleCurrentPosition = 50;
				updateSpeedNeedlePosition(5.5);
				amplitudeNeedleTargetPosition = 50;
				amplitudeNeedleCurrentPosition = 50;
				updateAmplitudeNeedlePosition(20); // Updated reset position to 20 cents
			}

			function stopAudio() {
				// Cancel any running needle animations
				if (speedNeedleAnimationId) {
					cancelAnimationFrame(speedNeedleAnimationId);
					speedNeedleAnimationId = null;
				}
				if (amplitudeNeedleAnimationId) {
					cancelAnimationFrame(amplitudeNeedleAnimationId);
					amplitudeNeedleAnimationId = null;
				}
				// Le micro/AudioContext partagés sont gérés par mic-tuner.js, on se contente
				// ici de désactiver le calcul du vibrato dans la boucle de détection de pitch.
				vibratoActive = false;
			}

			// --- Audio Setup ---
			// NOTE: audioCtx doit être défini dans le scope global avant cet appel.


			export function stopAnalysis() {
				stopAudio();
				resetAnalysis();
				document.getElementById("vibrato-analyzer-container").style.display = "none";
			}

			// --- Peak and Trough Finding Logic ---
			function findPeaksAndTroughs(data) {
				const peaks = [];
				const troughs = [];
				if (!data || data.length < 3) {
					return {
						peaks,
						troughs
					};
				}
				for (let i = 1; i < data.length - 1; i++) {
					const prev = data[i - 1].cents;
					const curr = data[i].cents;
					const next = data[i + 1].cents;
					if (curr > prev && curr > next) {
						peaks.push({
							index: i,
							value: curr,
							time: data[i].time
						});
					} else if (curr < prev && curr < next) {
						troughs.push({
							index: i,
							value: curr,
							time: data[i].time
						});
					}
				}
				return {
					peaks,
					troughs
				};
			}

			// --- Analyse du vibrato, appelée à chaque tick de la boucle de détection de pitch ---
			export function tickVibratoAnalysis() {
				if (!vibratoActive) return;

				const pitch = parseFloat(hzValueElement.textContent); // Élément mis en cache pour éviter une requête DOM répétée

				if (!isFinite(pitch) || pitch <= 0) return;

				const now = performance.now() / 1000; // Horloge partagée avec la boucle de détection de pitch

				const currentMidiNote = frequencyToMidi(pitch);
				const currentNoteFrequency = midiToFrequency(currentMidiNote);

				// Calculate cents deviation from locked frequency
				let cents = 0;
				if (lockedMidiNote !== null) {
					cents = frequencyToCents(pitch, lockedFrequency);
				}

				// Check if we need to update the locked note (if deviation is too large or no note is locked)
				if (lockedMidiNote === null || (Math.abs(cents) > MAX_CENTS_DEVIATION && now - lastNoteChangeTime > 0.15)) {
					lockedMidiNote = currentMidiNote;
					lockedFrequency = currentNoteFrequency;
					lastNoteChangeTime = now;
					pitchHistory = [];

					const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
					const octave = Math.floor(lockedMidiNote / 12) - 1;
					const noteName = noteNames[lockedMidiNote % 12] + octave;
					detectedNoteSpan.textContent = `${noteName} (${lockedFrequency.toFixed(1)} Hz)`;

					// Recalculate cents relative to the new locked frequency
					cents = frequencyToCents(pitch, lockedFrequency);
				}

				// Only add to pitch history if within the allowed deviation range
				if (Math.abs(cents) <= MAX_CENTS_DEVIATION) {
					pitchHistory.push({
						time: now,
						cents: cents
					});
				}

				// Clean up old pitch history points
				while (pitchHistory.length > 1 && pitchHistory[0].time < now - historyDuration) {
					pitchHistory.shift();
				}

				let calculatedRate = 0;
				let vibratoDepth = 0;

				if (pitchHistory.length >= 3) {
					const centsValues = pitchHistory.map(p => p.cents);
					const minCents = Math.min(...centsValues);
					const maxCents = Math.max(...centsValues);
					vibratoDepth = (maxCents - minCents) / 2;

					if (vibratoDepth >= MIN_DEPTH_FOR_RATE_CALC) {
						const {
							peaks,
							troughs
						} = findPeaksAndTroughs(pitchHistory);

						const periods = [];
						if (peaks.length >= 2) {
							for (let i = 1; i < peaks.length; i++) {
								const period = peaks[i].time - peaks[i - 1].time;
								if (period >= MIN_PERIOD && period <= MAX_PERIOD) {
									periods.push(period);
								}
							}
						}
						if (troughs.length >= 2) {
							for (let i = 1; i < troughs.length; i++) {
								const period = troughs[i].time - troughs[i - 1].time;
								if (period >= MIN_PERIOD && period <= MAX_PERIOD) {
									periods.push(period);
								}
							}
						}

						if (periods.length > 0) {
							const averagePeriod = periods.reduce((sum, p) => sum + p, 0) / periods.length;
							if (averagePeriod > 0) {
								calculatedRate = (1 / averagePeriod); // to get beats per minute
							}
						}
					}
				}

				// Affichage et mise à jour des aiguilles
				vibratoRateDisplay.textContent = (calculatedRate).toFixed(1);
				updateSpeedNeedlePosition(calculatedRate);

				// Check if valid vibrato is detected (depth ≥4 cents AND rate 3-8 Hz)
				const isValidVibrato = vibratoDepth >= MIN_DEPTH_FOR_RATE_CALC && calculatedRate >= MIN_VIBRATO_RATE && calculatedRate <= MAX_VIBRATO_RATE;

				if (isValidVibrato) {
					// Update both the amplitude display and needle when valid vibrato is detected
					vibratoDepthDisplay.textContent = vibratoDepth.toFixed(0);
					updateAmplitudeNeedlePosition(vibratoDepth);
				} else {
					// Keep amplitude display at 0 and sync needle with speed when no valid vibrato
					vibratoDepthDisplay.textContent = "0";
					syncAmplitudeNeedleWithSpeedNeedle();
				}
			}

			// Initial setup
			resetAnalysis();
			




			export function resetColors() {
				// 1. Mettre à jour les variables globales avec les valeurs par défaut
				setFifthColor(DEFAULT_COLORS.fifth);
				setMajorThirdColor(DEFAULT_COLORS.majorThird);
				setMinorThirdColor(DEFAULT_COLORS.minorThird);
				setSeventhColor(DEFAULT_COLORS.seventh);

				// 2. Réinitialiser les préférences stockées
				removeCookie('fifthsColor');
				removeCookie('majThirdsColor');
				removeCookie('minThirdsColor');
				removeCookie('seventhsColor');

				// Facultatif : Réinitialiser la valeur des sélecteurs de couleurs (input[type="color"])
				document.getElementById("fifths").value = fifthColor;
				document.getElementById("majorThirds").value = majorThirdColor;
				document.getElementById("minorThirds").value = minorThirdColor;
				document.getElementById("seventh").value = seventhColor;

				// 3. Parcourir les boutons et mettre à jour le DOM
				for (let i = 1; i <= buttonsLength; i++) {
					const button = buttons[i];
					let newColor;

					// Déterminer la nouvelle couleur basée sur le type de la note (quinte, tierce, etc.)
					switch (button.type) {
						case 'fifth':
							newColor = fifthColor;
							break;
						case 'majorThird':
							newColor = majorThirdColor;
							break;
						case 'minorThird':
							newColor = minorThirdColor;
							break;
						case 'seventh':
							newColor = seventhColor;
							break;
						default:
							// Laisser la couleur telle quelle si le type n'est pas reconnu
							newColor = button.color; 
							break;
					}

					// Mettre à jour l'objet de données et le style DOM
					button.color = newColor;
					document.getElementById("note-definition-" + i).style.background = newColor;
					document.getElementById("note-name-display-" + i).style.background = newColor;
				}

			}

// Exposition globale pour le handler inline du HTML
window.resetColors = resetColors;
