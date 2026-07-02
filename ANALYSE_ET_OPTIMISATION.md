# Analyse & plan d'optimisation — Harmonic Tuner v2.0

**Date d'analyse :** 2026-07-01
**Date des correctifs :** 2026-07-01
**Date du split en fichiers (Phase 1) :** 2026-07-01
**Fichier principal :** `index.html` — passé de ~6850 lignes (tout inline) à **304 lignes** (squelette HTML seul)

**Correction importante par rapport à l'analyse initiale :** `HarmonicTuner_v2.0.html` n'est **pas** une copie inutile — c'est le `start_url` déclaré dans `manifest_v2.0.json` (l'app installée en PWA démarre sur ce fichier, `index.html` sert aux visites web classiques). Les deux fichiers sont donc volontairement synchronisés à chaque changement plutôt que fusionnés.

---

## Résumé exécutif

✅ **Tous les correctifs de bugs ont été appliqués** à `index.html` et répercutés sur `HarmonicTuner_v2.0.html`. Un correctif reste volontairement **non appliqué** (voir « Non appliqué » plus bas) car il nécessite un test visuel en navigateur que je ne peux pas effectuer ici en toute sécurité.

✅ **La Phase 1 du split en fichiers a été appliquée** (voir section dédiée en fin de document) : le monolithe est désormais réparti en 2 fichiers CSS et 14 fichiers JS, chargés dans le même ordre qu'auparavant.

Vérification effectuée : tous les blocs `<script>`/`<style>` ont été validés syntaxiquement après extraction (aucune erreur introduite), les accolades CSS sont équilibrées, et `HarmonicTuner_v2.0.html` a été resynchronisé.

---

## 🔴 P0 — Bugs bloquants (corrigés)

### 1. ✅ Fuite d'AudioContext — l'accordeur se figeait après quelques marche/arrêt

**Où :** `resetAudioContext()`, `stopTunerScript()`, écouteur du bouton start/stop.

**Problème :** un nouvel `AudioContext` était créé à chaque appel sans jamais fermer l'ancien (`.close()` absent). Les navigateurs limitent le nombre de contextes simultanés (~6) : après quelques clics start/stop, la création échouait et l'audio se bloquait définitivement. Le clic sur le bouton appelait en plus `resetAudioContext()` **en double** (une fois dans le handler, une fois dans `startTunerScript()`), aggravant la fuite.

**Correctif appliqué :**
- Ajout d'une référence persistante `micAudioContext`.
- `resetAudioContext()` ferme désormais l'ancien contexte (`micAudioContext.close()`) avant d'en créer un nouveau.
- `stopTunerScript()` ferme aussi le contexte à l'arrêt.
- Suppression des appels redondants à `resetAudioContext()` dans le handler de clic (un seul point de création reste, dans `startTunerScript()`/`resetAudioContext()`).

---

### 2. ✅ AppCache + Service Worker en conflit — affichage/cache aléatoire

**Problème :** la balise `<html manifest="manifest_v2.0.appcache">` activait l'**AppCache**, technologie supprimée de tous les navigateurs modernes, en plus du service worker. Les deux mécanismes se disputaient les ressources → contenus périmés, affichage incohérent d'un chargement à l'autre.

**Correctif appliqué :**
- Attribut `manifest="..."` retiré de la balise `<html>`.
- Fichiers `manifest_v2.0.appcache` et `cache_v2.0.manifest` **supprimés** (plus aucune référence dans le projet).
- Version du cache du service worker (`service-worker.js`) passée de `"v2.0"` à `"v2.0.1"` pour forcer les clients existants à récupérer les nouveaux fichiers et purger l'ancien cache.

---

### 3. ✅ Absence de `<meta name="viewport">` — layout cassé sur mobile

**Problème :** sans cette balise, le mobile rendait la page en largeur « bureau » puis la dézoomait → layout imprévisible.

**Correctif appliqué :** ajout dans le `<head>` :
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

---

## 🟠 P1 — Bugs d'affichage / cookies (corrigés)

