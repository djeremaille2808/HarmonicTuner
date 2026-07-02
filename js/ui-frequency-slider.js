import { tnotes, tnotesLength } from './data/notes-config.js';

					//Récupère et affiche la valeur du slider
					let slider = document.getElementById("frequency-slider");
					let output = document.getElementById("frequency-value");

					// Applique le décalage (en cents) à toutes les notes tempérées actuellement jouées
					function applyFrequencyOffsetToPlayingNotes(cents) {
						for (let t = 1; t <= tnotesLength; t++) {
							const tnote = tnotes[t];
							if (tnote.isPlaying && tnote.frequencyParam) {
								tnote.frequencyParam.value = tnote.frequency * Math.pow(2, (cents / 1200));
							}
						}
					}

					slider.addEventListener("input", function() {
						if (slider.value === 0 || slider.value === 1 || slider.value === -1) {
							output.innerHTML = slider.value + ' cent';
						} else {
							output.innerHTML = slider.value + ' cents';
						}
						applyFrequencyOffsetToPlayingNotes(parseInt(slider.value));
					});
					//Reset sur 0 lors du double clic
					slider.addEventListener("dblclick", function() {
						slider.value = 0;
						output.innerHTML = slider.value + ' cent';
						applyFrequencyOffsetToPlayingNotes(0);
					});
