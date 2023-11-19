[![Jest](https://img.shields.io/badge/tested_with-jest-99424f?logo=jest)](https://jestjs.io/)
[![TypeScript](https://img.shields.io/badge/built_with-TypeScript-007ACC?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)](https://nodejs.org/)

# Slot Machine Scripts

This project contains two TypeScript implementations for a slot machine. For detailed implementation requirements, please refer to the README file inside each respective folder.

## [Slot Cadence Generator](./Cadence/README.md)

This script generates a slot cadence based on an array of SlotCoordinate objects. The generated cadence represents the timing or sequence of slots in the slot machine.

## [Winning Combinations Checker](./Winning%20Combinations/README.md)

This script checks if there are winning sequences in the slot machine. If winning sequences are found, an array is returned with indexes of winning sequence symbols and its associated paying symbol.

## Tests

Both implementations come with Jest tests. In order to run them:
- Install dependencies:  `npm install`  or  `yarn add`
- Run test: `npx jest`