### 4. ✅ Media queries en `vh` sur la largeur (invalide)

**Problème :** `@media (min-width: 80vh)` / `(max-width: 80vh)` / `(min-width: 99vh)` — l'unité `vh` n'est pas valide dans une condition de largeur, comportement dépendant du navigateur.

**Correctif appliqué :** conversion vers l'équivalent standard `aspect-ratio`, qui préserve l'intention d'origine (rapport largeur/hauteur) au lieu d'une comparaison largeur-vs-hauteur bricolée :
- `(min-width: 80vh)` → `(min-aspect-ratio: 4/5)`
- `(max-width: 80vh)` → `(max-aspect-ratio: 4/5)`
- `(min-width: 99vh)` → `(min-aspect-ratio: 99/100)`

---

### 5. ✅ Police fantôme — 404 à chaque chargement

**Problème :** `@font-face` déclarait `Assistant-Regular.ttf`, fichier absent du projet → 404 à chaque chargement. De plus, la règle `font-family: Assistant` était immédiatement écrasée par une règle `font-family: sans-serif` plus bas dans le **même sélecteur** : la police n'était donc **jamais réellement utilisée**.

**Correctif appliqué :** suppression de la déclaration `@font-face` et de la ligne `font-family: Assistant;` devenues mortes.

---

### 6. ✅ Fonctions cookies dupliquées + code mort

**Problème :** `getCookieRaw`, `setCookie`, `catchPaypalClick` étaient chacune définies deux fois. La dernière définition écrasait la précédente par hoisting (le premier `catchPaypalClick`, un test « cooldown 5 minutes », était du code mort invisible).

**Correctif appliqué :** consolidation en une seule implémentation par fonction, regroupée dans une section unique « Stockage des préférences ». Voir aussi point 8 (migration vers `localStorage`).

---

### 7. ✅ Incohérence de type sur les valeurs de cookies

**Problème :** `getCookieValue("temperedTuning", 442)` renvoyait une **chaîne** si la préférence existait, mais un **nombre** sinon. `A4` servait ensuite dans des calculs (`A4/2`, `Math.pow`) qui ne fonctionnaient que par coercition implicite.

**Correctif appliqué :**
```js
const A4 = parseFloat(getCookieValue("temperedTuning", 442));
```

---

### 8. ✅ Cookies remplacés par `localStorage`

**Problème :** ~25 sites utilisaient `document.cookie` (couleurs, diapason, son sélectionné, cases à cocher, compteur de visites) — données purement client, envoyées inutilement au serveur à chaque requête, limitées en taille et sujettes à expiration.

