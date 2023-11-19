type AnticipatorConfig = {
	columnSize: number;
	minToAnticipate: number;
	maxToAnticipate: number;
	anticipateCadence: number;
	defaultCadence: number;
};

type SlotCoordinate = {
	column: number;
	row: number;
};

type SpecialSymbol = { specialSymbols: Array<SlotCoordinate> };

type RoundsSymbols = {
	roundOne: SpecialSymbol;
	roundTwo: SpecialSymbol;
	roundThree: SpecialSymbol;
};

type SlotCadence = Array<number>;

type RoundsCadences = {
	roundOne: SlotCadence;
	roundTwo: SlotCadence;
	roundThree: SlotCadence;
};

/**
 * Anticipator configuration. Has all information needed to check anticipator.
 * @param columnSize It's the number of columns the slot machine has.
 * @param minToAnticipate It's the minimum number of symbols to start anticipation.
 * @param maxToAnticipate It's the maximum number of symbols to end anticipation.
 * @param anticipateCadence It's the cadence value when has anticipation.
 * @param defaultCadence It's the cadence value when don't has anticipation.
 */
const anticipatorConfig: AnticipatorConfig = {
	columnSize: 5,
	minToAnticipate: 2,
	maxToAnticipate: 3,
	anticipateCadence: 2,
	defaultCadence: 0.25,
};

/**
 * Game rounds with special symbols position that must be used to generate the SlotCadences.
 */
const gameRounds: RoundsSymbols = {
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

/**
 * This must be used to get all game rounds cadences.
 */
const slotMachineCadences: RoundsCadences = {
	roundOne: [],
	roundTwo: [],
	roundThree: [],
};

/**
 * This function receives an array of coordinates relative to positions in the slot machine's matrix.
 * This array is the positions of the special symbols.
 * And it has to return a slot machine stop cadence.
 * @param symbols Array<SlotCoordinate> positions of the special symbols. Example: [{ column: 0, row: 2 }, { column: 2, row: 3 }]
 * @returns SlotCadence Array of numbers representing the slot machine stop cadence.
 */
export default function slotCadence(symbols: Array<SlotCoordinate>): SlotCadence {
	// first cadence is always 0 since it's start of time
	const result: number[] = [0];
	// Store number of symbols to trigger anticipation cadence calculation
	const symbolsIndexes = symbols.map((element) => element.column);
	let previousCadence = 0;
	let symbolsCount: number;

	// Handle the case where there's special symbol in the firts column
	if (symbolsIndexes.includes(0)) {
		// If there's a special symbol in the first column, start with symbolsCount = 1
		symbolsCount = 1;
	} else {
		// If there's no special symbol in the first column, start with symbolsCount = 0
		symbolsCount = 0;
	}

	for (let index = 0; index < anticipatorConfig.columnSize - 1; index++) {
		// Handle anticipation cadence case
		if (
			symbolsCount >= anticipatorConfig.minToAnticipate &&
			symbolsCount < anticipatorConfig.maxToAnticipate
		) {
			// After reaching the minimum symbols to anticipate, current cadence will increment
			// with anticipate cadence ONLY, instead of default cadence
			const currentCadence =
				previousCadence + anticipatorConfig.anticipateCadence;
			previousCadence = currentCadence;
			result.push(currentCadence);
		} else {
			// Increment previous cadence with default cadence
			const currentCadence =
				previousCadence + anticipatorConfig.defaultCadence;
			previousCadence = currentCadence;
			result.push(currentCadence);
		}
		// Increment symbolsCount if the current index is a special symbol column
		if (symbolsIndexes.includes(index)) symbolsCount++;
	}
	return result;
}

/**
 * Get all game rounds and return the final cadences of each.
 * @param rounds RoundsSymbols with contains all rounds special symbols positions.
 * @return RoundsCadences has all cadences for each game round.
 */
function handleCadences(rounds: RoundsSymbols): RoundsCadences {
	slotMachineCadences.roundOne = slotCadence(rounds.roundOne.specialSymbols);
	slotMachineCadences.roundTwo = slotCadence(rounds.roundTwo.specialSymbols);
	slotMachineCadences.roundThree = slotCadence(
		rounds.roundThree.specialSymbols,
	);

	return slotMachineCadences;
}

console.log("CADENCES: ", handleCadences(gameRounds));

export { handleCadences };
