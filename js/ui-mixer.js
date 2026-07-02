import { buttons, buttonsLength, tnotes, tnotesLength } from './data/notes-config.js';
import { downOctave, playNote, stopNote, upOctave } from './harmonic-tuner-notes.js';
	//construction du mixer
			const slidersContainer = document.getElementById("sliders-container");
			for (let i = 1; i <= buttonsLength; i++) {
				// Créer un div pour chaque slider
				const sliderContainer = document.createElement("div");
				sliderContainer.classList.add("slider-container");
				sliderContainer.id = "slider-container-" + i;
				sliderContainer.style.display = "none";
				sliderContainer.style.background = "gray";
				// Créer un élément de type range pour chaque slider
				const volumeSlider = document.createElement("input");
				volumeSlider.type = "range";
				volumeSlider.classList.add("volume-slider");
				volumeSlider.id = "slider" + i;
				volumeSlider.min = "0";
				volumeSlider.max = "100";
				volumeSlider.value = "50";
				// Créer un élément de type p pour afficher la valeur de chaque slider
				const sliderValue = document.createElement("p");
				sliderValue.classList.add("slider-value");
				sliderValue.id = "slider-value" + i;
				sliderValue.innerHTML = "50";
				// Créer un élément de type p pour afficher le nom de chaque slider
				const sliderName = document.createElement("p");
				sliderName.classList.add("slider-name");
				sliderName.id = "slider-name" + i;
				sliderName.innerHTML = "DO";
				let downButton = document.createElement("img");
				downButton.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAQAAACTbf5ZAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAHYYAAB2GAV2iE4EAAAlsSURBVHja5V0JjBRFFP3dPVdP7+wcO7O7c+3unEqMJxLwWAzqKkFAhaCiIR6JB6IRokaNRhMVhRi5TDwgGkgE4xFv4xWichgjAoq6COKFqASCgBBAIjNWdU9PVw+z7Ox0V2338Cu7s5Od6arX/9ev/3/9+g0wcHLFbvPvgiJXxD/Kbyi1yNb0PM9QEMEMcrlPz8yNbFOvre/Pvyt2O7iBPjWNSvRCqWvc+BJcaX9+mfcscJneoSCOyC+VDih98uV+8ftEb9MoqmC5QG5JNbCRrfE7uDDVnkPxOyJbq4HOLuZaKHUaGBfcSYJVBC2xMTQRPMCCHMEJyV6lVxJ0cGdgvPmdidmFKm/58pyNbWqZxGQeacSHJkZ/UOc0r/F5IeczsRfnkNgmjbdKJ9Lu2DRwwmAQH50q7akcT2yTc4hJ12+Z5D4Euotzxdxz1GZOjdok+wypTfCoXIdarjDhyqnHK+dMfLM4AixA4oj4j5U6BY1WMHJNd/41be1TXtPzwAtWIWdmDhQ4YoRQRCOuV6twTelVoAMb2O7rAYuRryewHYhlCrFkFReoB244uYG0cZC4rODbwILEt6ZWgM7eS24YsFXAt8a/gyLZMvMHSSfXNFw00XSjjX83IOZwLZi7HHGB6K1gcYpO1UbLyVzmI7XC9SXXk191HPaPARuQf4zjMMmmznVcsCbNnP6EhOs65D0HbELes13/kpBTn/Vv9HL5l8i54DkgDgMbkTjMc5Acf35ZP+ty18PkHUJwh4PNSByO7UJNQhGiY/hD47FNpfpB/H9SN9iQpG6uoPpUCEuhT1/KkRMPakYkcrsuA5sSGjlhcLoPOnJVlRVeebUQSnw62JjiM8iQEEJ2tDmcmUsaaNlFYHPC/rvm8CB0FRbphZp7j9T55xRiU6xJ6FpNsrD5InItag7/CWVhlnYLCWgAEhLiXg1y+E/CpcCWqBYu8V8CDUL+saTcIpQKeYYC4QIi2W8gyj4LZdWF7IozZXnu+lKD2/or528kwCC1/aahS61BHl94Mslf3dRuCEKICNUVvhrIeEF+KTQgIVREzAaAsEgaQzsfra1dhwilrKHvuA8alDruJcRaYzbX3KiAQSImrqq022+CBiaEjuQw0l5/cE2NDBg84W0lyCX+3gINTgihChjvptcVurYVcf5S1oIc7JoNxwGlZoGyLEHRkT4eACOUCuDMp3CcUHa5DDg04XgBjJAWwfkvFzJyET7iPUfqls6VW3e5jSSa/l1FazqvsvX9OambbzekuIKuw5B/zcglfBfwRWDYuGKzoQ3b/KsQNJQB07kWiCQX2mDluMVXRsYbGAd8q1HAHDPu4p5Qj0aEugX9GLlA63XsOKz003rt4Co+V3wzu/mLTOAtJuVxGlD1E1kqLdTb4AcUutaxgot6skLaRfPFWiIgLe1c2j242CIWTHqlolJ4aspKXpBWGks6M5HE4VBQhkYHsPJqjfy/EuXeU7afOSoCjSHn3jW2gJpM7lOByIWjYXC4T7Oa6/UyUAMMxfwr1nOvc1CgtiAVnHkruteLaAG26I6mEOeOKALIm6ad5U36I0KHRSMK+jwRM5RV1fwM6xAf8RwwW5y9+62ZtKz6xw+a5y4q9hW6orXD3b6/wTTAOMGmtozYQaT4dDMFOj7D+rFQr7I1aQZ/Q3+ZevyKFrXfaBZ/0ZVsQa62X8jDIfXwFuSMIgsdGDo2tVxpZD0u585Nts+eBpfsNcrhxEZb5Xv6LzGiuOQ967E227hKrTHCYfRth80AS931hQRKh3VHgv0osxzqAozcheXA2xCwkqVbT0PftCflX68Hbv4NsCs5T8Bhn9pC9NqnTDvaPihhn8W1hm/L4dglYGcSujCPawWMX9E37E2ZBbUtT6VwzgIGE41y2CeGD7nW1hyHhThtoxccKeo21yyoicPIvprFYIpFp1L3JELe/bWF6+jXBoneDJkv6G9S4Yz0/lvyXgYa5QtAepF6mJtrCuzoy0MuZ+TvoJ+RLyTk1EMWgbLYNKgoNaYvCwZF9An6AcYZMuD2nxhkTrjCv1dfj5X1N7IVJOpj4OO/gpIg7j2b/t0NXwN9chiK6L/USRwBakZ87i0WRlf0xz6jz5tZVOXKv1kGjBRXJ/0OcYWB6hwOjGNwvztKvbEz6QCS31RdjtazCOdk5utOtTj/42P0O1XOoVc23wX0e+ajzqIOMCsepz4nXQU5u241i3COUpyofIwH/yEcYTGPxeGVBTlZlEYRkg6tR+Iw7ctMQgIfqapLPo/+IYvsK1xuh9NOl2pvWNxt9ymkSKN39KVqmM6sxXmS6gA6vmWxvaHV2TN23qJWQ75jg3aDEVrPGWrWjVx26x76I3Bk1Yyu6iVjzKXE3eoU4tUAcO55zcTjCs4T6A8iNKn957ZfzKhC2W84J68UIlLQIaTyGtUm/qMl6XauZVRplkWqKJ/+SkMm7i3nA0WmqJ4MrxTDbBBKzVTT22SPbApxt9Mfk7ZPc08jwG06n8SEEDp0SzMZd5J2szBCKBsbnb69RLxsn5Cs9Fcn645TrLf5EXl359cknparqigRvC2i29IS7IsXjZ7Mxl1cXUVK+pppmTl2hZt+Ul8vrc9sL0fKu48MtnU+YEe4HfeTwUHvvmOef/f14PLFmrFph9S/CsvqTs2QxL/7rZeM8+jIpzck7rITXDkQS4hzTeVYuh5RzRAFMhIRGwqzbEI9WqNBln2avEtIyz1lgyQiDketSOnMPlP7OiPkXiD9ZGR2v2PxvFZP7p2KEb8wsNCRE0PmCW2X7LVutQ9HOvG9NlJegTvg3RQB792Toi3tYRE/Hjj5x0r79YoWjbwuo4nDJxj0CgzNE2ul9LrxSRpSUSHr4SEDcdDW66HiIUOxH1wnWwbtKYmNeimEYtsNBi8qjcRVisidPqGYeswCfHanZjqK+h1J/y5TcjSFJC5eoedz+0/NowfzeGvz6LYt5KNLZFFee5QLWDeJ6pNRyBBr9qPByZlznohj23oDUl51zZW6wHhStMur3YtsE8mELlylEojH5CiiTOOJS8C3Zt/WPwFHWfVyL7FRY66Ts8v4o/pHvH2bj1LrNHg5PpVUOXvQcrUicClFRSYGxmdXVus3sD04gbIu4fyZuXyBrCWvtuCO9BOuk0zeCxRcJ6Vmh3ZWZv3Iq0UhPY/RQT1HLveBfi5r0Nu3pGaa8iBA0TM09Whsi357ldAe79d3avx/D8VwLUOEkdwAAAAASUVORK5CYII=";
				downButton.alt = "Down";
				downButton.classList.add("singlebutton");
				downButton.classList.add("downbutton");
				downButton.id = "down-button-mixer-" + i;
				let upButton = document.createElement("img");
				upButton.src = "data:image/png;base64,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";
				upButton.alt = "Up";
				upButton.classList.add("singlebutton");
				upButton.classList.add("upbutton");
				upButton.id = "up-button-mixer-" + i;
				// Ajouter les éléments de type range et p au div parent
				sliderContainer.appendChild(volumeSlider);
				sliderContainer.appendChild(sliderValue);
				sliderContainer.appendChild(sliderName);
				sliderContainer.appendChild(upButton);
				sliderContainer.appendChild(downButton);
				// Ajouter le div parent au conteneur principal
				slidersContainer.appendChild(sliderContainer);
				// Mettre à jour la valeur affichée et le gain (si la note est en cours de lecture) en fonction de la valeur actuelle de l'élément de type range
				volumeSlider.addEventListener("input", (function(iCopy) {
					return function() {
						const outputId = "slider-value" + iCopy;
						const output = document.getElementById(outputId);
						output.innerHTML = this.value;
						const button = buttons[iCopy];
						if (button.gainNode) {
							button.gainNode.gain.value = this.value / 100 * 1.3 - 1;
						}
					}
				})(i));
				//Reset à 0 lors du double clic
				volumeSlider.addEventListener("dblclick", (function(iCopy) {
					return function() {
						const outputId = "slider-value" + iCopy;
						const output = document.getElementById(outputId);
						this.value = 0;
						output.innerHTML = this.value;
						const button = buttons[iCopy];
						if (button.gainNode) {
							button.gainNode.gain.value = this.value / 100 * 1.3 - 1;
						}
					}
				})(i));
			}
			for (let i = 1; i <= tnotesLength; i++) {
				// Créer un div pour chaque slider
				const sliderContainer = document.createElement("div");
				sliderContainer.classList.add("slider-container");
				sliderContainer.id = "tslider-container-" + i;
				sliderContainer.style.display = "none";
				sliderContainer.style.background = "gray";
				// Créer un élément de type range pour chaque slider
				const volumeSlider = document.createElement("input");
				volumeSlider.type = "range";
				volumeSlider.classList.add("volume-slider");
				volumeSlider.id = "tslider" + i;
				volumeSlider.min = "0";
				volumeSlider.max = "100";
				volumeSlider.value = "50";
				// Créer un élément de type p pour afficher la valeur de chaque slider
				const sliderValue = document.createElement("p");
				sliderValue.classList.add("slider-value");
				sliderValue.id = "tslider-value" + i;
				sliderValue.innerHTML = "50";
				// Créer un élément de type p pour afficher le nom de chaque slider
				const sliderName = document.createElement("p");
				sliderName.classList.add("slider-name");
				sliderName.id = "tslider-name" + i;
				sliderName.innerHTML = "DO";
				let downButton = document.createElement("img");
				downButton.src = "data:image/png;base64,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";
				downButton.alt = "Down";
				downButton.classList.add("singlebutton");
				downButton.classList.add("downbutton");
				downButton.id = "down-tnote-mixer-" + i;
				let upButton = document.createElement("img");
				upButton.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAQAAACTbf5ZAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAHYYAAB2GAV2iE4EAAAvlSURBVHja5V0JbBTXGX7/m/PtMbOnzdGkpYQbIkIRGANJKmg5wlVQ05IUURUohUQ4CkEJIVVEAbVp0oamByWBHCIpFabC0FZNSABzFDAqZ0CExmBDgVAC4aY2eHf7Zsezb9as7bV3ZzxD/ievLe/Ovvne/7//eu/9g1DLCaN75BelLb7zkNAaoq3+dxzF1DPhNfzTMAmKUCekIL7F387TqzpBEUzknw6vUc6gGP3WtH4g4f9c2iK/iO6hd2I5AfKJM6SNyjlIMLg6VPJF5C/8HBgJPVGgFUAbEocC0BNG8nOi68gXOmwGGRLKOWmjOJ0ODlgJl8PF0ir1OJg61sEWHPYswROhV95vAJACvWECWVJwmPFa7xcSaqX4Li6mQ2MRb0PyC94KsQYSrKE41BVuFUrgQdQ+D1xtnNvtYahQEt0KdbRHU/9ijbdC/imK5J/PGAbKa5TPUIJxV+NsYTn3E+iPVGQHqdCfn1lYrnHaPJ2Uz6Q1uCi/81mSZpNdQm2agooV7OWfpGC9yE7yUtBPRvdR0CZFJtSS3dIsRPIlygXyUrUqfdb6z5CFMBj5UVuQHwaThf4z+ow2gKtV8lJUkLtoA/QhpeSSoSExfeVuh9fAGFSI2pIKYXS4FJv4jBLkElkLfXKDDNy35G2aKOsjSX/ioVPCHGp4ONTWhKGnUBI6BSY+C7XyNm546yFjYbJ3H0owuCgWXg+jbFJR2amxEZEN+nw27tOzV/h+69jBSTP9R80zV75GFlGR4ZCTCNMpt0i+ar5P/1FpZstNJCeVqCdSgkzVVLCan47aISdSO35asFozVcbdqselEiS0FG41MmnlaAUeY7MBapmxGhWtYH4Y1dnV0lPZcxlLs9VqMIUEkb/CIAv9qLz4YjAo8jcWZoAGeXZ2zggIU9Qqs6IKroL7rXXR8+Qw3B9cZbbNapXwg+bvG7iRyjEzXHUl6orcQl0Db5l1tnKMG9EMZOjn329yIOMU7n3ITXSfukL3tHUM3n3Qr6mPd/BvQoy7cSoi7oKrUefgu0ywqZHaROO4Roj4VnK3U+IcD69zkTCbqVu4zDBSQB1h34rM9gXkueQqSmUwCndRJ8OlBL0LdxoZEupjXyHPZNDX+EHlZApuIloJDyEXEwyOfMrQKCfxHWgK1e3sA+QK912H291mfQnuUZnJa0LdQUNH89u+V/jbTJzlZ5EHuZ088nNMrOlMfsUUBXDD/OdNymoNiqK7gaLhUqa8/Oe5YcYbIfWfiIb2uh8aOUb9KsunGB1tznrvDXpFjumosC7WoeR/yTxNnOtHIsY/Zn16Gw+VlkvL8VDrB5Z/DGKGReZuk3l0kKGLHijo/6Sumc/y2+jg2SPfINc9e1BHy/vyBd5GKb+LIu2C1D+yoCp4AvWwfmr5FhkxDf3LBv+aomJh4zLkv8DyzNJMG1ZrOvnPGIDpX1+3HjFFlcpjU7QMfXQrClo/q5RXmYjREV9qwxAHC7aZkhnM5+RG2eABdVf+y1ILNIA7DzZMIm4UZjGCEUpFy2xwNiDwBjKvXmhq8g0b0oKe8PpUr3rX3C3OBt8Z+novMndPb96LTUeseTKED3G30gBT/hLrew2+1xCu1kKrbfDb5cj6FGDNe8bDbOBvEbkMd8AFGqrgYhvm8bD6tIB2C4W7bJi/XGhdJv5qLViGROvnceHuFGBpqg2z6JueayiRicM0HL3O2SBh4tRkb1RPnk2PFa3pLfiBWTebASd9vA+QbPk9RJSzKAn4N9Ybf36cdBMaBQwJ6SY/3nolEnxNAxzHA62fP6HtKNEUYKqrt1sftlCkcRQ9ar3CEiYLNY0pLKMJNcJkyweeRD5BymLLu1FC+5uDm7TH+6xfeVaXIFxkebQyg6uDZuFSb75O+rHlQj0AWT6q4cC/s+Fv0q8+";
				upButton.alt = "Up";
				upButton.classList.add("singlebutton");
				upButton.classList.add("upbutton");
				upButton.id = "up-tnote-mixer-" + i;
				// Ajouter les éléments de type range et p au div parent
				sliderContainer.appendChild(volumeSlider);
				sliderContainer.appendChild(sliderValue);
				sliderContainer.appendChild(sliderName);
				sliderContainer.appendChild(upButton);
				sliderContainer.appendChild(downButton);
				// Ajouter le div parent au conteneur principal
				slidersContainer.appendChild(sliderContainer);
				// Mettre à jour la valeur affichée et le gain (si la note est en cours de lecture) en fonction de la valeur actuelle de l'élément de type range
				volumeSlider.addEventListener("input", (function(iCopy) {
					return function() {
						const outputId = "tslider-value" + iCopy;
						const output = document.getElementById(outputId);
						output.innerHTML = this.value;
						const tnote = tnotes[iCopy];
						if (tnote.gainNode) {
							tnote.gainNode.gain.value = this.value / 100 * 1.3 - 1;
						}
					}
				})(i));
				//Reset à 50 lors du double clic
				volumeSlider.addEventListener("dblclick", (function(iCopy) {
					return function() {
						const outputId = "tslider-value" + iCopy;
						const output = document.getElementById(outputId);
						this.value = 50;
						output.innerHTML = this.value;
						const tnote = tnotes[iCopy];
						if (tnote.gainNode) {
							tnote.gainNode.gain.value = this.value / 100 * 1.3 - 1;
						}
					}
				})(i));
			}
			//mixer
		
			let mixerBtn = document.getElementById('mixer-btn');
			mixerBtn.addEventListener("click", function() {
				if (mixer.classList.contains("collapsed")) {
					mixer.classList.remove("collapsed");
					mixer.style.paddingBottom = "35VH";
					mixerBtn.style.background = "#e6f3f7";
					container.style.opacity = "0.7";
					intro.style.opacity = "0.7";
				} else {
					mixer.classList.add("collapsed");
					mixer.style.paddingBottom = "0";
					mixerBtn.style.background = "";
					container.style.opacity = "1";
					intro.style.opacity = "1";
				}
			});
			
			// Ajoute des écouteurs d'événements aux boutons
			export function eventsListeners() {
				Object.keys(buttons).forEach(buttonId => {
					let button = buttons[buttonId];
					let noteDef = document.getElementById(`note-definition-${buttonId}`);
					let noteName = document.getElementById(`note-name-${buttonId}`);
					let stopButton = document.getElementById(`${buttonId}-stop-button`);
					let upButton = document.getElementById('up-button-' + buttonId);
					let downButton = document.getElementById('down-button-' + buttonId);
					let upButtonMixer = document.getElementById('up-button-mixer-' + buttonId);
					let upButtonIntro = document.getElementById('up-button-intro');
					let downButtonMixer = document.getElementById('down-button-mixer-' + buttonId);
					let downButtonIntro = document.getElementById('down-button-intro');
					noteDef.addEventListener('click', () => {
						if (button.isPlaying) {
							stopNote(buttonId);
						} else {
							playNote(buttonId);
						}
					});
					noteName.addEventListener('click', () => {
						if (button.isPlaying) {
							stopNote(buttonId);
						} else {
							playNote(buttonId);
						}
					});
					upButtonMixer.addEventListener('click', () => {
						upOctave(buttonId);
					});
					downButtonMixer.addEventListener('click', () => {
						downOctave(buttonId);
					});
					downButtonIntro.addEventListener('click', () => {
						if (button.isPlaying) {
							downOctave(buttonId);
						}
					});
					upButtonIntro.addEventListener('click', () => {
						if (button.isPlaying) {
							upOctave(buttonId);
						}
					});
				});
			}
