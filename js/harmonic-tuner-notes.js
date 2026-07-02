import { buttons, buttonsLength, refreshFrequenciesValues, tnotes } from './data/notes-config.js';
import { audioCtx } from './vibrato-start.js';
import { getCookieValue, majorThirdColor, minorThirdColor, refreshRateTunerCents, refreshRateTunerSystem, seventhColor, temperedDiapason } from './settings-storage.js';

			//Fonctionnalités
			
			//demande si l'utilisateur veut vraiment quitter
			//window.onbeforeunload = function(event) {
				//event.preventDefault();
				//event.returnValue = 'Voulez-vous vraiment quitter ?';
			//};
			// Fonction qui joue la note du bouton dont l'id est donné en paramètre
			export let stopped = false;
			export let stoppedNote;
			export let stoppedTnote;

			export function playNote(buttonId) {
				// Vérifie que la fréquence d'échantillonage est de 44.1 kHz
				//	if (audioCtx.sampleRate !== 44100) {
				//		alert("Attention : la fréquence d'échantillonage de votre appareil est actuellement définie sur " + audioCtx.sampleRate + "Hz. \n Les hauteurs de note risquent de ne pas être correctes.\n\nParametrez votre appareil sur 44 100Hz et rafraichissez la page.");
				//	}
				stopped = false;
				stoppedNote = null;
				stoppedTnote = null;
				//vérifie si la case stopper autres notes est cochée
				let stopCurrentNote = document.getElementById('stop-current-note').checked;
				if (!stopCurrentNote) {
					stopAllNotes();
					stopAllTemperedNotes();
				}
				// Si la note est déjà en train d'être jouée, arrête-la avant de la rejouer
				let buttonColor = buttons[buttonId]['color'];
				if (buttons[buttonId].isPlaying) {
					stopNote(buttonId);
				}
				buttons[buttonId].isPlaying = true; // Indique que la note est en train d'être jouée
				buttons[buttonId].oscillator = audioCtx.createOscillator();
				if (getCookieValue("soundSelect")) {
					buttons[buttonId].oscillator.type = getCookieValue("soundSelect");
					document.getElementById("sound-select").value=getCookieValue("soundSelect");
				} else {	
					buttons[buttonId].oscillator.type = document.getElementById("sound-select").value;
				}
				buttons[buttonId].oscillator.frequency.value = buttons[buttonId].frequency;
				buttons[buttonId].oscillator.connect(audioCtx.destination);
				buttons[buttonId].gainNode = audioCtx.createGain();
				buttons[buttonId].oscillator.connect(buttons[buttonId].gainNode);
				buttons[buttonId].gainNode.connect(audioCtx.destination);
				// Recupère la valeur du slider correspondant à la note jouée
				const sliderbuttonId = buttonId;
				const volumeSlider = document.getElementById("slider" + sliderbuttonId);
				// Assigne la valeur du slider au gain node
				buttons[buttonId].gainNode.gain.value = volumeSlider.value / 100 * 1.3 - 1;
				// Note : les écouteurs input/dblclick du slider sont attachés une seule fois, dans ui-mixer.js
				// Affiche la valeur du slider
				const outputId = "slider-value" + sliderbuttonId;
				const output = document.getElementById(outputId);
				output.innerHTML = volumeSlider.value;
				//Affiche le slider
				volumeSlider.style.display = "block";
				// Démarre l'oscillateur
				buttons[buttonId].oscillator.start();
				//fading effect
				buttons[buttonId].gainNode.gain.setValueAtTime(-1, audioCtx.currentTime);
				buttons[buttonId].gainNode.gain.exponentialRampToValueAtTime(-0.4, audioCtx.currentTime + 0.25);
				//changement opacités logos
				let noteNameStyle = document.getElementById('note-name-display-' + buttonId);
				let noteDefStyle = document.getElementById('note-definition-' + buttonId);
				noteNameStyle.style.filter = 'brightness(1.1) saturate(1.1)';
				noteDefStyle.style.filter = 'brightness(1.1) saturate(1.1)';
				document.getElementById("slider-container-" + [buttonId]).style.display = "block";
				document.getElementById("slider-container-" + [buttonId]).style.background = buttons[buttonId].color;
				document.getElementById("slider-name" + [buttonId]).innerHTML = buttons[buttonId].name;
			}
			//meme fonction pour notes tempérées
			export function playTemperedNote(tnoteId) {
				// Vérifie que la fréquence d'échantillonage est de 44.1 kHz
				//	if (audioCtx.sampleRate !== 44100) {
				//		alert("Attention : la fréquence d'échantillonage de votre appareil est actuellement définie sur " + audioCtx.sampleRate + "Hz. \n Les hauteurs de note risquent de ne pas être correctes.\n\nParametrez votre appareil sur 44 100Hz et rafraichissez la page.");
				//	}
				//vérifie si la case stopper autres notes est cochée
				let stopCurrentNote = document.getElementById('stop-current-note').checked;
				if (!stopCurrentNote) {
					stopAllTemperedNotes();
					stopAllNotes();
				}
				stopped = false;
				stoppedNote = null;
				stoppedTnote = null;
				// Si la note est déjà en train d'être jouée, arrête-la avant de la rejouer
				let temperedNoteColor = tnotes[tnoteId]['color'];
				if (tnotes[tnoteId].isPlaying) {
					stopNote(tnoteId);
				}
				let slider = document.getElementById("frequency-slider");
				let cents = parseInt(slider.value);
				let newFrequency = tnotes[tnoteId].frequency * Math.pow(2, (tnotes[tnoteId].centsoffsetSlider / 1200));
				tnotes[tnoteId].frequency = newFrequency;
				tnotes[tnoteId].isPlaying = true; // Indique que la note est en train d'être jouée
				tnotes[tnoteId].oscillator = audioCtx.createOscillator();
				if (getCookieValue("soundSelect")) {
					tnotes[tnoteId].oscillator.type = getCookieValue("soundSelect");
					document.getElementById("sound-select").value=getCookieValue("soundSelect")
				} else {
					tnotes[tnoteId].oscillator.type = document.getElementById("sound-select").value;
				}
				tnotes[tnoteId].oscillator.frequency.value = tnotes[tnoteId].frequency;
				tnotes[tnoteId].oscillator.connect(audioCtx.destination);
				tnotes[tnoteId].gainNode = audioCtx.createGain();
				tnotes[tnoteId].oscillator.connect(tnotes[tnoteId].gainNode);
				tnotes[tnoteId].gainNode.connect(audioCtx.destination);
				// Recupère la valeur du slider correspondant à la note jouée
				const volumeSlider = document.getElementById("tslider" + tnoteId);
				// Assigne la valeur du slider au gain node
				tnotes[tnoteId].gainNode.gain.value = volumeSlider.value / 100 * 1.3 - 1;
				// Note : les écouteurs input/dblclick du slider sont attachés une seule fois, dans ui-mixer.js
				// Affiche la valeur du slider
				const outputId = "tslider-value" + tnoteId;
				const output = document.getElementById(outputId);
				output.innerHTML = volumeSlider.value;
				//Affiche le slider
				volumeSlider.style.display = "block";
				// Démarre l'oscillateur
				tnotes[tnoteId].oscillator.start();
				//fading effect
				tnotes[tnoteId].gainNode.gain.setValueAtTime(-1, audioCtx.currentTime);
				tnotes[tnoteId].gainNode.gain.exponentialRampToValueAtTime(-0.4, audioCtx.currentTime + 0.25);
				//Prend en compte la valeur du slider
				// Note : le slider de fréquence (#frequency-slider) a un écouteur unique, attaché
				// une seule fois dans ui-frequency-slider.js, qui applique son décalage à toutes
				// les notes tempérées actuellement jouées via leur frequencyParam.
				tnotes[tnoteId].frequencyParam = tnotes[tnoteId].oscillator.frequency;
				//apparition dans micer des slider
				document.getElementById("tslider-container-" + tnoteId).style.display = "block";
				document.getElementById("tslider-container-" + tnoteId).style.background = tnotes[tnoteId].color;
				document.getElementById("tslider-name" + tnoteId).innerHTML = tnotes[tnoteId].tname;
				document.getElementById("tnote-name-display-" + tnoteId).style.color = "#5494d9";
			}
			// Fonction qui arrête la note du bouton donné en paramètre
			export function stopNote(buttonId) {
				buttons[buttonId].isPlaying = false; // Indique que la note n'est plus en train d'être jouée
				buttons[buttonId].oscillator.stop();
				buttons[buttonId].oscillator.disconnect();
				upfifth = 0;
				downfifth = 0;
				upTfifth = 0;
				downTfifth = 0;
				buttons[buttonId].centsoffset = 0;
				//changement opacités logos
				let noteNameStyle = document.getElementById('note-name-display-' + buttonId);
				let noteDefStyle = document.getElementById('note-definition-' + buttonId);
				noteNameStyle.style.filter = 'brightness(0.9) saturate(0.95)';
				noteDefStyle.style.filter = 'brightness(0.9) saturate(0.95)';
				document.getElementById("slider-container-" + [buttonId]).style.display = "none";
			}

			export function stopTemperedNote(tnoteId) {
				tnotes[tnoteId].isPlaying = false; // Indique que la note n'est plus en train d'être jouée
				tnotes[tnoteId].oscillator.stop();
				tnotes[tnoteId].oscillator.disconnect();
				document.getElementById("tslider-container-" + tnoteId).style.display = "none";
				document.getElementById("tnote-name-display-" + tnoteId).style.color = "black";
				upfifth = 0;
				downfifth = 0;
				upTfifth = 0;
				downTfifth = 0;
				tnotes[tnoteId].centsoffset = 0;
			}
			// Fonction qui arrête toutes les notes et réinitialise leur état (octave, 5tes)
			export function stopAllNotes() {
				// Parcours tous les boutons
				let stoppedAny = false;
				for (let buttonId in buttons) {
					// Si le bouton est en train d'être joué, arrête la note
					if (buttons[buttonId].isPlaying) {
						stopNote(buttonId);
						stoppedAny = true;
					}
				}
				// Recalculé une seule fois après la boucle plutôt qu'à chaque note arrêtée
				if (stoppedAny) {
					refreshFrequenciesValues();
				}
			}

			export function stopAllTemperedNotes() {
				let stoppedAny = false;
				for (let tnoteId in tnotes) {
					if (tnotes[tnoteId].isPlaying) {
						stopTemperedNote(tnoteId);
						stoppedAny = true;
					}
				}
				if (stoppedAny) {
					refreshFrequenciesValues();
				}
			}
			// Fonction qui monte d'une octave la note du bouton donné en paramètre
			export function upOctave(buttonId) {
				buttons[buttonId].frequency *= 2;
				buttons[buttonId].centsoffset -= 1200; // Retire 1200 cents pour compenser l'octave
				buttons[buttonId].oscillator.frequency.value = buttons[buttonId].frequency;
			}
			// Fonction qui monte d'une octave la note du bouton donné en paramètre
			let upfifth = 0;
			let downfifth = 0;

			export function upFifth(buttonId) {
				//console.log('up:' + upfifth + ' - down: ' + downfifth);
				if (upfifth % 2 == 0) {
					upfifth += 1;
					downfifth -= 1;
					buttons[buttonId].frequency *= 3 / 2;
				} else {
					upfifth += 1;
					downfifth -= 1;
					buttons[buttonId].frequency *= 3 / 2 / 2;
				}
				buttons[buttonId].centsoffset -= 702; // Retire 702 cents pour compenser la quinte
				buttons[buttonId].oscillator.frequency.value = buttons[buttonId].frequency;
				//console.log('up:' + upfifth + ' - down: ' + downfifth);
			}
			//Memes fonctions pour notes tempérées
			export function upTemperedOctave(tnoteId) {
				tnotes[tnoteId].frequency *= 2;
				tnotes[tnoteId].centsoffset -= 1200; // Retire 1200 cents pour compenser l'octave
				tnotes[tnoteId].oscillator.frequency.value = tnotes[tnoteId].frequency;
			}
			let upTfifth = 0;
			let downTfifth = 0;

			export function upTemperedFifth(tnoteId) {
				
				//console.log('up:' + upTfifth + ' - down: ' + downTfifth);
				if (upTfifth % 2 == 0) {
					upTfifth += 1;
					downTfifth -= 1;
					tnotes[tnoteId].frequency *= Math.pow(2, 700 / 1200);
					
				} else {
					upTfifth += 1;
					downTfifth -= 1;
					tnotes[tnoteId].frequency /= Math.pow(2, 500 / 1200);
				}
				tnotes[tnoteId].centsoffset -= 700; // Retire 700 cents pour compenser l'octave
				tnotes[tnoteId].oscillator.frequency.value = tnotes[tnoteId].frequency;
			}
			// Fonction qui descend d'une octave la note du bouton donné en paramètre	
			export function downOctave(buttonId) {
				buttons[buttonId].frequency /= 2;
				buttons[buttonId].centsoffset += 1200; // Ajoute 1200 cents pour compenser l'octave
				buttons[buttonId].oscillator.frequency.value = buttons[buttonId].frequency;
			}

			export function downFifth(buttonId) {
				if (downfifth % 2 == 0) {
					downfifth += 1;
					upfifth -= 1;
					buttons[buttonId].frequency *= 4 / 3;
				} else {
					downfifth += 1;
					upfifth -= 1;
					buttons[buttonId].frequency *= 4 / 3 / 2;
				}
				buttons[buttonId].centsoffset += 702; // Ajoute 702 cents pour compenser l'octave
				buttons[buttonId].oscillator.frequency.value = buttons[buttonId].frequency;
				//console.log(upfifth + '-' + downfifth);
			}

			export function downTemperedOctave(tnoteId) {
				tnotes[tnoteId].frequency /= 2;
				tnotes[tnoteId].centsoffset += 1200; // Retire 1200 cents pour compenser l'octave
				tnotes[tnoteId].oscillator.frequency.value = tnotes[tnoteId].frequency;
			}
			

			export function downTemperedFifth(tnoteId) {
				downTfifth -= 1;
				upTfifth += 1;
				if (downTfifth % 2 == 0) {
					tnotes[tnoteId].frequency /= Math.pow(2, 700 / 1200);
					
				} else {
					tnotes[tnoteId].frequency *= Math.pow(2, 500 / 1200);
				}
				tnotes[tnoteId].centsoffset += 700; // Retire 1200 cents pour compenser l'octave
				tnotes[tnoteId].oscillator.frequency.value = tnotes[tnoteId].frequency;
			}
			
			
			
			//Fonction qui arrête l'accordeur et le script pour économie ressources
			 
			export function stopTuner() {
				let container = document.querySelector('#container');
				
				//stopTunerScript();
				
				clearInterval(intervalIdTuner);
				clearInterval(intervalId2);
				// Obtenir l'élément HTML de l'aiguille
				let centsDisplay = document.getElementById('cents');
				let visualizerDisplay = document.getElementById('visualizer-container');
				let pointerDisplay = document.getElementById('pointer-container');
				let containerTransform = document.getElementById('container');
				// Mettre à jour la propriété transform de l'élément
				centsDisplay.style.display = 'none';
				visualizerDisplay.style.display = 'none';
				pointerDisplay.style.opacity = '0';
				containerTransform.style.transform = 'translate(-50%, -50%) rotate(0deg)';
			}
			
			//fonction start&stop tuner qui réagit au bouton
			// Définit la variable pour suivre l'état de l'accordeur (démarré ou arrêté)
			let isRunning = true;
			// Ajoute un écouteur d'événement au clic sur le bouton
			export function buttonStartTuner() {
					const startStopBtn = document.getElementById("start-stop-button");
					const centsEl = document.getElementById("cents");
				// Si l'accordeur est en cours d'exécution, l'arrête
				if (isRunning == true) {
					stopTuner();
					centsEl.style.display = 'none';
					startDrag();
					deleteCanva();
					stopTuner();
				}
				// Sinon, le démarre
				else {
				
					
					Tuner();
					centsEl.style.display = 'block';
					centsEl.style.display = 'block';
					document.getElementById('visualizer-container').style.display = 'block';
					document.getElementById('pointer-container').style.opacity = '1';
					dragActivated = false;
					stopDrag();
					
					if (window.innerHeight >= window.innerWidth * 50 / 100) {
						createCanva();
					}
				}
				// Inverse l'état de l'accordeur
				isRunning = !isRunning;
			}
			
			
			
			//Accordeur, récupère valeurs dans le module accordeur en display none, fréquence d'actualisation définie dans les constantes 
			let centsInRange = 0;
			export let hzValue;
			let intervalIdTuner;
			let intervalId2;
			let angle = 0;
			let cents;
			let allOctavesCents;
			let allOctavesAngle;
			let anglesHistory = [];
			let rotation;
			let deltaAngle;
			let clockwiseRotation;
			let counterclockwiseRotation;
			let currentAngle;
			let newAngle;
			let rotationAngle;

			export function Tuner() {
				// Récupération initiale du contenu de l'élément
				
				//boucle pour le canva et le système
				const hzValueDisplay = document.getElementById("hzValue");
					intervalIdTuner = setInterval(() => {
					
					let baseFrequency = temperedDiapason * Math.pow(2, (-50 / 1200));
					cents = (1200 * Math.log2(hzValue / baseFrequency));
					hzValueDisplay.innerHTML = hzValue ;										
					allOctavesCents = (cents + 6000) % 1200;
					//console.log(allOctavesCents);
					
					
					centsInRange = (allOctavesCents % 100) - 50;
				}, refreshRateTunerSystem);
				//fréquence d'actualisation différente pour les valeurs de cents pour la lisibilité : refreshRateTunerCents
				let centsDisplay = document.getElementById("cents-display");
				let container = document.querySelector('#container');
				let currentAngle = 0;
				let pointer = document.getElementById('pointer');
				intervalId2 = setInterval(() => {
					if (isNaN(centsInRange)) {
						centsDisplay.innerHTML = 'cts';
					} else {
						//display nombre de cents intro
						const sign = (centsInRange >= 0) ? "+" : "";
						centsDisplay.innerHTML = sign + centsInRange.toFixed(0) + 'cts';
						//nom des notes, pas utilisé
						//let halfTones = Math.floor(allOctavesCents / 100); // Nombre de demi-tons
						//let notes = ['La', 'La#/Sib', 'Si', 'Do', 'Do#/Réb', 'Ré', 'Ré#/Mib', 'Mi', 'Fa', 'Fa#/Solb', 'Sol', 'Sol#/Lab'];
						//let note = notes[halfTones % 12];
						
						//coloration aiguille
						if (centsInRange.toFixed(0) < 1 && centsInRange.toFixed(0) > -1) {
							pointer.style.background="#008b53";
						//	pointer.style.boxShadow = "0 7px 12px #008b53";
						} else {
							pointer.style.background="black";
							//pointer.style.boxShadow = "0 7px 12px #000000";
						}
						
						
						// Coloration de l'aiguille selon les boutons
						let isInRange = false;
						for (let i = 1; i <= buttonsLength; i++) { 
							if (Math.abs(allOctavesCents - buttons[i].allOctavesCents) <= 1) {
								pointer.style.background = buttons[i].color;
								isInRange = true;
								break; // Sortir de la boucle une fois la condition remplie
							}
						}
						
						//Calcul de la position relative du prochain angle		
						angle = (cents / 1200) * 360;
						let nextAngle = angle;
						//caclul de la valeur de rotation relative
						let clockwiseRotation = (nextAngle - currentAngle) % 360;
						let counterclockwiseRotation = ((360 - clockwiseRotation) * -1) % 360;
						//vérifie que la rotation horaire est comprise entre 0 et 360
						if (clockwiseRotation > 360) {
							clockwiseRotation -= 360;
						} else if (clockwiseRotation < 0) {
							clockwiseRotation += 360;
						}
						//vérifie que la rotation anti-horaire est comprise entre -360 et 0
						if (counterclockwiseRotation > 0) {
							counterclockwiseRotation -= 360;
						} else if (counterclockwiseRotation < -360) {
							counterclockwiseRotation += 360;
						}
						//Choisit quelle valeur de rotation est la plus petite et l'applique au container
						if (Math.abs(clockwiseRotation) < Math.abs(counterclockwiseRotation)) {
							rotationAngle = currentAngle + clockwiseRotation - 90;
							container.style.transform = 'translate(-50%, -50%) rotate(' + rotationAngle * -1 + 'deg)';
							if (isNaN(currentAngle)) {
								//gère l'angle indéfini
								currentAngle = 0;
							} else {
								//si la rotation est supérieure à 180 pour le prochain angle, enregistre le nombre de rotation et les compense, sinon définit la prochaine itération du current angle
								if (Math.abs((currentAngle - nextAngle) / 360) < 0.5) {
									currentAngle = nextAngle;
								} else if (Math.abs((currentAngle - nextAngle) / 360) > 0.5) {
									const nbRotation = ((nextAngle - currentAngle) / 360).toFixed(0);
									currentAngle = (nextAngle) - nbRotation * 360;
								}
							}
						} else if (Math.abs(counterclockwiseRotation) < Math.abs(clockwiseRotation)) {
							rotationAngle = currentAngle + counterclockwiseRotation - 90;
							container.style.transform = 'translate(-50%, -50%) rotate(' + rotationAngle * -1 + 'deg)';
							if (isNaN(currentAngle)) {
								currentAngle = 0;
							} else {
								//si la rotation est supérieure à 180 pour le prochain angle, enregistre le nombre de rotation et les compense, sinon définit la prochaine itération du current angle
								if (Math.abs((currentAngle - nextAngle) / 360) < 0.5) {
									currentAngle = nextAngle;
								} else if (Math.abs((currentAngle - nextAngle) / 360) > 0.5) {
									const nbRotation = ((nextAngle - currentAngle) / 360).toFixed(0);
									currentAngle = (nextAngle) - nbRotation * 360;
								}
							}
						}
					}
				}, refreshRateTunerCents);
			}
			
			
			//drag, écoute évènemetns de toucher et de souris
			let dragActivated = false;
			let isDragging;
			let initialX;
			let finalX;
			let xDiff;
			let currentAngleDrag = 0;
			let rotateSpeed = 30;
			let dragThreshold = 20;

			export function startDrag() {
				dragActivated = true;
				let container = document.querySelector('#container');
				container.addEventListener("touchstart", handleTouchStart);
				container.addEventListener("touchend", handleTouchEnd);
				container.addEventListener("touchmove", handleTouchMove);
				container.addEventListener("mousedown", handleMouseDown);
				container.addEventListener("mouseup", handleMouseUp);
				container.addEventListener("mousemove", handleMouseMove);
			}

			export function stopDrag() {
				dragActivated = false;
				let container = document.querySelector('#container');
				container.removeEventListener("touchstart", handleTouchStart);
				container.removeEventListener("touchend", handleTouchEnd);
				container.removeEventListener("touchmove", handleTouchMove);
				container.removeEventListener("mousedown", handleMouseDown);
				container.removeEventListener("mouseup", handleMouseUp);
				container.removeEventListener("mousemove", handleMouseMove);
			}

			function handleTouchStart(event) {
				if (dragActivated === false) return;
				isDragging = true;
				initialX = event.touches[0].clientX;
			}

			function handleTouchEnd(event) {
				if (dragActivated === false) return;
				let container = document.querySelector('#container');
				isDragging = false;
				finalX = event.changedTouches[0].clientX;
				xDiff = finalX - initialX;
				if (Math.abs(xDiff) > dragThreshold) {
					currentAngleDrag += xDiff * rotateSpeed / window.innerWidth;
					container.style.transform = `translate(-50%, -50%) rotate(${currentAngleDrag}deg)`;
				}
			}

			function handleTouchMove(event) {
				if (dragActivated === false) return;
				let container = document.querySelector('#container');
				if (!isDragging) return;
				finalX = event.touches[0].clientX;
				xDiff = finalX - initialX;
				if (Math.abs(xDiff) > dragThreshold) {
					currentAngleDrag += xDiff * rotateSpeed / window.innerWidth;
					container.style.transform = `translate(-50%, -50%) rotate(${currentAngleDrag}deg)`;
				}
			}

			function handleMouseDown(event) {
				if (dragActivated === false) return;
				isDragging = true;
				initialX = event.clientX;
			}

			function handleMouseUp(event) {
				if (dragActivated === false) return;
				isDragging = false;
				finalX = event.clientX;
				xDiff = finalX - initialX;
				// Ajoutez un filtre pour éliminer les soubresauts
				if (Math.abs(xDiff) < dragThreshold) return;
				let container = document.querySelector('#container');
				currentAngleDrag += xDiff * 10 / window.innerWidth;
				container.style.transform = `translate(-50%, -50%) rotate(${currentAngleDrag}deg)`;
			}

			function handleMouseMove(event) {
				if (dragActivated === false) return;
				let container = document.querySelector('#container');
				if (!isDragging) return;
				finalX = event.clientX;
				xDiff = finalX - initialX;
				currentAngleDrag += xDiff * 10 / window.innerWidth;
				currentAngleDrag = currentAngleDrag % 360;
				container.style.transform = `translate(-50%, -50%) rotate(${currentAngleDrag}deg)`;
			}
			//gestion canva (ligne tracé cents)


			let canvaIntervalId;
			let history = [];
			window.addEventListener("resize", () => {
				if (canvaIntervalId) {
					deleteCanva();
					createCanva();
				}
			});
			/**
 * Initialise le canvas et gère l'animation de défilement du trait.
 * * NOTE : Assurez-vous que les variables 'centsInRange', 'history', 
 * 'canvaIntervalId', 'refreshRateTunerSystem', 'majorThirdColor', 
 * 'minorThirdColor', et 'seventhColor' sont définies et accessibles dans la portée (scope) globale.
 */
