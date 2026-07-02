# Mode d'emploi : Accordeur Harmonique v1.4

## Introduction

L'Accordeur Harmonique v1.4 est une application web interactive conçue pour accorder des instruments de musique et explorer les relations de hauteur sonore. Elle compare l'intonation juste (série harmonique avec des intervalles parfaits comme les quintes 3:2) à l'égal tempérament (échelle chromatique standard). L'app utilise le microphone de votre appareil pour détecter la hauteur en temps réel et génère des sons de référence. Elle est utilisable sur ordinateur et mobile.

**Objectif** : Aider les musiciens à accorder précisément, expérimenter les harmoniques (surtitres), et visualiser les écarts en cents par rapport à une fréquence de référence (par défaut La4=442 Hz).

## Aperçu de l'interface

- **Cadran circulaire principal** : 
  - Boutons intérieurs (78) : Notes harmoniques (intonation juste), codées par couleur (rose pour quintes, bleu pour tierces majeures, jaune pour mineures, bleu foncé pour septièmes).
  - Boutons extérieurs (12) : Notes tempérées (échelle égale : Do à Si).
- **Aiguille de tuning** : Montre l'écart en cents (±50 cents maximum). Verte si parfait (0 cents = accord exact).
- **Visualiseur** : Graphique linéaire des derniers cents détectés (comme un oscilloscope de hauteur).
- **Panneau Mixer** : En bas, pour régler le volume par note (apparaît en jouant des sons).
- **Panneau Paramètres** (icône engrenage) : Ajuster le diapason (435-445 Hz pour La4), masquer le visualiseur, activer "arrêter les autres notes".
- **Bouton central** : Démarrer/arrêter l'accordeur (play/pause).
- **Contrôles latéraux** : Boutons haut/bas pour octaves, flèches pour quintes ; bouton stop global.

L'interface s'adapte au mobile (rotation tactile du cadran) et au bureau. Commence par un écran de chargement.

## Mise en route

1. Ouvrez `HarmonicTuner_v1.4.html` dans un navigateur moderne (recommandé : Chrome ou Firefox sur ordinateur/mobile).
2. Autorisez l'accès au microphone (pop-up de permission requis pour la détection sonore).
3. Attendez le chargement (barre de progression apparaît brièvement).
4. Cliquez sur le bouton central (icône play) pour activer l'accordeur. L'aiguille et le visualiseur s'affichent.
5. Jouez une note sur votre instrument (ex. : guitare) vers le micro. Le cadran tourne et l'aiguille indique l'écart.

**Conseil** : Utilisez un environnement calme pour une détection précise. Vérifiez que votre navigateur supporte Web Audio API.

## Utilisation détaillée

### Accordage avec le microphone
- Activez l'accordeur (bouton central).
- Jouez une note (ex. : La sur guitare). L'app détecte la hauteur et affiche :
  - **Fréquence en Hz** : Dans les logs du navigateur (console F12).
  - **Écart en cents** : Aiguille au centre (±50 cents). 0 = parfait ; positif = trop aigu ; négatif = trop bémol.
  - **Visualiseur** : Ligne ondulée montrant l'historique récent (vert pour accord, etc.).
- Le cadran rotate pour matcher la hauteur détectée. Comparez avec les boutons colorés (harmoniques en intérieur, tempérées en extérieur).
- Ajustez votre instrument jusqu'à 0 cents (aiguille verte).

**Note** : La détection assume un La4 à 442 Hz. Elle est plus précise sur des sons soutenus (pas staccato).

### Lecture de notes de référence
- **Notes harmoniques** (intérieur) : Cliquez sur un bouton coloré pour jouer un son en intonation juste (scie dentelée pour un timbre riche en harmoniques).
  - Couleurs indiquent l'intervalle : Rose (quintes), bleu clair (tierces majeures), jaune (mineures), bleu foncé (septièmes).
  - Ex. : Cliquez sur une "quinte rose" pour entendre un intervalle parfait 3:2 relatif au Do central.
