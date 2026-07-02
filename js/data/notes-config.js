import { baseFrequencyHarmonicNotes, baseFrequencyTemperedNotes, fifthColor, majorThirdColor, minorThirdColor, seventhColor } from '../settings-storage.js';
		//Définition des valeurs des notes tempérées
		export let tnotes = {
			1: {
				frequency: baseFrequencyTemperedNotes / 2 * Math.pow(2, (3 / 12)), // Fréquence en Hz
				cents: 0,
				centsoffset: 0,
				centsoffsetSlider: 0,
				isPlaying: false,
				tname: 'Do',
				angle: 106,
				color: 'rgba(150, 150, 150, .8)', // BLANC
				sliderId: 79,
				allOctavesCents: 0,
			},
			2: {
				frequency: baseFrequencyTemperedNotes / 2 * Math.pow(2, (4 / 12)), // Fréquence en Hz
				cents: 0,
				centsoffset: 0,
				centsoffsetSlider: 0,
				isPlaying: false,
				tname: 'Do#/Réb',
				angle: 136,
				color: 'rgba(213, 213, 213, .8)', // noir
				sliderId: 80,
			},
			3: {
				frequency: baseFrequencyTemperedNotes / 2 * Math.pow(2, (5 / 12)), // Fréquence en Hz
				cents: 0,
				centsoffset: 0,
				centsoffsetSlider: 0,
				isPlaying: false,
				tname: 'Ré',
				angle: 166,
				color: 'rgba(150, 150, 150, .8)', // BLANC
				sliderId: 81,
			},
			4: {
				frequency: baseFrequencyTemperedNotes / 2 * Math.pow(2, (6 / 12)), // Fréquence en Hz
				cents: 0,
				centsoffset: 0,
				centsoffsetSlider: 0,
				isPlaying: false,
				tname: 'Mib/Ré#',
				angle: 196,
				color: 'rgba(213, 213, 213, .8)', // noir
				sliderId: 82,
			},
			5: {
				frequency: baseFrequencyTemperedNotes / 2 * Math.pow(2, (7 / 12)), // Fréquence en Hz
				cents: 0,
				centsoffset: 0,
				centsoffsetSlider: 0,
				isPlaying: false,
				tname: 'Mi',
				angle: 226,
				color: 'rgba(150, 150, 150, .8)', // BLANC
				sliderId: 83,
			},
			6: {
				frequency: baseFrequencyTemperedNotes / 2 * Math.pow(2, (8 / 12)), // Fréquence en Hz
				cents: 0,
				centsoffset: 0,
				centsoffsetSlider: 0,
				isPlaying: false,
				tname: 'Fa',
				angle: 256,
				color: 'rgba(150, 150, 150, .8)', // BLANC
				sliderId: 84,
			},
			7: {
				frequency: baseFrequencyTemperedNotes / 2 * Math.pow(2, (9 / 12)), // Fréquence en Hz
				cents: 0,
				centsoffset: 0,
				centsoffsetSlider: 0,
				isPlaying: false,
				tname: 'Fa#/Solb',
				angle: 286,
				color: 'rgba(213, 213, 213, .8)', // noir
				sliderId: 85,
			},
			8: {
				frequency: baseFrequencyTemperedNotes / 2 * Math.pow(2, (10 / 12)), // Fréquence en Hz
				cents: 0,
				centsoffset: 0,
				centsoffsetSlider: 0,
				isPlaying: false,
				tname: 'Sol',
				angle: 316,
				color: 'rgba(150, 150, 150, .8)', // BLANC
				sliderId: 86,
			},
			9: {
				frequency: baseFrequencyTemperedNotes / 2 * Math.pow(2, (11 / 12)), // Fréquence en Hz
				cents: 0,
				centsoffset: 0,
				centsoffsetSlider: 0,
				isPlaying: false,
				tname: 'Sol#/Lab',
				angle: 346,
				color: 'rgba(213, 213, 213, .8)', // noir
				sliderId: 87,
			},
			10: {
				frequency: baseFrequencyTemperedNotes, // Fréquence en Hz
				cents: 0,
				centsoffset: 0,
				centsoffsetSlider: 0,
				isPlaying: false,
				tname: 'La',
				angle: 16,
				color: 'rgba(150, 150, 150, .8)', // BLANC
				sliderId: 88,
			},
			11: {
				frequency: baseFrequencyTemperedNotes * Math.pow(2, (1 / 12)), // Fréquence en Hz
				cents: 0,
				centsoffset: 0,
				centsoffsetSlider: 0,
				isPlaying: false,
				tname: 'Sib/La#',
				angle: 46,
				color: 'rgba(213, 213, 213, .8)', // noir
				sliderId: 89,
			},
			12: {
				frequency: baseFrequencyTemperedNotes * Math.pow(2, (2 / 12)), // Fréquence en Hz
				cents: 0,
				centsoffset: 0,
				centsoffsetSlider: 0,
				isPlaying: false,
				tname: 'Si',
				angle: 76,
				color: 'rgba(213, 213, 213, .8)', // BLANC
				sliderId: 90,
			},
		};
		//définition des notes harmoniques
		export let buttons = {
			//Do
			1: {
				frequency: 255.333, //A MODIFIER 258.13
				baseFrequency: baseFrequencyTemperedNotes / 2 * Math.pow(2, (3 / 12)),
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Do7 / Ré',
				color: seventhColor, // BLEU FONCE
				type: 'seventh',
				allOctavesCents: 0,
			},
			2: {
				frequency: 258.98,
				baseFrequency: baseFrequencyTemperedNotes / 2 * Math.pow(2, (3 / 12)),
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Do / Lab',
				color: seventhColor, // BLEU FONCE
				type: 'seventh',
			},
			3: {
				frequency: 259.275,
				baseFrequency: baseFrequencyTemperedNotes / 2 * Math.pow(2, (3 / 12)),
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Si# / Sol#/Mi',
				color: majorThirdColor,
				type: 'majorThird',
			},
			4: {
				frequency: 262.22,
				baseFrequency: baseFrequencyTemperedNotes / 2 * Math.pow(2, (3 / 12)),
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Do',
				color: fifthColor,
				type: 'fifth',
			},
			5: {
				frequency: 262.52,
				baseFrequency: baseFrequencyTemperedNotes / 2 * Math.pow(2, (3 / 12)),
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Si# / Sol#',
				color: majorThirdColor, // BLEU CLAIR
				type: 'majorThird',
			},
			6: {
				frequency: 265.50,
				baseFrequency: baseFrequencyTemperedNotes / 2 * Math.pow(2, (3 / 12)),
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Do / La',
				color: minorThirdColor, // JAUNE CLAIR
				type: 'minorThird',
			},
			7: {
				frequency: 265.80,
				baseFrequency: baseFrequencyTemperedNotes / 2 * Math.pow(2, (3 / 12)),
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Si#',
				color: fifthColor, // ROSE
				type: 'fifth',
			},
			//Reb
			8: {
				frequency: 271.93,
				baseFrequency: baseFrequencyTemperedNotes / 2 * Math.pow(2, (4 / 12)),
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Réb7 / Mib',
				angle: 121.5,
				color: seventhColor, // BLEU FONCE
				type: 'seventh',
			},
			9: {
				frequency: 275.33,
				baseFrequency: baseFrequencyTemperedNotes / 2 * Math.pow(2, (4 / 12)),
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Réb7 / Mib/Do',
				angle: 125,
				color: seventhColor, // BLEU FONCE changer couleur dans matrice
				type: 'seventh',
			},
			10: {
				frequency: 276.25,
				baseFrequency: baseFrequencyTemperedNotes / 2 * Math.pow(2, (4 / 12)),
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Réb',
				angle: 129,
				color: fifthColor, // ROSE
				type: 'fifth',
			},
			11: {
				frequency: 276.56,
				baseFrequency: baseFrequencyTemperedNotes / 2 * Math.pow(2, (4 / 12)),
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Do# / La',
				angle: 133,
				color: majorThirdColor, // BLEU CLAIR
				type: 'majorThird',
			},
			12: {
				frequency: 279.70,
				baseFrequency: tnotes[2].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Réb / Sib',
				angle: 137,
				color: minorThirdColor, // JAUNE CLAIR
				type: 'minorThird',
			},
			13: {
				frequency: 280.02,
				baseFrequency: tnotes[2].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Do#',
				angle: 140.5,
				color: fifthColor, // ROSE
				type: 'fifth',
			},
			14: {
				frequency: 283.20,
				baseFrequency: tnotes[2].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Réb / Sib/Sol',
				angle: 144,
				color: minorThirdColor, // JAUNE CLAIR
				type: 'minorThird',
			},
			//Ré
			15: {
				frequency: 290.39,
				baseFrequency: tnotes[3].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Ré7 / Mi',
				angle: 153,
				color: seventhColor, // BLEU FONCE
				type: 'seventh',
			},
			16: {
				frequency: 291.36,
				baseFrequency: tnotes[3].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Ré / Sib',
				angle: 159,
				color: majorThirdColor, // BLEU CLAIR
				type: 'majorThird',
			},
			17: {
				frequency: baseFrequencyHarmonicNotes,
				baseFrequency: tnotes[3].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Ré',
				angle: 166,
				color: fifthColor, // ROSE
				type: 'fifth',
			},
			18: {
				frequency: 298.69,
				baseFrequency: tnotes[3].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Ré / Si',
				angle: 173,
				color: minorThirdColor, // JAUNE CLAIR
				type: 'minorThird',
			},
			//Mib
			19: {
				frequency: 303.642, //305.93
				baseFrequency: tnotes[4].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Mib7 / Fa',
				angle: 180, //181.5
				color: seventhColor, // BLEU FONCE
				type: 'seventh',
			},
			20: {
				frequency: 307.29,
				baseFrequency: tnotes[4].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Ré# / Si/Sol',
				angle: 186,
				color: majorThirdColor, // BLEU CLAIR changer couleur
				type: 'majorThird',
			},
			21: {
				frequency: 309.75,
				baseFrequency: tnotes[4].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Mib7 / Fa/Ré',
				angle: 190,
				color: seventhColor, // BLEU FONCE
				type: 'seventh',
			},
			22: {
				frequency: 310.78,
				baseFrequency: tnotes[4].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Mib',
				angle: 194.5,
				color: fifthColor, // ROSE
				type: 'fifth',
			},
			23: {
				frequency: 311.13,
				baseFrequency: tnotes[4].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Ré# / Si',
				angle: 198.5,
				color: majorThirdColor, // BLEU CLAIR
				type: 'majorThird',
			},
			24: {
				frequency: 314.67,
				baseFrequency: tnotes[4].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Mib / Do',
				angle: 202,
				color: minorThirdColor, // JAUNE CLAIR
				type: 'minorThird',
			},
			25: {
				frequency: 315.02,
				baseFrequency: tnotes[4].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Ré#',
				angle: 206,
				color: fifthColor, // ROSE
				type: 'fifth',
			},
			//Mi
			26: {
				frequency: 322.66,
				baseFrequency: tnotes[5].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Mi7 / Fa#/Ré',
				angle: 211,
				color: seventhColor, // BLEU FONCE
				type: 'seventh',
			},
			27: {
				frequency: 326.32,
				baseFrequency: tnotes[5].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Fab7 / Solb/Mib',
				angle: 216,
				color: seventhColor, // BLEU FONCE
				type: 'seventh',
			},
			28: {
				frequency: 326.69,
				baseFrequency: tnotes[5].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Mi7 / Fa#',
				angle: 219.5,
				color: seventhColor, // BLEU FONCE
				type: 'seventh',
			},
			29: {
				frequency: 327.41,
				baseFrequency: tnotes[5].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Fab',
				angle: 224,
				color: fifthColor, // ROSE
				type: 'fifth',
			},
			30: {
				frequency: 327.78,
				baseFrequency: tnotes[5].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Mi / Do',
				angle: 229,
				color: majorThirdColor, // BLEU CLAIR
				type: 'majorThird',
			},
			31: {
				frequency: 331.50,
				baseFrequency: tnotes[5].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Fab / Réb ',
				angle: 231,
				color: minorThirdColor, // JAUNE CLAIR
				type: 'minorThird',
			},
			32: {
				frequency: 331.87,
				baseFrequency: tnotes[5].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Mi',
				angle: 235,
				color: fifthColor, // ROSE
				type: 'fifth',
			},
			33: {
				frequency: 335.64,
				baseFrequency: tnotes[5].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Fab / Réb/Sib',
				angle: 238,
				color: minorThirdColor, // JAUNE CLAIR
				type: 'minorThird',
			},
			//Fa
			34: {
				frequency: 344.17,
				baseFrequency: tnotes[6].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Fa7 / Sol',
				angle: 243,
				color: seventhColor, // BLEU FONCE
				type: 'seventh',
			},
			35: {
				frequency: 345.7,
				baseFrequency: tnotes[6].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Mi# / Do#/La',
				angle: 248.5,
				color: majorThirdColor, // BLEU CLAIR changer couleur matrice
				type: 'majorThird',
			},
			36: {
				frequency: 349.63,
				baseFrequency: tnotes[6].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Fa',
				angle: 253,
				color: fifthColor, // ROSE
				type: 'fifth',
			},
			37: {
				frequency: 350.02,
				baseFrequency: tnotes[6].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Mi# / Do#',
				angle: 258,
				color: majorThirdColor, // BLEU CLAIR
				type: 'majorThird',
			},
			38: {
				frequency: 354.00,
				baseFrequency: tnotes[6].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Fa / Ré',
				angle: 263,
				color: minorThirdColor, // JAUNE CLAIR
				type: 'minorThird',
			},
			39: {
				frequency: 354.40,
				baseFrequency: tnotes[6].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Mi#',
				angle: 267,
				color: fifthColor, // ROSE
				type: 'fifth',
			},
			//Fa#
			40: {
				frequency: 361.095, //A MODIFIER 362.99
				baseFrequency: tnotes[7].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Fa#7 / Sol#/Mi',
				angle: 270, //273
				color: seventhColor, // BLEU FONCE
				type: 'seventh',
			},
			41: {
				frequency: 367.11,
				baseFrequency: tnotes[7].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Solb7 / Lab/Fa',
				angle: 277,
				color: seventhColor, // BLEU FONCE
				type: 'seventh',
			},
			42: {
				frequency: 367.53,
				baseFrequency: tnotes[7].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Fa#7 / Sol#',
				angle: 281,
				color: seventhColor, // BLEU FONCE
				type: 'seventh',
			},
			43: {
				frequency: 368.33,
				baseFrequency: tnotes[7].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Solb',
				angle: 285,
				color: fifthColor, // ROSE
				type: 'fifth',
			},
			44: {
				frequency: 368.75,
				baseFrequency: tnotes[7].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Fa# / Ré',
				angle: 289,
				color: majorThirdColor, // BLEU CLAIR
				type: 'majorThird',
			},
			45: {
				frequency: 372.94,
				baseFrequency: tnotes[7].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Solb / Do',
				angle: 292,
				color: minorThirdColor, // JAUNE CLAIR
				type: 'minorThird',
			},
			46: {
				frequency: 373.36,
				baseFrequency: tnotes[7].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Fa#',
				angle: 295.5,
				color: fifthColor, // ROSE
				type: 'fifth',
			},
			47: {
				frequency: 377.60,
				baseFrequency: tnotes[7].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Solb / Mib/Do',
				angle: 299,
				color: minorThirdColor, // JAUNE CLAIR
				type: 'minorThird',
			},
			//Sol
			48: {
				frequency: 387.19,
				baseFrequency: tnotes[8].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Sol7 / La',
				angle: 326.5,
				color: seventhColor, // BLEU FONCE
				type: 'seventh',
			},
			49: {
				frequency: 388.48,
				baseFrequency: tnotes[8].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Sol / Mib',
				angle: 320,
				color: majorThirdColor, // BLEU CLAIR
				type: 'majorThird',
			},
			50: {
				frequency: 393.33,
				baseFrequency: tnotes[8].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Sol',
				angle: 313,
				color: fifthColor, // ROSE
				type: 'fifth',
			},
			51: {
				frequency: 398.25,
				baseFrequency: tnotes[8].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Sol / Mi',
				angle: 306.5,
				color: minorThirdColor, // JAUNE CLAIR
				type: 'minorThird',
			},
			//Lab
			52: {
				frequency: 407.90,
				baseFrequency: tnotes[9].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Lab7 / Sib',
				angle: 335,
				color: seventhColor, // BLEU FONCE
				type: 'seventh',
			},
			53: {
				frequency: 409.72,
				baseFrequency: tnotes[9].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Sol# / Mi/Do',
				angle: 339.5,
				color: majorThirdColor, // BLEU CLAIR changer couleur
				type: 'majorThird',
			},
			54: {
				frequency: 413.00,
				baseFrequency: tnotes[9].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Lab7 / Sib/Sol',
				angle: 344,
				color: seventhColor, // BLEU FONCE
				type: 'seventh',
			},
			55: {
				frequency: 414.38,
				baseFrequency: tnotes[9].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Lab',
				angle: 348.5,
				color: fifthColor, // ROSE
				type: 'fifth',
			},
			56: {
				frequency: 414.84,
				baseFrequency: tnotes[9].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Sol# / Mi',
				angle: 352.5,
				color: majorThirdColor, // BLEU CLAIR
				type: 'majorThird',
			},
			57: {
				frequency: 419.56,
				baseFrequency: tnotes[9].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Lab / Fa',
				angle: 356.5,
				color: minorThirdColor, // JAUNE CLAIR
				type: 'minorThird',
			},
			58: {
				frequency: 420.03,
				baseFrequency: tnotes[9].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Sol#',
				angle: 359.5,
				color: fifthColor, // ROSE
				type: 'fifth',
			},
			//La
			59: {
				frequency: 429.415, //A MODIFIER 430.21
				baseFrequency: tnotes[10].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'La7 / Si/Sol',
				angle: 5,
				color: seventhColor, // BLEU FONCE
				type: 'seventh',
			},
			60: {
				frequency: 435.59,
				baseFrequency: tnotes[10].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'La7 / Si',
				angle: 11,
				color: seventhColor, // BLEU FONCE
				type: 'seventh',
			},
			61: {
				frequency: 437.04,
				baseFrequency: tnotes[10].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'La / Do',
				angle: 16,
				color: majorThirdColor, // BLEU CLAIR
				type: 'majorThird',
			},
			62: {
				frequency: 442.50,
				baseFrequency: tnotes[10].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'La',
				angle: 21.5,
				color: fifthColor, // ROSE
				type: 'fifth',
			},
			63: {
				frequency: 448.03,
				baseFrequency: tnotes[10].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'La / Fa#',
				angle: 27,
				color: minorThirdColor, // JAUNE CLAIR
				type: 'minorThird',
			},
			//Sib
			64: {
				frequency: 458.89,
				baseFrequency: tnotes[11].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Sib7 / Do', //Si sur la matrice au lieu de Sib
				angle: 33,
				color: seventhColor, // BLEU FONCE
				type: 'seventh',
			},
			65: {
				frequency: 460.94,
				baseFrequency: tnotes[11].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'La# / Fa#/Ré',
				angle: 38.5,
				color: majorThirdColor, // BLEU CLAIR changer couleur
				type: 'majorThird',
			},
			66: {
				frequency: 464.62,
				baseFrequency: tnotes[11].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Sib7 / Do/La',
				angle: 43,
				color: seventhColor, // BLEU FONCE Changer couleur matrice
				type: 'seventh',
			},
			67: {
				frequency: 466.17,
				baseFrequency: tnotes[11].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Sib',
				angle: 47,
				color: fifthColor, // ROSE
				type: 'fifth',
			},
			68: {
				frequency: 466.70,
				baseFrequency: tnotes[11].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'La# / Fa#',
				angle: 51,
				color: majorThirdColor, // BLEU CLAIR
				type: 'majorThird',
			},
			69: {
				frequency: 472,
				baseFrequency: tnotes[11].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Sib / Sol',
				angle: 55,
				color: minorThirdColor, // JAUNE CLAIR
				type: 'minorThird',
			},
			70: {
				frequency: 472.53,
				baseFrequency: tnotes[11].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'La#',
				angle: 58.5,
				color: fifthColor, // ROSE
				type: 'fifth',
			},
			//Si
			71: {
				frequency: 483.98,
				baseFrequency: tnotes[12].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Si7 / Do#/La',
				angle: 63,
				color: seventhColor, // BLEU FONCE
				type: 'seventh',
			},
			72: {
				frequency: 489.48,
				baseFrequency: tnotes[12].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Dob7 / Réb/Sib',
				angle: 66,
				color: seventhColor, // BLEU FONCE
				type: 'seventh',
			},
			73: {
				frequency: 490.03,
				baseFrequency: tnotes[12].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Si7 / Do#',
				angle: 70,
				color: seventhColor, // BLEU FONCE
				type: 'seventh',
			},
			74: {
				frequency: 491.11,
				baseFrequency: tnotes[12].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Dob',
				angle: 74,
				color: fifthColor, // ROSE
				type: 'fifth',
			},
			75: {
				frequency: 491.67,
				baseFrequency: tnotes[12].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Si / Sol',
				angle: 76.5,
				color: majorThirdColor, // BLEU CLAIR
				type: 'majorThird',
			},
			76: {
				frequency: 497.25,
				baseFrequency: tnotes[12].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Dob / Lab',
				angle: 80.5,
				color: minorThirdColor, // JAUNE CLAIR
				type: 'minorThird',
			},
			77: {
				frequency: 497.81,
				baseFrequency: tnotes[12].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Si',
				angle: 84,
				color: fifthColor, // ROSE
				type: 'fifth',
			},
			78: {
				frequency: 503.47,
				baseFrequency: tnotes[12].frequency,
				cents: 0,
				centsoffset: 0,
				isPlaying: false,
				name: 'Dob / Lab/Fa',
				angle: 87.5,
				color: minorThirdColor, // JAUNE CLAIR
				type: 'minorThird',
			},
		};
		//Met à jour la fréquence de chaque note par rapport au tempérament demandé
		export function refreshFrequenciesValues() {
			//mise à jour des fréquences avec calcul des quintes justes 20
			buttons[17].frequency = baseFrequencyHarmonicNotes;
			buttons[62].frequency = baseFrequencyHarmonicNotes * 3 / 2; //la /ré
			buttons[32].frequency = buttons[62].frequency * 3 / 2 / 2; //mi
			buttons[77].frequency = buttons[32].frequency * 3 / 2; //si
			buttons[46].frequency = buttons[77].frequency * 3 / 2 / 2; //fa#
			buttons[13].frequency = buttons[46].frequency * 3 / 2 / 2; //do#
			buttons[58].frequency = buttons[13].frequency * 3 / 2; //sol#
			buttons[25].frequency = buttons[58].frequency * 3 / 2 / 2; //ré#
			buttons[70].frequency = buttons[25].frequency * 3 / 2; //la#
			buttons[39].frequency = buttons[70].frequency * 3 / 2 / 2; //mi#
			buttons[7].frequency = buttons[39].frequency * 3 / 2 / 2; //si#
			buttons[50].frequency = baseFrequencyHarmonicNotes * 4 / 3; //sol
			buttons[4].frequency = buttons[50].frequency * 4 / 3 / 2; //do
			buttons[36].frequency = buttons[4].frequency * 4 / 3; //fa
			buttons[67].frequency = buttons[36].frequency * 4 / 3; //sib
			buttons[22].frequency = buttons[67].frequency * 4 / 3 / 2; //mib
			buttons[55].frequency = buttons[22].frequency * 4 / 3; //lab
			buttons[10].frequency = buttons[55].frequency * 4 / 3 / 2; //réb
			buttons[43].frequency = buttons[10].frequency * 4 / 3; //solb
			buttons[74].frequency = buttons[43].frequency * 4 / 3; //dob
			buttons[29].frequency = buttons[74].frequency * 4 / 3 / 2; //fab			
			//mise à jour des tierces majeures pour chaque fondamentale 18
			buttons[44].frequency = baseFrequencyHarmonicNotes * 5 / 4; //fa# / ré
			buttons[11].frequency = buttons[62].frequency * 5 / 4 / 2; //do# / la
			buttons[56].frequency = buttons[32].frequency * 5 / 4; //sol# / mi
			buttons[23].frequency = buttons[77].frequency * 5 / 4 / 2; //ré# / si
			buttons[68].frequency = buttons[46].frequency * 5 / 4; //la# / fa#
			buttons[37].frequency = buttons[13].frequency * 5 / 4; //mi# / do#
			buttons[5].frequency = buttons[58].frequency * 5 / 4 / 2; //si# / sol#
			buttons[75].frequency = buttons[50].frequency * 5 / 4; //si / sol
			buttons[30].frequency = buttons[4].frequency * 5 / 4; //mi / do
			buttons[61].frequency = buttons[36].frequency * 5 / 4; //la / fa
			buttons[16].frequency = buttons[67].frequency * 5 / 4 / 2; //ré / Sib
			buttons[49].frequency = buttons[22].frequency * 5 / 4; //sol / Mib
			buttons[2].frequency = buttons[55].frequency * 5 / 4 / 2; //Do / lab
			buttons[35].frequency = buttons[11].frequency * 5 / 4; //mi# / Do# / la
			buttons[3].frequency = buttons[56].frequency * 5 / 4 / 2; //Si# / Sol#/mi
			buttons[20].frequency = buttons[75].frequency * 5 / 4 / 2; //Ré# / Si/sol
			buttons[53].frequency = buttons[30].frequency * 5 / 4; //sol# / mi/do
			buttons[65].frequency = buttons[44].frequency * 5 / 4; //la# / fa#/ré
			//mise à jour des tierces mineures pour chaque fondamentale 15
			buttons[38].frequency = baseFrequencyHarmonicNotes * 6 / 5; //fa / ré
			buttons[6].frequency = buttons[62].frequency * 6 / 5 / 2; //do / la
			buttons[51].frequency = buttons[32].frequency * 6 / 5; //sol / mi
			buttons[18].frequency = buttons[77].frequency * 6 / 5 / 2; //ré / si
			buttons[63].frequency = buttons[46].frequency * 6 / 5; //la / fa#
			buttons[69].frequency = buttons[50].frequency * 6 / 5; //sib / sol
			buttons[24].frequency = buttons[4].frequency * 6 / 5; //mib / do
			buttons[57].frequency = buttons[36].frequency * 6 / 5; //lab / fa
			buttons[12].frequency = buttons[67].frequency * 6 / 5 / 2; //réb / sib
			buttons[45].frequency = buttons[22].frequency * 6 / 5; //solb / mib
			buttons[76].frequency = buttons[55].frequency * 6 / 5; //dob / lab
			buttons[31].frequency = buttons[10].frequency * 6 / 5; //fab / réb
			buttons[14].frequency = buttons[69].frequency * 6 / 5 / 2; //réb / sib/sol
			buttons[47].frequency = buttons[24].frequency * 6 / 5; //solb / mib/do
			buttons[78].frequency = buttons[57].frequency * 6 / 5; //dob / lab/fa
			buttons[33].frequency = buttons[12].frequency * 6 / 5; //fab / réb/sib
			//mise à jour des 7èmes de dominante pour chaque fondamentale 
			buttons[1].frequency = baseFrequencyHarmonicNotes * 7 / 4 / 2; //Do7 / ré
			buttons[8].frequency = buttons[22].frequency * 7 / 4 / 2; //réb7 / mib
			buttons[9].frequency = buttons[24].frequency * 7 / 4 / 2; //réb7 / mib/do
			buttons[15].frequency = buttons[32].frequency * 7 / 4 / 2; //ré7 / mi
			buttons[19].frequency = buttons[36].frequency * 7 / 4 / 2; //mib7 / fa
			buttons[21].frequency = buttons[38].frequency * 7 / 4 / 2; //mib7 / fa/ré
			buttons[26].frequency = buttons[44].frequency * 7 / 4 / 2; //mi7 / fa#/ré
			buttons[27].frequency = buttons[45].frequency * 7 / 4 / 2; //fab7 / solb/mib
			buttons[28].frequency = buttons[46].frequency * 7 / 4 / 2; //mi7 / fa#
			buttons[34].frequency = buttons[50].frequency * 7 / 4 / 2; //fa7 / sol
			buttons[40].frequency = buttons[56].frequency * 7 / 4 / 2; //fa#7 / sol#/mi
			buttons[41].frequency = buttons[57].frequency * 7 / 4 / 2; //solb7 / lab/fa
			buttons[42].frequency = buttons[58].frequency * 7 / 4 / 2; //fa#7 / sol#
			buttons[48].frequency = buttons[62].frequency * 7 / 4 / 2; //sol7 / la
			buttons[52].frequency = buttons[67].frequency * 7 / 4 / 2; //lab7 / sib
			buttons[54].frequency = buttons[69].frequency * 7 / 4 / 2; //lab7 / sib/sol
			buttons[59].frequency = buttons[75].frequency * 7 / 4 / 2; //la7 / si/sol
			buttons[60].frequency = buttons[77].frequency * 7 / 4 / 2; //la7 / si
			buttons[64].frequency = buttons[4].frequency * 7 / 4; //sib7 / do
			buttons[66].frequency = buttons[6].frequency * 7 / 4; //sib7 / do/la
			buttons[71].frequency = buttons[11].frequency * 7 / 4; //si7 / do#/la
			buttons[72].frequency = buttons[12].frequency * 7 / 4; //dob7 / réb/sib
			buttons[73].frequency = buttons[13].frequency * 7 / 4; //si7 / do#
			
			tnotes[1].frequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (3 / 12));
			tnotes[2].frequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (4 / 12));
			tnotes[3].frequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (5 / 12));
			tnotes[4].frequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (6 / 12));
			tnotes[5].frequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (7 / 12));
			tnotes[6].frequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (8 / 12));
			tnotes[7].frequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (9 / 12));
			tnotes[8].frequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (10 / 12));
			tnotes[9].frequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (11 / 12));
			tnotes[10].frequency = baseFrequencyTemperedNotes;
			tnotes[11].frequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (1 / 12));
			tnotes[12].frequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (2 / 12));
			
			buttons[1].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (3 / 12));
			buttons[2].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (3 / 12));
			buttons[3].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (3 / 12));
			buttons[4].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (3 / 12));
			buttons[5].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (3 / 12));
			buttons[6].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (3 / 12));
			buttons[7].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (3 / 12));
			buttons[8].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (4 / 12));
			buttons[9].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (4 / 12));
			buttons[10].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (4 / 12));
			buttons[11].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (4 / 12));
			buttons[12].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (4 / 12));
			buttons[13].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (4 / 12));
			buttons[14].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (4 / 12));
			buttons[15].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (5 / 12));
			buttons[16].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (5 / 12));
			buttons[17].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (5 / 12));
			buttons[18].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (5 / 12));
			buttons[19].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (6 / 12));
			buttons[20].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (6 / 12));
			buttons[21].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (6 / 12));
			buttons[22].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (6 / 12));
			buttons[23].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (6 / 12));
			buttons[24].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (6 / 12));
			buttons[25].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (6 / 12));
			buttons[26].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (7 / 12));
			buttons[27].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (7 / 12));
			buttons[28].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (7 / 12));
			buttons[29].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (7 / 12));
			buttons[30].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (7 / 12));
			buttons[31].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (7 / 12));
			buttons[32].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (7 / 12));
			buttons[33].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (7 / 12));
			buttons[34].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (8 / 12));
			buttons[35].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (8 / 12));
			buttons[36].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (8 / 12));
			buttons[37].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (8 / 12));
			buttons[38].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (8 / 12));
			buttons[39].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (8 / 12));
			buttons[40].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (9 / 12));
			buttons[41].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (9 / 12));
			buttons[42].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (9 / 12));
			buttons[43].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (9 / 12));
			buttons[44].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (9 / 12));
			buttons[45].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (9 / 12));
			buttons[46].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (9 / 12));
			buttons[47].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (9 / 12));
			buttons[48].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (10 / 12));
			buttons[49].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (10 / 12));
			buttons[50].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (10 / 12));
			buttons[51].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (10 / 12));
			buttons[52].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (11 / 12));
			buttons[53].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (11 / 12));
			buttons[54].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (11 / 12));
			buttons[55].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (11 / 12));
			buttons[56].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (11 / 12));
			buttons[57].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (11 / 12));
			buttons[58].baseFrequency = baseFrequencyTemperedNotes / 2 * Math.pow(2, (11 / 12));
			buttons[59].baseFrequency = baseFrequencyTemperedNotes;
			buttons[60].baseFrequency = baseFrequencyTemperedNotes;
			buttons[61].baseFrequency = baseFrequencyTemperedNotes;
			buttons[62].baseFrequency = baseFrequencyTemperedNotes;
			buttons[63].baseFrequency = baseFrequencyTemperedNotes;
			buttons[64].baseFrequency = baseFrequencyTemperedNotes * Math.pow(2, (1 / 12));
			buttons[65].baseFrequency = baseFrequencyTemperedNotes * Math.pow(2, (1 / 12));
			buttons[66].baseFrequency = baseFrequencyTemperedNotes * Math.pow(2, (1 / 12));
			buttons[67].baseFrequency = baseFrequencyTemperedNotes * Math.pow(2, (1 / 12));
			buttons[68].baseFrequency = baseFrequencyTemperedNotes * Math.pow(2, (1 / 12));
			buttons[69].baseFrequency = baseFrequencyTemperedNotes * Math.pow(2, (1 / 12));
			buttons[70].baseFrequency = baseFrequencyTemperedNotes * Math.pow(2, (1 / 12));
			buttons[71].baseFrequency = baseFrequencyTemperedNotes * Math.pow(2, (2 / 12));
			buttons[72].baseFrequency = baseFrequencyTemperedNotes * Math.pow(2, (2 / 12));
			buttons[73].baseFrequency = baseFrequencyTemperedNotes * Math.pow(2, (2 / 12));
			
			
		}
		refreshFrequenciesValues();
		export let buttonsLength = Object.keys(buttons).length;
		export let tnotesLength = Object.keys(tnotes).length;