**Correctif appliqué :**
- `getCookieValue`, `getCookieRaw`, `setCookie` réécrites pour s'appuyer sur `localStorage` (mêmes noms de fonctions conservés, donc **aucun site d'appel n'a eu besoin d'être changé individuellement** pour la lecture).
- Ajout de `removeCookie(key)` pour les réinitialisations (`resetColors()`).
- Les ~20 écritures brutes `document.cookie = "clé=valeur; expires=...; path=/"` disséminées dans le fichier (couleurs, affichages, sons, diapasons) ont été remplacées par des appels `setCookie('clé', valeur)`.
- La variable `expirationDate` (et ses calculs de date d'expiration devenus inutiles) a été supprimée.
- Le fonctionnement pour l'utilisateur est identique ; les préférences persistent maintenant sans limite de taille ni expiration involontaire.

---

## 🟡 P2 — Performance

### 9. ⚠️ Non appliqué — Boucle en `setInterval(25ms)` au lieu de `requestAnimationFrame`

**Où :** 3 boucles de rendu (`setUpdatePitchInterval`, affichage de l'aiguille/cents, animation du panneau harmonique), toutes cadencées par la même constante `refreshRateTunerSystem`.

**Pourquoi ce n'est pas corrigé :** ces 3 boucles sont interdépendantes avec des calculs de lissage (historique de fréquences, moyenne de cents) potentiellement sensibles à un intervalle régulier de 25 ms. Passer à `requestAnimationFrame` (cadence variable, ~16 ms, suspendu en onglet masqué) est la bonne pratique, mais je ne peux pas vérifier visuellement dans un navigateur que le rendu de l'aiguille reste fluide et correct après ce changement. **Recommandation : appliquer ce correctif avec un test manuel en conditions réelles (mobile + desktop) avant mise en production.**

### 10. ✅ Nettoyage des `console.log` actifs

**Correctif appliqué :** suppression des ~15 `console.log` actifs restants (recherche de son sélectionné, changements de couleur/affichage, réinitialisation). Les `console.log` déjà commentés (`//console.log`) ont été laissés tels quels — ce sont des commentaires inertes, pas un risque, et leur suppression systématique n'apportait pas de valeur suffisante pour justifier le risque d'édition sur ~35 lignes supplémentaires.

### 11. Non traité — micro sur geste utilisateur strict

**Constat :** le bouton start/stop porte **deux gestionnaires de clic indépendants** : un `onclick="buttonStartTuner()"` inline (bascule l'affichage visuel du panneau harmonique via la variable `isRunning`) et un `addEventListener` séparé (bascule la capture micro réelle via `scriptIsRunning`). Les deux variables démarrent à `true`, ce qui signifie qu'au premier clic, les **deux** systèmes s'arrêtent simultanément plutôt que l'un des deux ne démarre. Ce couplage de deux machines à états indépendantes sur le même bouton est fragile et pourrait expliquer certains comportements « aléatoires » au premier clic. Cependant, restructurer ce flux (unifier les deux gestionnaires, ou reporter la demande micro dans le clic) touche à la logique UX centrale de l'app et ne peut pas être validé sans test visuel en navigateur — je n'ai donc **pas** modifié cette partie pour éviter de casser le comportement existant.

**Recommandation :** à tester en priorité lors de la prochaine session avec accès navigateur — c'est le point le plus susceptible d'expliquer un bug d'affichage « parfois » au démarrage.

---

## 🔵 P3 — Structure & maintenabilité

| Point | État |
|---|---|
| Fichier monolithique dupliqué | **Clarifié, pas fusionné** — `HarmonicTuner_v2.0.html` est le `start_url` PWA, resynchronisé après chaque correctif plutôt que supprimé |
| Trois fichiers de cache (`.appcache`, `.manifest`, `.json`) | ✅ Réduit à un seul (`manifest_v2.0.json`) |
| Extraction CSS/JS en fichiers séparés | ✅ **Fait (Phase 1)** — voir section dédiée ci-dessous |
| Variables globales (282), `var` (43) | ✅ **Fait (Phase 2)** — tous les `var` → `const`/`let` ; globales converties en modules ES avec `import`/`export` explicites |
| Cache des références DOM (`getElementById` répétés) | ✅ **Fait (Phase 2, partiel ciblé)** — boucle chaude de l'accordeur + handlers répétitifs mis en cache |

---

## ✅ Phase 1 — Split du monolithe en plusieurs fichiers

**Objectif :** sortir tout le CSS et le JS de `index.html` dans des fichiers séparés, **sans changer une seule ligne de logique**, en préservant strictement l'ordre d'exécution d'origine (chaque bloc `<script>`/`<style>` remplacé par une balise `<script src=...>` / `<link rel="stylesheet">` **à la même position exacte** dans le document).

### Résultat

`index.html` : **6849 lignes → 304 lignes** (squelette HTML + balises de chargement uniquement).

```
css/
  styles.css              (2403 lignes — feuille de style principale)
  vibrato-panel.css       (108 lignes — styles du visualiseur vibrato, chargée à sa position d'origine dans le body)

js/
  data/
    notes-config.js       (1180 lignes — objets de données `tnotes` et `buttons`)
  mic-tuner.js             (module ES — pitch-detection micro, AudioContext)
  settings-storage.js      (147 lignes — préférences localStorage + modale de don)
  harmonic-tuner-notes.js  (690 lignes — jouer/arrêter les notes de la roue harmonique)
  vibrato-start.js         (203 lignes — démarrage de l'analyse vibrato)
  vibrato-canvas-init.js   (3 lignes)
  vibrato-analysis.js      (408 lignes — analyse vibrato + aiguilles)
  ui-settings-panel.js     (417 lignes — panneau réglages, couleurs, diapasons)
  ui-graduation-big.js     (11 lignes)
  ui-graduation-mini.js    (11 lignes)
  ui-graduation-circles.js (12 lignes)
  ui-note-layout.js        (401 lignes — positionnement visuel des notes)
  ui-memory-buttons.js     (207 lignes — boutons mémoire)
  ui-frequency-slider.js   (15 lignes)
  ui-mixer.js              (192 lignes — construction du panneau mixer)
```

### Garanties de sécurité respectées

- **Extraction mécanique** (script Python), pas de retranscription manuelle → aucun risque de faute de frappe sur les gros blocs (ex. les data URI base64 des boutons).
- **Ordre de chargement identique** à l'ordre d'origine des blocs dans le fichier — les dépendances entre blocs (variables globales comme `audioCtx`, `buttons`, `tnotes`, les fonctions `getCookieValue`/`setCookie`) restent satisfaites exactement comme avant.
- Seule exception : `js/settings-storage.js` et `js/data/notes-config.js` proviennent d'un même bloc `<script>` d'origine, **séparés au bon endroit** (juste avant la définition de `tnotes`, qui dépend des constantes définies dans `settings-storage.js`) et rechargés dans le même ordre.
- Le script du micro (`js/mic-tuner.js`) reste un module ES (`type="module"`) ; son `import` vers `pitchy.js` a été corrigé (`./pitchy/pitchy.js` → `../pitchy/pitchy.js`) pour tenir compte du nouveau dossier `js/`.
- **Vérifications effectuées :**
  - Les 14 fichiers JS non-module compilent sans erreur de syntaxe (`new Function(code)`).
  - Le module `mic-tuner.js` compile sans erreur une fois l'instruction `import` neutralisée pour le test.
  - Les accolades des 2 fichiers CSS sont équilibrées (418/418 et 19/19).
  - Le déséquilibre `<div>` observé (59 ouvrants / 61 fermants) est **préexistant** — vérifié identique dans la copie de sauvegarde avant split — donc sans rapport avec l'extraction.
- `HarmonicTuner_v2.0.html` (start_url PWA) resynchronisé avec le nouveau `index.html`.
- `service-worker.js` : version de cache bumpée (`v2.0.2`) et liste des fichiers mis à jour avec les 16 nouveaux fichiers CSS/JS.
- `manifest_v2.0.json` : liste `cache` mise à jour de la même façon, pour cohérence.

### Ce qui n'a pas été fait (Phase 2, optionnelle, plus tard)

- Le CSS reste **un seul gros fichier** plutôt que découpé par fonctionnalité (boutons, cadran, mixer, panneau réglages...). Raison : le fichier d'origine contient le même jeu de règles **dupliqué dans 3 blocs `@media (aspect-ratio...)`** différents (un jeu de règles par orientation d'écran). Réorganiser par fonctionnalité aurait nécessité de retrier des règles à l'intérieur de chacun de ces 3 blocs, avec un risque réel de modifier l'ordre de cascade CSS (donc l'apparence) sans pouvoir le vérifier visuellement ici. **Recommandation :** ne tenter ce découpage qu'avec un test visuel en navigateur en parallèle.
- Pas de conversion en modules ES avec `import`/`export` explicites — les fichiers JS restent des scripts classiques partageant les variables globales existantes, exactement comme avant l'extraction. C'est l'étape « Phase 2 » évoquée précédemment.
- Pas de réduction des ~282 variables globales.

### Prochaine étape recommandée

**Tester l'application dans un navigateur** (ouverture de `index.html`, vérification que micro, roue harmonique, vibrato, panneau réglages, mixer et boutons mémoire fonctionnent identiquement à avant). C'est la validation indispensable avant de passer à la Phase 2 ou de redéployer.

---

## ✅ Phase 2 — `var` → `const`/`let`, modularisation ES et cache DOM

**Date :** 2026-07-01
**Objectif :** traiter la dette technique des variables globales implicites sans changer le comportement. Décision prise avec l'utilisateur : **modularisation ES complète** (import/export explicites), pas seulement un nettoyage minimal.

### Contrainte de test
Aucun navigateur disponible pour un test visuel. Pour compenser, un **harnais Node** a été construit : il importe le graphe de modules ES réel avec un DOM stubé, exécute le code top-level, draine les timers (barre de chargement + bloc d'amorçage à 2000 ms), déclenche `load`/`DOMContentLoaded` et appelle les 5 handlers inline. L'**édition/linkage ES échoue immédiatement si un nom d'`import`/`export` ne correspond pas** — c'est la vérification la plus forte possible hors navigateur. Il valide : résolution des liaisons, mode strict, dépendance circulaire, exposition des handlers globaux. Il **ne valide pas** le rendu visuel ni l'audio réel.

### 2a — `var` → `const`/`let` (mécanique, sûr)
- **Tous les `var` actifs supprimés** (graduations, mixer, note-layout, vibrato-start, mic-tuner, harmonic-tuner-notes) → `const` par défaut, `let` si réassignation avérée. Seul un `//var` en commentaire subsiste (inerte).
- **2 globales implicites** (assignation sans déclaration, **fatales en mode strict/module**) débusquées par le harnais et déclarées :
  - `centsAllOctavesCents` (`ui-note-layout.js`)
  - `intervalId2` (`harmonic-tuner-notes.js`)
- Vérifié : les 15 fichiers compilent sans erreur ; le code concaténé tourne en mode strict sans ReferenceError.

### 2b — Modularisation ES (import/export explicites)
Patron retenu : **`export`/`import` nommés** pour tout ce qui est partagé en lecture (fonctions, `buttons`/`tnotes`, constantes, lectures de *live bindings*) + **fonctions setter** pour les rares réassignations inter-fichiers (les `import` ES sont en lecture seule).

- **Point d'entrée unique `js/main.js`** : importe les 15 modules dans l'ordre historique. Les vraies dépendances sont résolues par les `import`/`export` de chaque module ; `index.html` ne charge plus qu'`<script type="module" src="js/main.js">` (les 14 autres balises `<script src>` sont remplacées par des commentaires à leur position d'origine).
- **16 setters** ajoutés pour les états mutables réassignés depuis un autre module :
  - `settings-storage` : `setTemperedDiapason`, `setBaseFrequency{Harmonic,Tempered}Notes`, `set{Fifth,MajorThird,MinorThird,Seventh}Color`
  - `harmonic-tuner-notes` : `setHzValue`, `setStopped`, `setStoppedNote`, `setStoppedTnote`
  - `vibrato-analysis` : `set{VibratoAudioContext,Analyser,Microphone,ScriptProcessor,MediaStream}`
- **5 fonctions appelées en inline HTML** (`onclick`/`onsubmit`) ré-exposées sur `window` (les modules ne créent pas de globales) : `buttonStartTuner`, `stopAllNotes`, `stopAllTemperedNotes`, `resetColors`, `catchPaypalClick`.
- **Dépendance circulaire** `harmonic-tuner-notes` ↔ `vibrato-start` (via `audioCtx` / `Tuner`,`createCanva`) : sûre car les liaisons ne sont accédées qu'à l'exécution (jamais au top-level), validée par le harnais.
- `container`/`mixer`/`intro` (identifiants nus = accès aux éléments nommés via `window`) : **inchangés**, ils continuent de résoudre en module.
- Cartographie complète des dépendances inter-fichiers établie au préalable (voir la table du wiring : chaque module importe précisément les symboles qu'il consomme).

### 2c — Cache des références DOM (`getElementById`)
Ciblé sur les points à réel bénéfice, éléments statiques uniquement :
- `Tuner()` : `#hzValue` mis en cache **hors de la boucle à 25 ms** (évite ~40 lookups/s).
- `buttonStartTuner()` : `#start-stop-button` (4×) et `#cents` (3×) mis en cache.
- `ui-settings-panel` : `#container` et `#pointer-container` (6× chacun, sur 2 handlers) mis en cache au niveau module.
- Non touché : les lookups à **ID dynamiques** (`button`+i, `slider`+i, `note-definition-`+i) créés à l'exécution — hors périmètre sûr.

### Fichiers de support mis à jour
- `HarmonicTuner_v2.0.html` resynchronisé (identique à `index.html`).
- `service-worker.js` : version `v2.0.2` → **`v2.0.3`**, `js/main.js` ajouté au cache.
- `manifest_v2.0.json` : `js/main.js` ajouté à la liste `cache`.

### 🚨 Changement de mode de test : HTTP obligatoire (plus de `file://`)
Les modules ES sont **bloqués par le navigateur en `file://`** (politique CORS). Contrairement aux scripts classiques, **on ne peut plus tester en double-cliquant `index.html`** : il faut servir le dossier via un serveur local, p. ex. `python -m http.server` puis ouvrir `http://localhost:8000/`. **En production ce n'est pas un problème** : la PWA est servie en HTTP(S) (le service worker l'exige déjà). C'est le piège n°1 si l'app « ne se lance pas » après cette phase.

### ⚠️ Risque résiduel (à valider en navigateur)
Le refactor est **conçu pour préserver le comportement** (même logique, seul le câblage change) et le graphe de modules est validé par exécution stubée. Mais **le rendu visuel et l'audio réel n'ont pas pu être testés**. Un point d'attention spécifique : tout le code s'exécute désormais en **différé** (après parse, via le module), alors que les scripts classiques s'exécutaient pendant le parse — c'est en principe plus sûr (tout le DOM existe), mais à confirmer visuellement. **Recommandation : ouvrir l'app en navigateur (mobile + desktop) et vérifier micro, roue harmonique, vibrato, réglages, mixer, boutons mémoire.**

### Non traité (inchangé depuis Phase 1, toujours à faire avec navigateur)
- P2 — `setInterval` → `requestAnimationFrame` (3 boucles de rendu) : toujours **recommandé mais non appliqué**.
- P2 — double gestionnaire de clic start/stop (`isRunning` vs `scriptIsRunning`) : toujours **identifié, non corrigé**.

---

## Récapitulatif

| Priorité | Point | État |
|---|---|---|
| P0 | Fuite d'AudioContext | ✅ Corrigé |
| P0 | AppCache / Service Worker en conflit | ✅ Corrigé |
| P0 | `<meta viewport>` manquante | ✅ Corrigé |
| P1 | Media queries `vh` invalides | ✅ Corrigé |
| P1 | Police fantôme | ✅ Corrigé |
| P1 | Fonctions cookies dupliquées | ✅ Corrigé |
| P1 | Incohérence de type sur `A4` | ✅ Corrigé |
| P1 | Cookies → `localStorage` | ✅ Corrigé |
| P2 | `setInterval` → `requestAnimationFrame` | ⚠️ Non appliqué (nécessite test visuel) |
| P2 | `console.log` de debug | ✅ Corrigé (actifs retirés) |
| P2 | Double gestionnaire de clic start/stop | ⚠️ Identifié, non corrigé (nécessite test visuel) |
| P3 | Extraction CSS/JS en fichiers | ✅ Corrigé (Phase 1) |
| P3 | `var` → `const`/`let` + globales implicites | ✅ Corrigé (Phase 2) |
| P3 | Globales → modules ES (`import`/`export`) | ✅ Corrigé (Phase 2) |
| P3 | Cache des références DOM répétées | ✅ Corrigé (Phase 2, ciblé) |

**Prochaine étape recommandée :** tester l'application dans un navigateur (mobile + desktop) pour valider les correctifs appliqués, puis s'attaquer au point 11 (double gestionnaire start/stop) et au point 9 (`requestAnimationFrame`) avec retour visuel en direct.
