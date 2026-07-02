			// Défiinitions des constantes
			export const A4 = parseFloat(getCookieValue("temperedTuning", 442)); //Fréquence de A4 en Hz (442 Hz par défaut)
			export let temperedDiapason = A4/2; //Diapason de l'accordeur
			
			export let baseFrequencyHarmonicNotes = 295/2; //Diapason sur lequel se base tous les buttons
			export let baseFrequencyTemperedNotes = temperedDiapason; //Diapason sur lequel se base tous les tnotes
			
			export let refreshRateTunerSystem = 25;
			export let refreshRateTunerCents = 150;
			

			export let fifthColor = ''; //Rose 
			export let majorThirdColor = ''; //Bleu clair
			export let minorThirdColor = ''; // Jaune clair
			export let seventhColor = ''; // Bleu foncé

			if (getCookieValue("fifthsColor")){fifthColor=getCookieValue("fifthsColor")}else{fifthColor = '#e18fc2';}
			if (getCookieValue("majThirdsColor")){majorThirdColor=getCookieValue("majThirdsColor")}else{majorThirdColor = '#64a5e6';}
			if (getCookieValue("minThirdsColor")){minorThirdColor=getCookieValue("minThirdsColor")}else{minorThirdColor = '#f7cc88';}
			if (getCookieValue("seventhsColor")){seventhColor=getCookieValue("seventhsColor")}else{seventhColor = '#4d79bb';}



			// =========================================================================
			//         STOCKAGE DES PRÉFÉRENCES (localStorage, ex-cookies)
			// =========================================================================
			// Données purement côté client : pas besoin de les envoyer au serveur,
			// pas de limite de taille (~4 Ko) ni d'expiration involontaire.

			/**
			 * Récupère une préférence stockée. Retourne la valeur par défaut si absente.
			 * @param {string} key
			 * @param {any} defaultValue
			 * @returns {string | any}
			 */
			export function getCookieValue(key, defaultValue) {
				const value = localStorage.getItem(key);
				return value !== null ? value : defaultValue;
			}

			/** Lit la valeur brute d'une préférence. Retourne null si absente. */
			export function getCookieRaw(key) {
				return localStorage.getItem(key);
			}

			/** Enregistre une préférence (le paramètre `days`, hérité des cookies, est ignoré). */
			export function setCookie(key, value) {
				localStorage.setItem(key, value);
			}

			/** Supprime une préférence stockée. */
			export function removeCookie(key) {
				localStorage.removeItem(key);
			}

			const ONE_YEAR_DAYS = 365;
			const DISPLAY_THRESHOLD = 10; // Nombre de visites avant affichage de la modale de don

			/** Enregistre le clic PayPal (succès) et désactive la modale définitivement. */
			export function catchPaypalClick() {
				setCookie("paypal_success", "true");
				const modalOverlay = document.getElementById('donation-modal-overlay');
				if (modalOverlay) {
					modalOverlay.style.display = 'none';
				}
			}


		// =========================================================================
		//                              LOGIQUE PRINCIPALE
		// =========================================================================

		document.addEventListener('DOMContentLoaded', () => {
			const modalOverlay = document.getElementById('donation-modal-overlay');
			const closeBtn = document.getElementById('close-donation-modal');
			
			if (!modalOverlay) return; 

			// Lecture et conversion des cookies
			const paypalSuccess = getCookieRaw('paypal_success');
			let visitCount = parseInt(getCookieRaw('visit_count')) || 0; 

			// 1. CAS SUCCÈS : Si déjà cliqué, on sort immédiatement.
			if (paypalSuccess !== null) {
				return;
			}

			// 2. LOGIQUE D'AFFICHAGE ET DE COMPTAGE

			// Si le seuil n'est PAS atteint, on incrémente le compteur pour le prochain chargement
			if (visitCount < DISPLAY_THRESHOLD) {
				visitCount++;
				setCookie('visit_count', visitCount, ONE_YEAR_DAYS);
			}

			// 3. AFFICHAGE ET RÉINITIALISATION CLÉ
			if (visitCount >= DISPLAY_THRESHOLD) {

				// A. Affichage de la modale
				setTimeout(() => {
					modalOverlay.style.display = 'flex';
				}, 10000); 
				
				// B. Réinitialisation du compteur IMMÉDIATEMENT à 0
				// Cela garantit que le prochain chargement commencera un nouveau cycle (0 -> 1).
				setCookie('visit_count', 0, ONE_YEAR_DAYS);
			}
			
			// 4. GESTION DE LA FERMETURE (La croix et le clic extérieur)
			
			/** Gère la fermeture simple. Le compteur a déjà été réinitialisé à 0 par la logique d'affichage. */
			const hideModal = () => {
				modalOverlay.style.display = 'none';
			};

			// Écouteur pour le clic sur la croix
			if (closeBtn) {
				closeBtn.addEventListener('click', hideModal);
			}

			// Écouteur pour le clic en dehors de la boîte modale
			modalOverlay.addEventListener('click', (e) => {
				if (e.target === modalOverlay) {
					hideModal();
				}
			});
		});

						// --- Définition des couleurs par défaut ---
						export const DEFAULT_COLORS = {
							fifth: '#e18fc2',     // Rose
							majorThird: '#64a5e6', // Bleu clair
							minorThird: '#f7cc88', // Jaune clair
							seventh: '#4d79bb'   // Bleu foncé
						};

		

			// ... votre tableau let buttons = { ... } (avec la propriété 'type' ajoutée)
			// ... votre variable buttonsLength

			/**
			 * Réinitialise toutes les variables de couleur aux valeurs par défaut,
			 * supprime les cookies correspondants, et met à jour le DOM.
			 */
			
		

// --- Setters pour les états mutables partagés (réassignés depuis d'autres modules) ---
export function setTemperedDiapason(v) { temperedDiapason = v; }
export function setBaseFrequencyHarmonicNotes(v) { baseFrequencyHarmonicNotes = v; }
export function setBaseFrequencyTemperedNotes(v) { baseFrequencyTemperedNotes = v; }
export function setFifthColor(v) { fifthColor = v; }
export function setMajorThirdColor(v) { majorThirdColor = v; }
export function setMinorThirdColor(v) { minorThirdColor = v; }
export function setSeventhColor(v) { seventhColor = v; }
// Exposition globale pour les handlers inline du HTML
window.catchPaypalClick = catchPaypalClick;
