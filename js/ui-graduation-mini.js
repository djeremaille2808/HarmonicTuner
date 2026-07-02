					//600 graduations de 2 cents
						window.addEventListener("load", function() {
						let circleGradElement = document.getElementById("circle");
						const fragment = document.createDocumentFragment();
						for (let i = 1; i <= 600; i++) {
							let grad = document.createElement("div");
							grad.classList.add("graduation-mini");
							grad.id = "grad-mini-" + i;
							const angleGrad = (i*0.6);
							grad.style.transform = 'translate(-50%, -50%) rotate(' + angleGrad + 'deg)';
							fragment.appendChild(grad);
							}
						circleGradElement.appendChild(fragment);});
