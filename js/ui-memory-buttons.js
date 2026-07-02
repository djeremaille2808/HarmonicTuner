import { buttons, buttonsLength, tnotes, tnotesLength } from './data/notes-config.js';
import { playNote, playTemperedNote, stopAllNotes, stopAllTemperedNotes, stopNote, stopTemperedNote } from './harmonic-tuner-notes.js';
			//boutons mémoire
				let memory1 = [];
				let tMemory1 = [];
				let isRecorded1 = false;
				let memoryButton1 = document.getElementById("memory-button-1");
				let memory2 = [];
				let tMemory2 = [];
				let isRecorded2 = false;
				let memoryButton2 = document.getElementById("memory-button-2");
				let memory3 = [];
				let tMemory3 = [];
				let isRecorded3 = false;
				let memoryButton3 = document.getElementById("memory-button-3");
				let memory4 = [];
				let tMemory4 = [];
				let isRecorded4 = false;
				let memoryButton4 = document.getElementById("memory-button-4");
				let clearMemoryButton = document.getElementById("clear-memory-button");
				memoryButton1.addEventListener("click", function() {
					if (event.target.id === "memory-button-1") {
						if (!isRecorded1) {
							memory1 = [];
							tMemory1 = [];
							for (let i = 1; i <= buttonsLength; i++) {
								if (buttons[i].isPlaying) {
									memory1.push(i);
									stopNote(i);
								}
							}
							for (let j = 1; j <= tnotesLength; j++) {
								if (tnotes[j].isPlaying) {
									tMemory1.push(j);
									stopTemperedNote(j);
								}
							}
							memoryButton2.style.display = 'inline-block';
							memoryButton3.style.display = 'inline-block';
							memoryButton4.style.display = 'inline-block';
							clearMemoryButton.style.display = 'inline-block';
							stopAllNotes(); // fonction pour arrêter les notes en cours de lecture
							if (memory1.length > 0) {
								memoryButton1.style.opacity = "1";
								memoryButton1.style.background = "#e6f3f7";
							}
							isRecorded1 = true;
						} else {
							for (let i = 0; i < memory1.length; i++) {
								playNote(memory1[i]);
							}
							for (let j = 0; j < tMemory1.length; j++) {
								playTemperedNote(tMemory1[j]);
							}
							isRecorded1 = false;
							memoryButton2.style.display = 'none';
							memoryButton3.style.display = 'none';
							memoryButton4.style.display = 'none';
							clearMemoryButton.style.display = 'none';
						}
					}
				});
				memoryButton2.addEventListener("click", function() {
					if (event.target.id === "memory-button-2") {
						if (!isRecorded2) {
							memory2 = [];
							tMemory2 = [];
							for (let i = 1; i <= buttonsLength; i++) {
								if (buttons[i].isPlaying) {
									memory2.push(i);
									stopNote(i);
								}
							}
							for (let j = 1; j <= tnotesLength; j++) {
								if (tnotes[j].isPlaying) {
									tMemory2.push(j);
									stopTemperedNote(j);
								}
							}
							memoryButton1.style.display = 'inline-block';
							memoryButton3.style.display = 'inline-block';
							memoryButton4.style.display = 'inline-block';
							clearMemoryButton.style.display = 'inline-block';
							stopAllNotes(); // fonction pour arrêter les notes en cours de lecture
							if (memory2.length > 0) {
								memoryButton2.style.opacity = "1";
								memoryButton2.style.background = "#e6f3f7";
							}
							isRecorded2 = true;
						} else {
							for (let i = 0; i < memory2.length; i++) {
								playNote(memory2[i]);
							}
							for (let j = 0; j < tMemory2.length; j++) {
								playTemperedNote(tMemory2[j]);
							}
							isRecorded2 = false;
							memoryButton1.style.display = 'none';
							memoryButton3.style.display = 'none';
							memoryButton4.style.display = 'none';
							clearMemoryButton.style.display = 'none';
						}
					}
				});
				memoryButton3.addEventListener("click", function() {
					if (event.target.id === "memory-button-3") {
						if (!isRecorded3) {
							memory3 = [];
							for (let i = 1; i <= buttonsLength; i++) {
								if (buttons[i].isPlaying) {
									memory3.push(i);
									stopNote(i);
								}
							}
							for (let j = 1; j <= tnotesLength; j++) {
								if (tnotes[j].isPlaying) {
									tMemory3.push(j);
									stopTemperedNote(j);
								}
							}
							memoryButton1.style.display = 'inline-block';
							memoryButton2.style.display = 'inline-block';
							memoryButton4.style.display = 'inline-block';
							clearMemoryButton.style.display = 'inline-block';
							stopAllNotes(); // fonction pour arrêter les notes en cours de lecture
							if (memory3.length > 0) {
								memoryButton3.style.opacity = "1";
								memoryButton3.style.background = "#e6f3f7";
							}
							isRecorded3 = true;
						} else {
							for (let i = 0; i < memory3.length; i++) {
								playNote(memory3[i]);
							}
							for (let j = 0; j < tMemory3.length; j++) {
								playTemperedNote(tMemory3[j]);
							}
							isRecorded3 = false;
							memoryButton1.style.display = 'none';
							memoryButton2.style.display = 'none';
							memoryButton4.style.display = 'none';
							clearMemoryButton.style.display = 'none';
						}
					}
				});
				memoryButton4.addEventListener("click", function() {
					if (event.target.id === "memory-button-4") {
						if (!isRecorded4) {
							memory4 = [];
							for (let i = 1; i <= buttonsLength; i++) {
								if (buttons[i].isPlaying) {
									memory4.push(i);
									stopNote(i);
								}
							}
							for (let j = 1; j <= tnotesLength; j++) {
								if (tnotes[j].isPlaying) {
									tMemory4.push(j);
									stopTemperedNote(j);
								}
							}
							memoryButton1.style.display = 'inline-block';
							memoryButton2.style.display = 'inline-block';
							memoryButton3.style.display = 'inline-block';
							clearMemoryButton.style.display = 'inline-block';
							stopAllNotes(); // fonction pour arrêter les notes en cours de lecture
							if (memory4.length > 0) {
								memoryButton4.style.opacity = "1";
								memoryButton4.style.background = "#e6f3f7";
							}
							isRecorded4 = true;
						} else {
							for (let i = 0; i < memory4.length; i++) {
								playNote(memory4[i]);
							}
							for (let j = 0; j < tMemory4.length; j++) {
								playTemperedNote(tMemory4[j]);
							}
							isRecorded4 = false;
							memoryButton1.style.display = 'none';
							memoryButton2.style.display = 'none';
							memoryButton3.style.display = 'none';
							clearMemoryButton.style.display = 'none';
						}
					}
				});
				clearMemoryButton.addEventListener('click', function() {
					if (isRecorded1 || isRecorded2 || isRecorded3 || isRecorded4) {
						clearMemoryButton.style.display = 'inline-block';
						isRecorded1 = false;
						isRecorded2 = false;
						isRecorded3 = false;
						isRecorded4 = false;
						memory1 = [];
						memory2 = [];
						memory3 = [];
						memory4 = [];
						tMemory1 = [];
						tMemory2 = [];
						tMemory3 = [];
						tMemory4 = [];
						memoryButton1.style.opacity = "0.5";
						memoryButton2.style.opacity = "0.5";
						memoryButton3.style.opacity = "0.5";
						memoryButton4.style.opacity = "0.5";
						stopAllNotes();
						stopAllTemperedNotes();
					}
				});
