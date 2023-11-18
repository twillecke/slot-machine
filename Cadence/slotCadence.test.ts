import { handleCadences } from "./SlotMachineCadence";

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

const expectedGameRounds = {
	roundOne: [0, 0.25, 2.25, 4.25, 4.5],
	roundTwo: [0, 2, 4, 6, 8],
	roundThree: [0, 0.25, 0.5, 0.75, 1],
};

test("Its match!", () => {
	expect(handleCadences(roundSymbols)).toEqual(expectedGameRounds);
});
