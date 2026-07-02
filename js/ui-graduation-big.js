					//120 graduations
					window.addEventListener("load", function() {
						let circleGradElement = document.getElementById("circle");
						const fragment = document.createDocumentFragment();
						for (let i = 1; i <= 120; i++) {
							let grad = document.createElement("div");
							grad.classList.add("graduation-small");
							grad.id = "grad-" + i;
							const angleGrad = (i*3);
							grad.style.transform = 'translate(-50%, -50%) rotate(' + angleGrad + 'deg)';
							fragment.appendChild(grad);
						}
						circleGradElement.appendChild(fragment);});