- **Notes tempérées** (extérieur) : Cliquez pour jouer l'échelle standard (ex. : Do à 261.6 Hz).
- **Contrôles** :
  - **Octave** : Boutons haut/bas latéraux ou clics sur flèches (augmente/réduit l'octave).
  - **Quinte** : Flèches gauche/droite pour monter/descendre d'une quinte juste (ou tempérée).
  - **Volume** : Le panneau mixer s'ouvre ; glissez les curseurs (double-clic pour reset). Jouez multiples notes pour des accords.
- **Arrêt** : Cliquez à nouveau sur la note, ou bouton stop global. Barre espace : Pause/reprise dernière note.

### Panneau Mixer
- Apparaît automatiquement quand une note joue.
- Curseurs de volume pour chaque note (0-100%).
- Boutons mémoire (A, B, C, D) : Enregistrez jusqu'à 4 combinaisons de notes (jouez-les, cliquez sur un bouton mémoire). Répétez en cliquant dessus.
- Bouton "Clear" : Efface tout en mémoire.

### Paramètres (icône engrenage)
- Cliquez pour ouvrir le panneau latéral.
- **Diapason** : Ajustez La4 (435-445 Hz) pour changer la référence (ex. : 440 Hz standard orchestral).
  - "Tempéré" : Pour l'échelle égale.
  - "Harmonique" : Pour l'intonation juste.
- **Arrêter autres notes** : Cocher pour superposer les notes (sinon, clic stoppe les précédentes).
- **Masquer visualisation** : Cache le graph pour vue plus simple.
- Fermez en cliquant à nouveau sur l'engrenage.

**Astuces clavier** :
- Flèches haut/bas : Octave.
- Flèches gauche/droite : Quinte.
- Barre espace : Pause/reprise dernière note.

## Fonctionnalités avancées

### Exploration harmonique
- Utilisez les harmoniques pour accorder des instruments non-standards (ex. : cordes avec just intonation).
- Activez plusieurs notes pour entendre battements (différences de fréquence) et affiner l'accordage.
- Rotation manuelle : Quand l'accordeur est arrêté, touchez/glissez le cadran pour explorer visuellement.

### Modes comparaison
- **Harmonique vs. Tempéré** : Jouez un bouton harmonique et une tempérée proche ; écoutez/comaprez les écarts (utiles pour théorbe ou viol).
- **Accords** : Enregistrez en mémoire (ex. : accord majeur juste) et jouez pour tester vos sons.
- **Visualiseur personnalisé** : Le graph montre l'historique des cents ; masquez-le si inutile.

## Résolution de problèmes

- **Pas de son** : Vérifiez permissions micro (HTTPS requis). Redémarrez l'accordeur. Sur iOS, touchez l'écran pour activer l'audio.
- **Détection imprécise** : 
  - Assurez 44.1 kHz sample rate (alerte si différent).
  - Parlez/jouez plus fort et soutenue.
  - Fermez onglets audio concurrents.
- **Interface ne charge pas** : Mettez à jour le navigateur. Testez en mode avion pour PWA.
- **Mobile lent** : Utilisez paysage ; fermez le visualiseur. Évitez multitâche.
- **Erreur audio** : Ouvrez console (F12) pour logs. Testez sur un autre appareil si problème persistant.

## Conseils

- **Pour guitare/basse** : Accordez en mode harmonique pour intonation juste (meilleure qu'égale pour cordes).
- **Environnement** : Utilisez un micro externe pour précision. Évitez échos (oreilles libres).
- **Apprentissage** : Jouez des intervalles connus (ex. : quinte Do-Sol) et ajustez jusqu'à 0 cents sans battements.
- **Personnalisation** : Éditez le fichier HTML pour changer fréquences (section `<script>` constants).
- **Sauvegarde** : Pas de presets permanents ; notez vos mémoires pour réutilisation.

Cet accordeur est idéal pour musiciens classiques, théoriciens ou curieux des tempéraments. Pour plus, consultez le [README](README.md) (en anglais).

*Dernière mise à jour : Septembre 2025*