export function createCanva() {
    let canvas = document.getElementById("visualizer");
    canvas.width = window.innerWidth;
    
    // Définition de la hauteur du canvas (inchangée)
    if (window.innerHeight <= window.innerWidth * 70 / 100) {
        canvas.height = window.innerHeight * 50 / 100;
    } else {
        canvas.height = window.innerHeight * 14 / 100;
    }
    
    canvas.style.transform = "rotate(180deg)";
    let context = canvas.getContext("2d");
    
    // ⭐ Clé de l'accélération : Nombre de points de données à enregistrer par intervalle de 25ms.
    // 2 = Vitesse doublée. 3 = Vitesse triplée.
    const SCROLL_STEP = 2; 

    canvaIntervalId = setInterval(() => {
        let cents = centsInRange;
        
        // ⭐ MODIFICATION CLÉ : Ajouter le point 'SCROLL_STEP' fois dans l'historique
        for (let i = 0; i < SCROLL_STEP; i++) {
            history.push(cents);
        }
        
        // Maintenir la taille de l'historique. 
        // L'historique doit être SCROLL_STEP fois plus grand pour maintenir la même échelle verticale,
        // ou vous le limitez à la hauteur du canvas pour qu'il défile.
        
        // Si la taille dépasse la hauteur du canvas (en pixels), retirer les anciens points.
        // Comme nous avons ajouté SCROLL_STEP points, nous retirons SCROLL_STEP points
        // pour maintenir la longueur du tableau et créer le défilement.
        if (history.length > canvas.height) { 
            for (let i = 0; i < SCROLL_STEP; i++) {
                 if (history.length > 0) { // Sécurité pour éviter le bug
                    history.shift();
                }
            }
        }
        
        // Effacer et redessiner (inchangé)
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#f0ddc6';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Dessiner les lignes verticales (inchangé)
        for (let i = -50; i <= 50; i += 1) {
            context.fillStyle = 'lightgray';
            context.fillRect(canvas.width / 2 - (i * (canvas.width / 50)) / 2, 0, 1, canvas.height);
        }
        for (let i = -50; i <= 50; i += 10) {
            context.fillStyle = 'gray';
            context.fillRect(canvas.width / 2 - (i * (canvas.width / 50)) / 2, 0, 2, canvas.height);
        }
        context.fillStyle = 'gray';
        context.fillRect(canvas.width / 2 - (-50 * (canvas.width / 50)) / 2, 0, 2, canvas.height);
        context.fillStyle = '#008b53';
        context.fillRect(canvas.width / 2 - (0 * (canvas.width / 50)) / 2, 0, 3, canvas.height);
        context.fillStyle = majorThirdColor;
        context.fillRect(canvas.width / 2 - ((-13.6839843058387) * (canvas.width / 50)) / 2, 0, 2, canvas.height);
        context.fillStyle = minorThirdColor;
        context.fillRect(canvas.width / 2 - ((15.643588829879) * (canvas.width / 50)) / 2, 0, 2, canvas.height);
        context.fillStyle = seventhColor;
        context.fillRect(canvas.width / 2 - ((-31.1717917015485) * (canvas.width / 50)) / 2, 0, 2, canvas.height);
        
        // Définir le style du trait (inchangé)
        context.lineWidth = 3;
        if (centsInRange.toFixed(0) < 1 && centsInRange.toFixed(0) > -1) {
            context.strokeStyle = '#008b53';
        } else {
            context.strokeStyle = 'black';
        }
        
        // Dessiner la ligne (retour à la boucle d'origine et non buggée)
        context.beginPath();
        context.moveTo(canvas.width / 2 - (history[0] * (canvas.width / 50)) / 2, canvas.height - history.length); 
        for (let i = 1; i < history.length; i++) {
            // Le défilement est maintenant géré par l'injection de données, 
            // et non par la modification de l'indice i.
            context.lineTo(canvas.width / 2 - (history[i] * (canvas.width / 50)) / 2, canvas.height - history.length + i); 
        }
        context.stroke();
    }, refreshRateTunerSystem);
}


			export function deleteCanva() {
				let canvas = document.getElementById("visualizer");
				let ctx = canvas.getContext("2d");
				clearInterval(canvaIntervalId);
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				history = [];
				canvaIntervalId = undefined;
			}

// --- Setters pour états mutables partagés ---
export function setHzValue(v) { hzValue = v; }
export function setStopped(v) { stopped = v; }
export function setStoppedNote(v) { stoppedNote = v; }
export function setStoppedTnote(v) { stoppedTnote = v; }
// Exposition globale pour les handlers inline du HTML
window.buttonStartTuner = buttonStartTuner;
window.stopAllNotes = stopAllNotes;
window.stopAllTemperedNotes = stopAllTemperedNotes;
