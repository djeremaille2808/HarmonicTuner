import { baseFrequencyHarmonicNotes, baseFrequencyTemperedNotes, fifthColor, majorThirdColor, minorThirdColor, seventhColor, temperedDiapason, setCookie, setBaseFrequencyHarmonicNotes, setBaseFrequencyTemperedNotes, setFifthColor, setMajorThirdColor, setMinorThirdColor, setSeventhColor, setTemperedDiapason } from './settings-storage.js';
import { createCanva, deleteCanva } from './harmonic-tuner-notes.js';
import { startVibrato } from './vibrato-start.js';
import { stopAnalysis } from './vibrato-analysis.js';
import { buttons, buttonsLength, refreshFrequenciesValues } from './data/notes-config.js';
import { centsToPaddingMarginBoucle, defineButtonAngle } from './ui-note-layout.js';
			//gestion panneau settings paramètres
			let sidePanel = document.getElementById("side-panel");
			let settingsBtn = document.getElementById("settings-btn");
			let temperedTuning = document.getElementById("tempered-tuning");
			let harmonicTuning = document.getElementById("harmonic-tuning");
			let checkboxVisualizer = document.getElementById("mask-visualisation");
			let checkboxVibrato = document.getElementById("mask-vibrato");
			let checkboxTuner = document.getElementById("mask-tuner");
			let vibratoAnalyzer = document.getElementById("vibrato-analyzer-container");
			let canvas = document.getElementById("visualizer-container");
			let soundSelect = document.getElementById("sound-select");
			let fifthsColor = document.getElementById("fifths");
			let majThirdsColor = document.getElementById("majorThirds");
			let minThirdsColor = document.getElementById("minorThirds");
			let seventhsColor = document.getElementById("seventh");
			let fifthsDisplay = document.getElementById("showFifths");
			let majThirdsDisplay = document.getElementById("showMajorThirds");
			let minThirdsDisplay = document.getElementById("showMinorThirds");
			let seventhsDisplay = document.getElementById("showSevenths");
			let sidePanelStatus = 0;
			// Références DOM statiques mises en cache (interrogées dans plusieurs handlers)
			const containerEl = document.getElementById("container");
			const pointerContainerEl = document.getElementById("pointer-container");

			checkboxVisualizer.addEventListener("change", function() {
						if (checkboxVisualizer.checked) {
							setCookie('checkboxVisualizer', 1);
							canvas.style.opacity = "1";
							createCanva();
						} else {
							setCookie('checkboxVisualizer', 0);
							canvas.style.opacity = "0";
							deleteCanva();
						}
					});


			checkboxVibrato.addEventListener("change", function() {
						if (checkboxVibrato.checked) {
							setCookie('checkboxVibrato', 1);
							vibratoAnalyzer.style.opacity = "1";
							startVibrato();

						} else {
							setCookie('checkboxVibrato', 0);
							vibratoAnalyzer.style.opacity = "0";
							stopAnalysis();
						}
					});
			checkboxTuner.addEventListener("change", function() {
						if (checkboxTuner.checked) {
							setCookie('checkboxTuner', 1);
							containerEl.style.opacity = "1";
							pointerContainerEl.style.opacity = "1";
						} else {
							setCookie('checkboxTuner', 0);
							containerEl.style.opacity = "0";
							pointerContainerEl.style.opacity = "0";
						}
					});


			soundSelect.addEventListener("change", function() {
					setCookie('soundSelect', soundSelect.value);
			});

			fifthsColor.addEventListener("change", function() {
				const newFifthColor = this.value; // Récupère la nouvelle couleur

				// 1. Sauvegarder la préférence
				setCookie('fifthsColor', newFifthColor);

				// 2. Mettre à jour la variable globale fifthColor
				setFifthColor(newFifthColor); 

				// 3. Parcourir et mettre à jour uniquement les boutons de type 'fifth'
				for (let i = 1; i <= buttonsLength; i++) {
					const button = buttons[i];
					const element = document.getElementById("note-definition-" + i);
					const label = document.getElementById("note-name-display-" + i);

					// VÉRIFICATION CRUCIALE : Si le bouton est de type 'fifth'
					if (button.type === 'fifth') { 
						// a) Mettre à jour la propriété 'color' dans l'objet de données
						button.color = newFifthColor; 

						// b) Appliquer immédiatement le style au DOM
						if (element) {
							element.style.background = newFifthColor;
							label.style.background = newFifthColor;
						}
					} 
					// Si le bouton n'est pas une quinte, sa couleur ne change pas.
				}
			});

			fifthsDisplay.addEventListener("change", function() {
				const isChecked = this.checked;
				
				// 1. Sauvegarder le cookie
				const displayValue = isChecked ? 1 : 0;
				setCookie('fifthsDisplay', displayValue);

				// 2. Déterminer le style d'affichage pour cette itération
				const newDisplay = isChecked ? '' : 'none'; // '' = Afficher, 'none' = Masquer

				// 3. Parcourir et mettre à jour uniquement les boutons de type 'fifth'
				for (let i = 1; i <= buttonsLength; i++) {
					const button = buttons[i];
					const element = document.getElementById("button" + i);

					// VÉRIFICATION CRUCIALE : Si le bouton est de type 'fifth'
					if (button.type === 'fifth') { 
						

						// Appliquer le style au DOM
						if (element) {
							element.style.display = newDisplay;
						}
					} 
				}
			});

			majThirdsColor.addEventListener("change", function() {
				const newMajThirdsColor = this.value; // Récupère la nouvelle couleur
				
				// 1. Sauvegarder le cookie (Ceci est correct)
				setCookie('majThirdsColor', newMajThirdsColor);

				// 2. Mettre à jour la variable globale majorThirdColor
				setMajorThirdColor(newMajThirdsColor); 

				// 3. Parcourir et mettre à jour uniquement les boutons de type 'majorThird'
				for (let i = 1; i <= buttonsLength; i++) {
					const button = buttons[i];
					const element = document.getElementById("note-definition-" + i);
					const label = document.getElementById("note-name-display-" + i);

					// VÉRIFICATION CRUCIALE : Si le bouton est de type 'majorThird'
					if (button.type === 'majorThird') { 
						// a) Mettre à jour la propriété 'color' dans l'objet de données
						button.color = newMajThirdsColor; 

						// b) Appliquer immédiatement le style au DOM
						if (element) {
							element.style.background = newMajThirdsColor;
							label.style.background = newMajThirdsColor;
						}
					} 
					// Si le bouton n'est pas une quinte, sa couleur ne change pas.
				}
			});

			majThirdsDisplay.addEventListener("change", function() {
				const isChecked = this.checked;
				
				// 1. Sauvegarder le cookie
				const displayValue = isChecked ? 1 : 0;
				setCookie('majThirdsDisplay', displayValue);

				// 2. Déterminer le style d'affichage pour cette itération
				const newDisplay = isChecked ? '' : 'none'; // '' = Afficher, 'none' = Masquer

				// 3. Parcourir et mettre à jour uniquement les boutons de type 'majorThird'
				for (let i = 1; i <= buttonsLength; i++) {
					const button = buttons[i];
					const element = document.getElementById("button" + i);

					// VÉRIFICATION CRUCIALE : Si le bouton est de type 'majorThird'
					if (button.type === 'majorThird') { 
						

						// Appliquer le style au DOM
						if (element) {
							element.style.display = newDisplay;
						}
					} 
				}
			});


			minThirdsColor.addEventListener("change", function() {
				const newMinThirdsColor = this.value; // Récupère la nouvelle couleur
				
				// 1. Sauvegarder le cookie (Ceci est correct)
				setCookie('minThirdsColor', newMinThirdsColor);

				// 2. Mettre à jour la variable globale minorThirdColor
				setMinorThirdColor(newMinThirdsColor); 

				// 3. Parcourir et mettre à jour uniquement les boutons de type 'minorThird'
				for (let i = 1; i <= buttonsLength; i++) {
					const button = buttons[i];
					const element = document.getElementById("note-definition-" + i);
					const label = document.getElementById("note-name-display-" + i);

					// VÉRIFICATION CRUCIALE : Si le bouton est de type 'minorThird'
					if (button.type === 'minorThird') { 
						// a) Mettre à jour la propriété 'color' dans l'objet de données
						button.color = newMinThirdsColor; 

						// b) Appliquer immédiatement le style au DOM
						if (element) {
							element.style.background = newMinThirdsColor;
							label.style.background = newMinThirdsColor;
						}
					} 
					// Si le bouton n'est pas une quinte, sa couleur ne change pas.
				}
			});


			minThirdsDisplay.addEventListener("change", function() {
				const isChecked = this.checked;
				
				// 1. Sauvegarder le cookie
				const displayValue = isChecked ? 1 : 0;
				setCookie('minThirdsDisplay', displayValue);

				// 2. Déterminer le style d'affichage pour cette itération
				const newDisplay = isChecked ? '' : 'none'; // '' = Afficher, 'none' = Masquer

				// 3. Parcourir et mettre à jour uniquement les boutons de type 'minorThird'
				for (let i = 1; i <= buttonsLength; i++) {
					const button = buttons[i];
					const element = document.getElementById("button" + i);

					// VÉRIFICATION CRUCIALE : Si le bouton est de type 'minorThird'
					if (button.type === 'minorThird') { 
						

						// Appliquer le style au DOM
						if (element) {
							element.style.display = newDisplay;
						}
					} 
				}
			});
			
			seventhsColor.addEventListener("change", function() {
				const newSeventhsColor = this.value; // Récupère la nouvelle couleur
				
				// 1. Sauvegarder le cookie (Ceci est correct)
				setCookie('seventhsColor', newSeventhsColor);

				// 2. Mettre à jour la variable globale seventhColor
				setSeventhColor(newSeventhsColor); 

				// 3. Parcourir et mettre à jour uniquement les boutons de type 'seventh'
				for (let i = 1; i <= buttonsLength; i++) {
					const button = buttons[i];
					const element = document.getElementById("note-definition-" + i);
					const label = document.getElementById("note-name-display-" + i);

					// VÉRIFICATION CRUCIALE : Si le bouton est de type 'seventh'
					if (button.type === 'seventh') { 
						// a) Mettre à jour la propriété 'color' dans l'objet de données
						button.color = newSeventhsColor; 

						// b) Appliquer immédiatement le style au DOM
						if (element) {
							element.style.background = newSeventhsColor;
							label.style.background = newSeventhsColor;
						}
					} 
					// Si le bouton n'est pas une quinte, sa couleur ne change pas.
				}
			});

			seventhsDisplay.addEventListener("change", function() {
				const isChecked = this.checked;
				
				// 1. Sauvegarder le cookie
				const displayValue = isChecked ? 1 : 0;
				setCookie('seventhsDisplay', displayValue);

				// 2. Déterminer le style d'affichage pour cette itération
				const newDisplay = isChecked ? '' : 'none'; // '' = Afficher, 'none' = Masquer

				// 3. Parcourir et mettre à jour uniquement les boutons de type 'seventh'
				for (let i = 1; i <= buttonsLength; i++) {
					const button = buttons[i];
					const element = document.getElementById("button" + i);

					// VÉRIFICATION CRUCIALE : Si le bouton est de type 'seventh'
					if (button.type === 'seventh') { 
						

						// Appliquer le style au DOM
						if (element) {
							element.style.display = newDisplay;
						}
					} 
				}
			});


			fifthsColor.value = fifthColor;
			majThirdsColor.value = majorThirdColor;
			minThirdsColor.value = minorThirdColor;
			seventhsColor.value = seventhColor;



			settingsBtn.addEventListener("click", function() {
				if (sidePanelStatus === 0) {
					sidePanelStatus = 1;
					//console.log(sidePanelStatus);
					sidePanel.style.left = "0%";
					settingsBtn.style.background = "#d4af6a";
					if (!checkboxVisualizer.checked) {
							canvas.style.opacity = "0";
					}
					if (!checkboxVibrato.checked) {
							vibratoAnalyzer.style.opacity = "0";
					}
					if (!checkboxTuner.checked) {
								containerEl.style.opacity = "0";
								pointerContainerEl.style.opacity = "0";
					}
					if (mixer.classList.contains("collapsed")) {
						mixer.classList.remove("collapsed");
					}

					setTimeout(function () {
					//console.log('apres 1sex')
					document.getElementById("down-button-intro").style.display = "none";
					document.getElementById("up-button-intro").style.display = "none";
					document.getElementById("stopAll").style.display = "none";
					document.getElementById("mixer-btn").style.display = "none";
					document.getElementById("help-btn").style.display = "none";
					document.getElementById("start-stop-button").style.display = "none";}, 500);
					document.getElementById("intro").style.opacity = "1";
					document.getElementById("mixer-btn").style.opacity = "0";
					document.getElementById("help-btn").style.opacity = "0";
					document.getElementById("cents").style.opacity = "0";
					document.getElementById("start-stop-button").style.opacity = "0";
					document.getElementById("stopAll").style.opacity = "0";
					document.getElementById("up-button-intro").style.opacity = "0";
					document.getElementById("down-button-intro").style.opacity = "0";
					
				} else {
					sidePanelStatus = 0;
					//console.log(sidePanelStatus);
					sidePanel.style.left = "-100%";
					container.style.opacity = "1";
					settingsBtn.style.background = "";
					if (checkboxVisualizer.checked) {
								canvas.style.opacity = "1";
					} else {
							canvas.style.opacity = "0";
					}
					if (checkboxVibrato.checked) {
							vibratoAnalyzer.style.opacity = "1";
					} else {
							vibratoAnalyzer.style.opacity = "0";
					}
					if (checkboxTuner.checked) {
								containerEl.style.opacity = "1";
								pointerContainerEl.style.opacity = "1";
					} else {
								containerEl.style.opacity = "0";
								pointerContainerEl.style.opacity = "0";
					}
					if (mixer.classList.contains("collapsed")) {
						mixer.classList.remove("collapsed");
					}

					document.getElementById("intro").style.opacity = "1";
					document.getElementById("mixer-btn").style.display = "";
					document.getElementById("help-btn").style.display = "";
					document.getElementById("cents").style.display = "";
					document.getElementById("start-stop-button").style.display = "";
					document.getElementById("stopAll").style.display = "";
					document.getElementById("up-button-intro").style.display = "";
					document.getElementById("down-button-intro").style.display = "";
					
					setTimeout(function () {
					document.getElementById("mixer-btn").style.opacity = "1";
					document.getElementById("help-btn").style.opacity = "1";
					document.getElementById("start-stop-button").style.opacity = "1";
					document.getElementById("down-button-intro").style.opacity = "1";
					
					document.getElementById("up-button-intro").style.opacity = "1";
					document.getElementById("stopAll").style.opacity = "1";
					document.getElementById("cents").style.opacity = "1";}, 100);
				}
			});
			
			temperedTuning.addEventListener("change", function() {
				let value = this.value;
				setCookie('temperedTuning', value);
				let temperedNotes = document.getElementById("tempered-tuning").value / 2;
				
				setTemperedDiapason(temperedNotes);
				setBaseFrequencyTemperedNotes(temperedNotes);
				
				refreshFrequenciesValues();
				defineButtonAngle();
				centsToPaddingMarginBoucle();
				
			});
			harmonicTuning.addEventListener("change", function() {
				let value = this.value;
				let HarmonicD = value * 4 / 3 / 2;
				setCookie('harmonicTuning', HarmonicD);
				setBaseFrequencyHarmonicNotes(HarmonicD / 2);
				
				refreshFrequenciesValues();
				defineButtonAngle();
				centsToPaddingMarginBoucle();
			});
