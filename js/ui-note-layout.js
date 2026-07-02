import { buttons, buttonsLength, tnotes, tnotesLength } from './data/notes-config.js';
import { baseFrequencyTemperedNotes, getCookieValue, temperedDiapason } from './settings-storage.js';
import { downFifth, downOctave, downTemperedFifth, downTemperedOctave, playNote, playTemperedNote, stopAllNotes, stopNote, stopTemperedNote, stopped, stoppedNote, stoppedTnote, upFifth, upOctave, upTemperedFifth, upTemperedOctave, setStopped, setStoppedNote, setStoppedTnote } from './harmonic-tuner-notes.js';
		//Construction de la page HTML
			// Ajoute un écouteur d'événement sur le bouton "start"
			/*window.addEventListener("DOMContentLoaded", (event) => {
				showButtons();
				startAudioContext();
				defineButtonAngle();
				defineTemperedNotesAngle();
				createCanva();
			  });
			let startButton = document.getElementById('start-button');
			startButton.DOMContentLoaded('click', showButtons);
			startButton.DOMContentLoaded('click', startAudioContext);
			startButton.DOMContentLoaded('click', defineButtonAngle);
			startButton.DOMContentLoaded('click', defineTemperedNotesAngle);
			startButton.DOMContentLoaded('click', createCanva);*/
			//fonction qui gère la taille des notes harmoniques
			// Retourne si le marginLeft appliqué est positif (branche "cents < 0"), pour éviter
			// à noteNamePlacement() de devoir relire ce style dans le DOM juste après l'écriture.
			function centsToPaddingMargin(elementId) {
				let element = document.getElementById('note-definition-' + elementId);
				if (!element) return false;
				//buttons[elementId].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (3 / 12));
				let baseFrequency = buttons[elementId].baseFrequency;
				let frequency = buttons[elementId].frequency;
				let cents = 1200 * Math.log2(frequency / baseFrequency);
				if (cents >= -50 && cents <= 50) {
					let percentage = (cents * 0.6) * -1; // 2 cents = 1.2%
					if (cents < 0) {
						element.style.paddingLeft = percentage.toFixed(1) + '%';
						element.style.marginLeft = '0.3%';
						element.style.borderTopLeftRadius = '100%';
						element.style.borderBottomLeftRadius = '100%';
						return true;
					} else {
						let padding = percentage * -1;
						element.style.paddingLeft = (padding - 0.3).toFixed(1) + '%';
						element.style.borderTopRightRadius = '100%';
						element.style.borderBottomRightRadius = '100%';
						element.style.marginLeft = percentage.toFixed(1) + '%';
						return false;
					}
				} else {
					//console.log(elementId + ' : Valeur de cents non valide : ' + cents);
					return false;
				}
			}

			function noteNamePlacement(elementId, isMarginPositive) {
				let noteName = document.getElementById('note-name-' + elementId);
				let noteNameSpan = document.getElementById('note-name-display-' + elementId);
				if (!noteName || !noteNameSpan) return;
				if (isMarginPositive) {
					noteName.style.marginLeft = '-1.5%';
					noteNameSpan.style.right = "0%";
					noteNameSpan.style.background = buttons[elementId].color;
				} else {
					noteName.style.marginLeft = '1.5%';
					noteNameSpan.style.left = "0%";
					noteNameSpan.style.background = buttons[elementId].color;
				}

			}

			export function centsToPaddingMarginBoucle() {
				for (let i = 1; i <= buttonsLength; i++) {
					const isMarginPositive = centsToPaddingMargin(i);
					noteNamePlacement(i, isMarginPositive);
				}
			};



			/**
			 * Applique le style 'display' initial aux boutons basés sur l'état des cookies.
			 */
			function applyInitialDisplay(buttons, buttonsLength) {
				// Par défaut, l'affichage est actif (1).
				const fifthsDisplayState = getCookieValue('fifthsDisplay', 1);
				const majThirdsDisplayState = getCookieValue('majThirdsDisplay', 1);
				const minThirdsDisplayState = getCookieValue('minThirdsDisplay', 1);
				const seventhsDisplayState = getCookieValue('seventhsDisplay', 1);

				for (let i = 1; i <= buttonsLength; i++) {
					const button = buttons[i];
					let isDisplayed = true; // Par défaut, on affiche

					// Vérifier l'état du cookie pour le type de bouton
					switch (button.type) {
						case 'fifth':
							// Si le cookie est '0' (chaîne de caractères), isDisplayed devient false
							isDisplayed = (fifthsDisplayState.toString() === '1');
							break;
						case 'majorThird':
							isDisplayed = (majThirdsDisplayState.toString() === '1');
							break;
						case 'minorThird':
							isDisplayed = (minThirdsDisplayState.toString() === '1');
							break;
						case 'seventh':
							isDisplayed = (seventhsDisplayState.toString() === '1');
							break;
						// Ne rien faire pour les autres types, ils restent affichés par défaut
					}

					// Définir le style d'affichage
					const displayStyle = isDisplayed ? '' : 'none';

					// L'élément DOM n'existe pas encore ici, nous allons appliquer ce style DANS le code de création
					// Pour l'instant, nous pouvons mettre à jour l'objet data si besoin :
					// button.initialDisplay = displayStyle; 
				}
			}


			//Script qui crée 78 boutons HTML cliquables pour les notes harmoniques
			// Exécuté immédiatement (et non sur l'event "load") : un script type="module"
			// s'exécute déjà après le parsing du DOM, donc les conteneurs existent, et
			// revealApp() (déclenché par un timeout de sécurité) a besoin que ces boutons
			// existent avant d'appliquer leur mise en page.
			(function() {
				// 1. LIRE L'ÉTAT DES COOKIES AU DÉBUT
				// Le second paramètre (1) est la valeur par défaut si le cookie n'existe pas (Afficher/Checked par défaut)
				const fifthsDisplayState = getCookieValue('fifthsDisplay', 1).toString();
				const majThirdsDisplayState = getCookieValue('majThirdsDisplay', 1).toString();
				const minThirdsDisplayState = getCookieValue('minThirdsDisplay', 1).toString();
				const seventhsDisplayState = getCookieValue('seventhsDisplay', 1).toString();

				// 2. METTRE À JOUR L'ÉTAT DES CHECKBOXES (Ajout crucial ici)
    
				// Fonction utilitaire pour éviter les erreurs "Cannot set properties of null"
				function setCheckboxState(id, cookieState) {
					const checkbox = document.getElementById(id);
					if (checkbox) {
						// Si le cookie est '0', la case doit être décochée (false)
						checkbox.checked = (cookieState === '1'); 
						//console.log(`Initialisation de la checkbox ${id}: ${checkbox.checked}`);
					}
				}

				// Mettez à jour chaque checkbox en utilisant les IDs de vos inputs
				setCheckboxState('showFifths', fifthsDisplayState); 
				setCheckboxState('showMajorThirds', majThirdsDisplayState);
				setCheckboxState('showMinorThirds', minThirdsDisplayState);
				setCheckboxState('showSevenths', seventhsDisplayState);

				// 3. CRÉATION ET AFFICHAGE DES BOUTONS (Votre code existant)
				let container = document.getElementById("BUTTONCONTAINER");
				const buttonsFragment = document.createDocumentFragment();

				for (let i = 1; i <= buttonsLength; i++) {
					const buttonData = buttons[i];
					let displayState;

					// Déterminer l'état d'affichage basé sur le type et le cookie lu
					switch (buttonData.type) {
						case 'fifth':
							displayState = fifthsDisplayState;
							break;
						case 'majorThird':
							displayState = majThirdsDisplayState;
							break;
						case 'minorThird':
							displayState = minThirdsDisplayState;
							break;
						case 'seventh':
							displayState = seventhsDisplayState;
							break;
						default:
							displayState = '1'; // Afficher par défaut les boutons sans type
					}
					
					const displayStyle = (displayState === '1') ? "" : "none";



					let button = document.createElement("div");
					button.classList.add("button");
					button.id = "button" + i;
					button.style.zIndex = buttonsLength + 2 - i;
					button.style.display = displayStyle;
					let noteDefinition = document.createElement("div");
					noteDefinition.classList.add("note-definition");
					noteDefinition.id = "note-definition-" + i;
					noteDefinition.style.background = buttons[i].color;
					noteDefinition.style.marginLeft = '0';
					noteDefinition.style.paddingLeft = '0';
					button.appendChild(noteDefinition);
					let noteName = document.createElement("div");
					noteName.classList.add("note-name");
					noteName.id = "note-name-" + i;
					noteName.id = "note-name-" + i;
					let noteNameDisplay = document.createElement("span");
					noteNameDisplay.id = "note-name-display-" + i;
					noteNameDisplay.classList.add("note-name-display");
					noteNameDisplay.textContent = buttons[i].name;
					noteName.appendChild(noteNameDisplay);
					button.appendChild(noteName);
					buttonsFragment.appendChild(button);
				}
				container.appendChild(buttonsFragment);
			})();
			//Script qui crée 12 div HTML cliquables pour les notes tempérées
			(function() {
				let container = document.getElementById("temperedcontainer");
				const tnotesFragment = document.createDocumentFragment();
				for (let t = 1; t <= tnotesLength; t++) {
					let button = document.createElement("div");
					button.classList.add("temperedbutton");
					button.id = t + "-temperedbutton";
					button.style.zIndex = tnotesLength + 188 + t;
					let tnoteName = document.createElement("div");
					tnoteName.classList.add("tnote-name");
					tnoteName.id = "tnote-name-" + t;
					tnoteName.id = "tnote-name-" + t;
					button.appendChild(tnoteName);
					let tnoteNameDisplay = document.createElement("span");
					tnoteNameDisplay.id = "tnote-name-display-" + t;
					tnoteNameDisplay.classList.add("tnote-name-display");
					tnoteNameDisplay.textContent = tnotes[t].tname;
					tnoteName.appendChild(tnoteNameDisplay);
					tnotesFragment.appendChild(button);
				}
				container.appendChild(tnotesFragment);
			})();
			//fonction qui oriente la moitié du du texte autour du texte de 180deg mais n'est plus utilisée
			function textRotate() {
				for (let i = 1; i <= buttonsLength / 2; i++) {
					let rotationText = document.getElementById(i + "-text-div");
					let rotationNoteName = document.getElementById("note-name-display-" + i);
					rotationText.style.transform = 'translate(0%, -20%) rotate(180deg)';
					rotationText.style.display = 'inline-block';
					rotationText.style.textAlign = 'left';
					rotationNoteName.style.transform = 'translate(0%, -50%) rotate(180deg)';
					let displayName = document.getElementById(i + "-name-display");
					let displayFrequency = document.getElementById(i + "-frequency-display");
					displayName.style.display = 'none';
					displayFrequency.style.display = 'none';
				}
			}

			function singleTemperedNotesRotate(tnotesId) {
				for (let t = 1; t <= tnotesLength; t++) {
					let temperedAngle = 360 - tnotes[t].angle;
					let rotationPlay = document.getElementById(t + "-play-t-button");
					let rotationPause = document.getElementById(t + "-stop-t-button");
					let rotationUp = document.getElementById(t + "-up-t-button");
					let rotationDown = document.getElementById(t + "-down-t-button");
					rotationPlay.style.transform = 'rotate(' + temperedAngle + 'deg)';
					rotationPause.style.transform = 'rotate(' + temperedAngle + 'deg)';
					rotationUp.style.transform = 'rotate(' + temperedAngle + 'deg)';
					rotationDown.style.transform = 'rotate(' + temperedAngle + 'deg)';
				}
			}
			//Définit l'angle de chaque div buttons en fonction de la valeur de l'objet buttons
			let buttonAngle;
			export function defineButtonAngle() {
				let baseFrequencyAngle = baseFrequencyTemperedNotes / 2 * Math.pow(2, (5 / 12));
				let baseFrequencyAllOctavesCents = temperedDiapason * Math.pow(2, (-50 / 1200));
				
				for (let i = 1; i <= buttonsLength; i++) {
					
					let centsAngle = (1200 * Math.log2(buttons[i].frequency / baseFrequencyAngle));
					
					buttonAngle = ((((centsAngle / 1200) * 360)) + 180 - 15).toFixed(3);
					let button = document.querySelector(`.button:nth-child(${i+1})`);
					button.style.transform = `translate(-50%, -50%) rotate(${buttonAngle}deg)`;
					//buttons[i].angle=buttonAngle;
					let centsAllOctavesCents = (1200 * Math.log2(buttons[i].frequency / baseFrequencyAllOctavesCents));
					let buttonAllOctavesCents = (centsAllOctavesCents + 6000) % 1200;
					
					buttons[i].allOctavesCents=buttonAllOctavesCents;
					//console.log('Bouton ' + i + ' : ' + buttons[i].allOctavesCents);
				}
			}

			export function defineTemperedNotesAngle() {
				for (let t = 1; t <= tnotesLength; t++) {
					let buttonAngle = tnotes[t].angle;
					let button = document.querySelector(`.temperedbutton:nth-child(${t+1})`);
					button.style.transform = `translate(-50%, -50%) rotate(${buttonAngle}deg)`;
				}
			}
			//écouteurs d'évènements
			let stopAllButton = document.getElementById('stopAll');
			stopAllButton.addEventListener('click', stopAllNotes());

			export function eventsListenersTempered() {
				Object.keys(tnotes).forEach(tnoteId => {
					let tnoteName = document.getElementById(`tnote-name-display-${tnoteId}`);
					tnoteName.addEventListener('click', () => {
						if (tnotes[tnoteId].isPlaying) {
							stopTemperedNote(tnoteId);
						} else {
							playTemperedNote(tnoteId);
						}
					});
					let upTnoteMixer = document.getElementById(`up-tnote-mixer-${tnoteId}`);
					upTnoteMixer.addEventListener('click', () => {
						upTemperedOctave(tnoteId);
					});
					let downTnoteMixer = document.getElementById(`down-tnote-mixer-${tnoteId}`);
					downTnoteMixer.addEventListener('click', () => {
						downTemperedOctave(tnoteId);
					});
					let upButtonIntro = document.getElementById(`up-button-intro`);
					upButtonIntro.addEventListener('click', () => {
						if (tnotes[tnoteId].isPlaying) {
							upTemperedOctave(tnoteId);
						}
					});
					let downButtonIntro = document.getElementById(`down-button-intro`);
					downButtonIntro.addEventListener('click', () => {
						if (tnotes[tnoteId].isPlaying) {
							downTemperedOctave(tnoteId);
						}
					});
				});
			}
			
			//fonction qui change de note en appuyant sur flèches sur le coté et bas haut
			function getCurrentNoteId() {
				// Recherchez la note actuellement jouée parmi les objets "buttons" et renvoyez son ID
				for (let i = 1; i <= buttonsLength; i++) {
					if (buttons[i].isPlaying) {
						return i;
					}
				}
				return null;
			}

			function getCurrentTnoteId() {
				// Recherchez la note actuellement jouée parmi les objets "buttons" et renvoyez son ID
				for (let j = 1; j <= tnotesLength; j++) {
					if (tnotes[j].isPlaying) {
						return j;
					}
				}
				return null;
			}
			//pédale et flèches haut bas gauche droite
			let isStopped = [];
			let isTStopped = [];
			document.addEventListener("keydown", function(event) {
				let currentNoteId = getCurrentNoteId();
				let currentTnoteId = getCurrentTnoteId();
				if (event.key === "ArrowRight") {
					if (currentNoteId !== null) {
						upFifth(currentNoteId);
					} else if (currentTnoteId !== null) {
						//currentTnoteId = currentTnoteId === tnotesLength ? 1 : currentTnoteId + 1;
						//playTemperedNote(currentTnoteId);
						//console.log(currentTnoteId);
						upTemperedFifth(currentTnoteId);
					}
				} else if (event.key === "ArrowLeft") {
					if (currentNoteId !== null) {
						downFifth(currentNoteId);
					} else if (currentTnoteId !== null) {
						//currentTnoteId = currentTnoteId === 1 ? tnotesLength : currentTnoteId - 1;
						//playTemperedNote(currentTnoteId);
						//console.log(currentTnoteId);
						downTemperedFifth(currentTnoteId);
					}
				} else if (event.key === "ArrowDown") {
					if (currentNoteId !== null) {
						upOctave(currentNoteId);
					} else if (currentTnoteId !== null) {
						upTemperedOctave(currentTnoteId);
					}
				} else if (event.key === "ArrowUp") {
					if (currentNoteId !== null) {
						downOctave(currentNoteId);
					} else if (currentTnoteId !== null) {
						downTemperedOctave(currentTnoteId);
					}
				}
			});
			//barre d'espace qui pause la note
			document.addEventListener("keypress", function(event) {
				if (event.keyCode === 32) {
					let currentNoteId = getCurrentNoteId();
					let currentTnoteId = getCurrentTnoteId();
					if (stopped === false) {
						if (currentNoteId !== null) {
							stopNote(currentNoteId);
							setStoppedNote(currentNoteId);
							setStopped(true);
							//console.log('note numéro ' + stoppedNote + ' enregistrée');
						} else if (currentTnoteId !== null) {
							stopTemperedNote(currentTnoteId);
							setStoppedTnote(currentTnoteId);
							setStopped(true);
							//console.log('Tnote numéro ' + stoppedTnote + ' enregistrée');
						}
					} else {
						if (stoppedNote !== null) {
							//console.log('je vais jouer la note ' + stoppedNote + ' enregistrée');
							playNote(stoppedNote);
							setStopped(false);
						} else if (stoppedTnote !== null) {
							setStoppedNote(null);
							playTemperedNote(stoppedTnote);
							setStopped(false);
							setStoppedTnote(null);
						}
					}
				}
			});


