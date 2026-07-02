					//cercles graduations
						window.addEventListener("load", function() {
						let circle = document.getElementById("graduation-circles-container");
						const fragment = document.createDocumentFragment();
							for (let i = 1; i <= 46; i++) {
								let circleElement = document.createElement("div");
								circleElement.classList.add("circles");
								circleElement.id = "circle" + i;
								const width = 101.2 - i*1.2;
								circleElement.style.width = width +'%';
								circleElement.style.paddingBottom = width +'%';
								fragment.appendChild(circleElement);
							}
						circle.appendChild(fragment);});
