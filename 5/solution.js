const { readInput } = require("../common");
const inputPath = `${__dirname}/input.txt`;

const parseConfiguration = (configuration) => {
    const stacksMap = {
        1: [], 2: [],
        3: [], 4: [],
        5: [], 6: [],
        7: [], 8: [],
        9: []
    };

    // first crate is at i=1, second is at i=5, etc.
    const cratePositionIndexStart = 1;
    const cratePositionIndexOffset = 4;
    const cratePositionLastIndex = cratePositionIndexStart + (8 * cratePositionIndexOffset);

    // start from array.length - 2 to skip the first line
    for (let i = configuration.length - 2; i >= 0; i--) {
        const row = configuration[i].split('');

        let currentCrateStack = 1;
        for (let crateIndex = cratePositionIndexStart;
                crateIndex <= cratePositionLastIndex;
                crateIndex += cratePositionIndexOffset) {
            const crate = row[crateIndex];

            if (crate.trim()) {
                stacksMap[currentCrateStack].push(crate);
            }

            currentCrateStack++;
        }
    }

    return stacksMap;
}

function solveP1() {
    const input = readInput(inputPath);

    const separatorIndex = input.indexOf('');

    const stacksConfiguration = input.slice(0, separatorIndex);
    const instructions = input.slice(separatorIndex + 1);

    const stacksMap = parseConfiguration(stacksConfiguration);

    instructions.forEach(instruction => {
        const [_, crateCount, __, fromStack, ___, toStack] = instruction.split(' ');

        for (let i = 0; i < crateCount; i++) {
            const fromCrate = stacksMap[fromStack].pop();
            stacksMap[toStack].push(fromCrate);
        }
    });

    const solution = Object.values(stacksMap).map(stack => stack.pop()).join('');

    console.log('P1:', solution);
}

function solveP2() {
    const input = readInput(inputPath);

    const separatorIndex = input.indexOf('');

    const stacksConfiguration = input.slice(0, separatorIndex);
    const instructions = input.slice(separatorIndex + 1);

    const stacksMap = parseConfiguration(stacksConfiguration);

    instructions.forEach(instruction => {
        const [_, crateCount, __, fromStack, ___, toStack] = instruction.split(' ');

        let fromCrates = [];
        for (let i = 0; i < crateCount; i++) {
            fromCrates.push(stacksMap[fromStack].pop());
        }

        stacksMap[toStack].push(...fromCrates.reverse());
    });

    const solution = Object.values(stacksMap).map(stack => stack.pop()).join('');

    console.log('P2:', solution);
}

solveP1();
solveP2();
