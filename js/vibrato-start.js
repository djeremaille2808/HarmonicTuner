import { resetAnalysis, setVibratoActive, stopAnalysis } from './vibrato-analysis.js';
import { centsToPaddingMarginBoucle, defineButtonAngle, defineTemperedNotesAngle, eventsListenersTempered } from './ui-note-layout.js';
import { A4, getCookieValue } from './settings-storage.js';
import { Tuner, createCanva } from './harmonic-tuner-notes.js';
import { eventsListeners } from './ui-mixer.js';
			// L'analyse vibrato ne capture plus son propre micro/AudioContext : elle réutilise
			// le seul micro et la seule boucle de détection de pitch de js/mic-tuner.js, qui
			// invoque tickVibratoAnalysis() à chaque tick. Démarrer le vibrato revient donc
			// simplement à activer ce calcul et afficher le panneau correspondant.
			export function startVibrato() {
				resetAnalysis();
				document.getElementById("vibrato-analyzer-container").style.display = "";
				setVibratoActive(true);
			}



			
			//construction intro chargement
			//Le panneau de chargement reste affiché tant que la page (images, police) n'est pas
			//réellement prête, au lieu d'un délai fixe arbitraire. Un filet de sécurité évite un
			//écran de chargement bloqué indéfiniment si un événement ne se déclenche jamais.
			const loadingBar = document.getElementById("loading-bar");

			function whenPageLoaded() {
				return new Promise((resolve) => {
					if (document.readyState === "complete") {
						resolve();
					} else {
						window.addEventListener("load", () => resolve(), { once: true });
					}
				});
			}

			function whenFontsReady() {
				return (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
			}

			let appRevealed = false;
			const revealSafetyTimeout = setTimeout(revealApp, 5000);

			Promise.all([whenPageLoaded(), whenFontsReady()]).then(revealApp);

			function revealApp() {
				if (appRevealed) return;
				appRevealed = true;
				clearTimeout(revealSafetyTimeout);
				loadingBar.style.opacity = "0";
				showButtons();
				startAudioContext();
				defineButtonAngle();
				defineTemperedNotesAngle();

				const checkboxVisualizerCookies = getCookieValue("checkboxVisualizer");
				const checkboxVibratoCookies = getCookieValue("checkboxVibrato");
				const checkboxTunerCookies = getCookieValue("checkboxTuner");
				document.getElementById("tempered-tuning").value = A4;


				if (checkboxVisualizerCookies == 1) {
					document.getElementById("mask-visualisation").checked = true;
					createCanva();
					//console.log("visualizer on cookie", checkboxVisualizerCookies);
				} else if (checkboxVisualizerCookies == 0) {
					document.getElementById("mask-visualisation").checked = false;
					//console.log("visualizer off cookie", checkboxVisualizerCookies);
				} else {
					document.getElementById("mask-visualisation").checked = true;
					createCanva();
					//console.log("visualizer default on", checkboxVisualizerCookies);
				}


				if (checkboxVibratoCookies == 1) {
					document.getElementById("mask-vibrato").checked = true;
					startVibrato();
					//console.log("vibrato on cookie", checkboxVibratoCookies);
				} else if (checkboxVibratoCookies == 0) {
					document.getElementById("mask-vibrato").checked = false;
					//console.log("vibrato off cookie", checkboxVibratoCookies);
					stopAnalysis();
				} else {
					document.getElementById("mask-vibrato").checked = true;
					startVibrato();
					//console.log("vibrato default on", checkboxVibratoCookies);
				}

				if (checkboxTunerCookies == 1) {
					document.getElementById("mask-tuner").checked = true;
					//console.log("tuner on cookie", checkboxTunerCookies);
					
					document.getElementById('container').style.opacity = '1';
					document.getElementById('pointer-container').style.opacity = '1';
				} else if (checkboxTunerCookies == 0) {
					document.getElementById("mask-tuner").checked = false;
					document.getElementById('container').style.opacity = '0';
					document.getElementById('pointer-container').style.opacity = '0';
					//console.log("tuner off cookie", checkboxTunerCookies);
				} else {
					document.getElementById("mask-tuner").checked = true;
					
					document.getElementById('container').style.opacity = '1';
					document.getElementById('pointer-container').style.opacity = '1';
					//console.log("tuner default on", checkboxTunerCookies);
				}


			}
			//Gestion de l'intro
			//fonction qui masque le tout avant clic sur bouton start et qui masque start apres clic
			

			export function showButtons() {
				//let buttonsDiv = document.getElementById('container');
				//buttonsDiv.style.display = 'block';
				let introDiv = document.getElementById('intro');
				introDiv.style.display = 'block';
				introDiv.style.opacity = '1';
				let buttonMixer = document.getElementById('mixer');
				buttonMixer.style.display = 'block';
				buttonMixer.style.opacity = '1';
				let buttonStart = document.getElementById('start');
				buttonStart.style.opacity = '0';
				buttonStart.style.display = 'none';



				centsToPaddingMarginBoucle();
				//containerOpacity();
				eventsListeners();
				eventsListenersTempered();
				Tuner();
				//createCanva();
			}
			// Crée l'objet AudioContext
			export let audioCtx;
			// Fonction qui démarre l'objet AudioContext
			export function startAudioContext() {
				// Vérifie que l'objet AudioContext n'est pas déjà démarré
				if (audioCtx && audioCtx.state !== 'closed') return;
				// Crée un nouvel objet AudioContext
				audioCtx = new AudioContext();
			}
