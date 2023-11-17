/*

Given the README example that line `[1, 2, 6, 6, 6]` output should be `[6, [2, 3, 4]]]`, 
type WinningCombinationsResult may be represented as:
[paying symbol number, [array containing indexes of winning sequence]]]

# Considerations on using '-1' as default currentSequenceNumber:

If the entire array contains only non-paying symbols (numbers greater than 9), 
currentSequenceNumber remains -1 after the iteration. 

-> This information is used to  handle the case where no winning sequence can be formed; 
-> It helps in identifying the start of a winning sequence;

*/

type WinningCombinationsResult = [number, number[]][];

function call(lines: number[]): WinningCombinationsResult {
	let currentSequenceNumber = findFirstPayingSymbol(lines);
	// Current sequence indexes should be stored and added later to WinningCombinationsResult
	let currentSequenceIndexes: number[] = [];
	// Indexes of zeros encountered, potentially forming a sequence with subsequent numbers.
	let zeroSequenceIndexes: number[] = [];
	let result: WinningCombinationsResult = [];

	// If there are no paying symbols in the entire line, set currentSequenceNumber to 0
	if (currentSequenceNumber === -1) {
		currentSequenceNumber = 0;
	}

	lines.forEach((currentElementValue: number, index: number) => {
		if (currentElementValue > 9) {
			handleNonPayingSymbol();
			return;
		}

		if (currentElementValue === 0) {
			handleSpecialSymbol(index);
			return;
		}

		if (currentElementValue !== currentSequenceNumber) {
			handleDifferentPayingSymbol(index, currentElementValue);
			return;
		}

		// Handle continuation of the current sequence
		handleContinuation(index);
	});

	// Check if last sequence satisfies the winning condition
	if (currentSequenceIndexes.length >= 3) {
		result.push([currentSequenceNumber, currentSequenceIndexes]);
	}

	return result;

	function handleNonPayingSymbol() {
		// Push winning sequence number and indexes when encountering a non-winning symbol
		if (currentSequenceIndexes.length >= 3) {
			result.push([currentSequenceNumber, currentSequenceIndexes]);
		}
		// Reinitialize variables for next value
		currentSequenceNumber = -1;
		currentSequenceIndexes = [];
		zeroSequenceIndexes = [];
	}

	function handleSpecialSymbol(index: number) {
		// Since 0 is a special symbol, potentially forming a sequence with other paying symbols, it should
		// be store in both 'current' and 'next' sequences
		currentSequenceIndexes.push(index);
		zeroSequenceIndexes.push(index);
	}

	function handleDifferentPayingSymbol(
		index: number,
		currentElementValue: number,
	) {
		// If 'current value' and 'current sequence number' dont't match, we either have a new sequence from 0s or
		// current number = -1 because it was previously reinitilizaded
		if (currentSequenceNumber === -1) {
			currentSequenceNumber = currentElementValue;
			currentSequenceIndexes = zeroSequenceIndexes;
			zeroSequenceIndexes = [];
			currentSequenceIndexes.push(index);
		} else {
			// If lenght is bigger or equal 3, it means we've completed a winning sequence and should add it to result
			if (currentSequenceIndexes.length >= 3) {
				result.push([currentSequenceNumber, currentSequenceIndexes]);
			}
			currentSequenceNumber = currentElementValue;
			currentSequenceIndexes = zeroSequenceIndexes;
			zeroSequenceIndexes = [];
			currentSequenceIndexes.push(index);
		}
	}

	function handleContinuation(index: number) {
		// If control flow didn't enter any "ifs" above, current value forms a sequence. Add currentindex to
		// current sequence indexes
		currentSequenceIndexes.push(index);
		zeroSequenceIndexes = [];
	}
}

function findFirstPayingSymbol(lines: number[]): number {
	for (const value of lines) {
		if (value <= 9 && value >= 1) {
			return value;
		}
	}
	return -1; // Default if no paying symbol is found
}

export const WinningCombinations = { call };
