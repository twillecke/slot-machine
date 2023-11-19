// This was first iteration of cadence algorithm

import { handleCadences } from "./SlotMachineCadence";

const anticipatorConfig = {
	columnSize: 5,
	minToAnticipate: 2,
	maxToAnticipate: 3,
	anticipateCadence: 2,
	defaultCadence: 0.25,
};

type SlotCoordinate = {
	column: number;
	row: number;
};


const mockSpecialSymbols = [
	{ column: 0, row: 2 },
	{ column: 1, row: 3 },
	{ column: 3, row: 4 },
];

const roundSymbols = {
	roundOne: {
		specialSymbols: [
			{ column: 0, row: 2 },
			{ column: 1, row: 3 },
			{ column: 3, row: 4 },
		],
	},
	roundTwo: {
		specialSymbols: [
			{ column: 0, row: 2 },
			{ column: 0, row: 3 },
		],
	},
	roundThree: {
		specialSymbols: [
			{ column: 4, row: 2 },
			{ column: 4, row: 3 },
		],
	},
};

type SpecialSymbol = { specialSymbols: Array<SlotCoordinate> };

function calcCadence(specialSymbols: any) {
	// first cadence is always 0 since it's start of time
	let result = [0];
	// store number of symbols to trigger anticipation cadence calculation
	let SymbolsIndexes = findSymbols(specialSymbols);
	// Handle case where there's special symbol at firts column
	let nSymbols = SymbolsIndexes.includes(0) ? 1 : 0;
	let previousCadence = 0;

	for (let index = 0; index < anticipatorConfig.columnSize - 1; index++) {
		console.log(`nSymbols: ${nSymbols} Index: ${index}`);

        // Handle anticipation cadence case
		if (
            // 
			nSymbols >= anticipatorConfig.minToAnticipate &&
			nSymbols < anticipatorConfig.maxToAnticipate
		) {
			// After reaching the minimum symbols to anticipate current cadence will increment 
            // with anticipate cadence ONLY, instead of default cadence
			const currentCadence =
				previousCadence +
				anticipatorConfig.anticipateCadence;
			previousCadence = currentCadence;
			result.push(currentCadence);
		} else {
			// Increment previous cadence with default cadence
			const currentCadence =
				previousCadence + anticipatorConfig.defaultCadence;
			previousCadence = currentCadence;
			result.push(currentCadence);
		}
		if (SymbolsIndexes.includes(index)) nSymbols++;
	}
	return result;
}

// find special symbols positions
function findSymbols(specialSymbols: any) {
	let result = [];
	for (let index = 0; index < specialSymbols.length; index++) {
		const element = specialSymbols[index];
		result.push(element.column);
	}
	return result;
}

console.log(handleCadences(roundSymbols));

// console.log(calcCadence(mockSpecialSymbols));
