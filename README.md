<<<<<<< HEAD
# HarmonicTuner
=======
# Harmonic Tuner v2.0

## Description

Harmonic Tuner v2.0 is a web-based interactive musical tool designed for tuning instruments and exploring pitch relationships. It compares just intonation (harmonic series with perfect intervals like 3:2 fifths) against equal temperament (standard chromatic scale). The app uses your device's microphone for real-time pitch detection and generates audio tones for reference notes. It's a Progressive Web App (PWA), installable and usable offline via a service worker, supporting both desktop and mobile devices.

Key goals: Help musicians tune accurately, experiment with harmonic overtones, and visualize cents deviations from reference frequencies (default A4=442Hz).

v2.0 also adds a **vibrato analyzer** (separate microphone capture + real-time visualization) alongside the original tuner and note-playback features.

## Features

- **Pitch Detection**: Real-time analysis of microphone input using the `pitchy` library. Displays pitch in Hz and cents (±50 cents) on a visual needle gauge.
- **Note Playback**:
  - **Harmonic Notes**: 78 inner buttons on a circular dial, representing notes derived from just intonation (e.g., perfect fifths in rose, major thirds in blue, minor thirds in yellow, sevenths in dark blue).
  - **Tempered Notes**: 12 outer buttons for equal-tempered chromatic scale (C to B).
  - Controls: Click to play/stop tones (sawtooth waves), adjust octave (± via up/down arrows), fifths (left/right arrows), and per-note volume in the mixer.
- **Visual Interface**:
  - Circular tuner dial that rotates based on detected pitch.
  - Canvas visualizer showing recent cents history as a line graph.
  - Color-coded buttons for harmonic intervals.
  - Draggable dial when tuner is off for manual exploration.
- **Mixer Panel**: Bottom panel with volume sliders for each note (appears when playing). Supports up to 4 memory slots to save and replay note combinations.
- **Settings**: Side panel to adjust diapason (435-445 Hz for A4), toggle "stop other notes" on play, and mask visualizer.
- **Keyboard Shortcuts**:
  - Spacebar: Pause/resume last note.
  - Arrow keys: Adjust octave (up/down) or fifth (left/right).
- **Vibrato Analyzer**: Independent microphone capture and canvas visualization of vibrato/pitch variation over time, toggled separately from the main tuner.
- **Responsive Design**: Optimized for mobile (portrait/landscape) and desktop, with touch/drag support.
- **Offline Capability**: Installable PWA; a service worker (`service-worker.js`) caches all assets for offline use.

The app starts with a loading screen and requires microphone access for tuning.

## Installation

1. **Download/Clone**: Clone or download this repository.
2. **Run Locally**:
   - The app is built with ES modules (`js/main.js`), which browsers block when opened directly via `file://`. **You must serve the folder over HTTP**, e.g.:
     ```bash
     python -m http.server 8321
     ```
     then open `http://localhost:8321/`.
   - Note: Audio features require user permission for microphone, and installed/standalone PWA launches require HTTPS (or localhost) for the service worker.
3. **Dependencies**: None external besides browser APIs (Web Audio API). The `pitchy` library is embedded in `pitchy/`.
4. **Build**: No build step needed. The code is split into `css/*.css` and `js/*.js` files (see Architecture below); edit constants (e.g., diapason) in `js/settings-storage.js`.

## Quick Start

1. Serve the folder over HTTP (see Installation above) and open it in your browser.
2. Grant microphone access when prompted.
3. Click the central start/stop button to activate the tuner.
4. Play a note on your instrument into the mic; the needle will indicate if it's in tune (0 cents = perfect).
5. Click inner/outer buttons to play reference tones and compare.

For detailed usage, see [Mode d'emploi](mode-d-emploi.md) (user manual in French).

## Architecture

- **Single entry point**: `index.html` is served for normal web visits and is also declared as `start_url` in `manifest_v2.0.json` for the installed PWA.
- **Code layout**: the original single-file app has been split into `css/styles.css`, `css/vibrato-panel.css`, and ~15 ES modules under `js/` (data, tuner logic, UI panels, vibrato analysis), all wired together from `js/main.js`. See `CLAUDE.md` for the full module-by-module breakdown.
- **Offline caching**: `service-worker.js` caches every asset listed above; its `cacheName` must be bumped whenever a cached file is added, removed, or changed, or installed clients won't pick up the update.

## Usage Overview

- **Tuner Mode**: Detects pitch and shows deviation in cents from the reference note. The dial rotates to match the pitch angle.
- **Tone Generation**: Click notes to hear pure tones. Use mixer sliders to blend multiples (e.g., for chords).
- **Memory**: Record up to 4 note sets by playing while clicking A/B/C/D buttons; replay anytime.
- **Customization**: In settings (gear icon), adjust A4 frequency for different tunings (e.g., 440Hz standard).

## Technical Notes

- **Pitch Detection**: Based on autocorrelation via `pitchy.js`. Assumes 44.1kHz sample rate; may prompt warnings otherwise.
- **Sound Synthesis**: Web Audio API generates sawtooth waves for notes. Supports fading in/out.
- **Constants** (in `js/settings-storage.js`):
  - `A4` / `temperedDiapason = A4/2`: Reference for tempered scale (A4 defaults to 442Hz, adjustable in Settings and persisted in `localStorage`).
  - `baseFrequencyHarmonicNotes = 295/2`: Harmonic reference.
  - `refreshRateTunerSystem = 25`: Update interval for tuner (ms).
- **Preferences storage**: user settings (diapason, interval colors, selected waveform, checkboxes) persist via `localStorage` (not cookies).
- **Browser Compatibility**: Works on modern browsers supporting Web Audio API. iOS Safari may need user gesture to start audio.
- **Limitations**:
  - Microphone accuracy depends on device mic quality and environment (quiet room recommended).
  - No saving presets beyond memory slots.
  - Mobile: Ensure landscape for best view; touch drag for manual rotation.

## Contributing

- Fork the repo, make changes (e.g., add features like more temperaments).
- Test on multiple devices/browsers.
- Pull requests welcome for bug fixes or enhancements (e.g., add equal temperament visuals).

## License

MIT License - Free to use, modify, and distribute. Credit appreciated.

---

*Last updated: July 2026*
>>>>>>> 4d76b80 (Initial commit — Harmonic Tuner v2.0)
