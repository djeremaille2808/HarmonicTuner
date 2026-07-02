		import {PitchDetector} from "../pitchy/pitchy.js";
import { setHzValue } from './harmonic-tuner-notes.js';
import { refreshRateTunerSystem } from './settings-storage.js';
import { stopAnalysis, tickVibratoAnalysis } from './vibrato-analysis.js';






			
				
			
			
			
		//module accordeur Pitchy.js
			 
			
			let minClarityPercent = 92;
			let [minPitch, maxPitch] = [60, 10000];
			let [overrideSampleRate, desiredSampleRate, sampleRate] = [
				false,
				44100,
				null,
			];
			let inputBufferSize = 2048;



			let micStream, analyserNode, detector, inputBuffer, micAudioContext;
			let intervalHandle;
			const historyFreq = [];
			let historyLength = 5;
			let intervalId;
			 function updateFrequencyValue() {
					const matchesConditions = ([pitch, clarity]) =>
					pitch >= minPitch &&
					pitch <= maxPitch &&
					100 * clarity >= minClarityPercent;
				const filteredHistory = historyFreq.filter(matchesConditions);
				if (filteredHistory.length == 0) {
				  return;
				}
				let [lastPitch, lastClarityPercent] =
				filteredHistory[filteredHistory.length - 1];
				lastClarityPercent = Math.round(lastClarityPercent * 1000) / 10;
				
				setHzValue(lastPitch);
			}
			
			function updatePitch() {
				if (!analyserNode || !detector || !sampleRate || !inputBuffer) return;

				analyserNode.getFloatTimeDomainData(inputBuffer);
				historyFreq.push(detector.findPitch(inputBuffer, sampleRate));
				if (historyFreq.length > historyLength) {
					historyFreq.shift();
				}
			}
			
			
			function setUpdatePitchInterval() {
				intervalHandle = setInterval(() => {
					updatePitch();
					updateFrequencyValue();
					// Cadencé ici plutôt que par un second graphe audio dédié : le vibrato
					// n'a besoin que du pitch déjà détecté ci-dessus, pas d'échantillons bruts.
					tickVibratoAnalysis();
				}, refreshRateTunerSystem);
			}
			function stopTunerScript() {
			  clearInterval(intervalHandle);
			  if (micStream) micStream.getTracks().forEach(track => track.stop());
			  if (micAudioContext) {
			    micAudioContext.close();
			    micAudioContext = null;
			  }
			}

			function startTunerScript () {
					if (!navigator.mediaDevices?.getUserMedia) {
						console.warn("Microphone non disponible : contexte non sécurisé ou API non supportée.");
						return;
					}
					navigator.mediaDevices.getUserMedia({
					  audio: true
					}).then((stream) => {
					  micStream = stream;
					  resetAudioContext();
					  setUpdatePitchInterval();
					});
			}

			function resetAudioContext() {
				sampleRate = analyserNode = inputBuffer = null;
				if (micAudioContext) {
					micAudioContext.close();
				}

				micAudioContext = new AudioContext();
				sampleRate = micAudioContext.sampleRate;

				analyserNode = new AnalyserNode(micAudioContext, {
					fftSize: inputBufferSize,
				});
				micAudioContext.createMediaStreamSource(micStream).connect(analyserNode);
				detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
				inputBuffer = new Float32Array(detector.inputLength);
			}
			
			
		
			
			
			window.addEventListener("DOMContentLoaded", (event) => {
				startTunerScript ();
			});
			let scriptIsRunning = true;
			document.getElementById("start-stop-button").addEventListener("click", () => {
				if (scriptIsRunning == true) {
					stopTunerScript();
					stopAnalysis();
					scriptIsRunning = !scriptIsRunning;
				}
				// Sinon, le démarre
				else {
					startTunerScript();
					scriptIsRunning = !scriptIsRunning;
				}

			});
				
				
				
		
