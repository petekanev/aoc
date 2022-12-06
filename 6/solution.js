const { readInput, uniq } = require("../common");
const inputPath = `${__dirname}/input.txt`;

function solveP1() {
    let solution = 0;
    const windowSize = 4;

    const [communicationString] = readInput(inputPath);

    const communicationArr = Array.from(communicationString);

    for (let i = windowSize - 1; i < communicationString.length; i++) {
        const window = communicationArr.slice(i - windowSize + 1, i + 1);

        const uniqWindowCharacters = uniq(window);

        if (uniqWindowCharacters.length === windowSize) {
            solution = i + 1;
            break;
        }
    }

    console.log('P1:', solution);
}

function solveP2() {
    let solution = 0;
    const windowSize = 14;

    const [communicationString] = readInput(inputPath);

    const communicationArr = Array.from(communicationString);

    for (let i = windowSize - 1; i < communicationString.length; i++) {
        const window = communicationArr.slice(i - windowSize + 1, i + 1);

        const uniqWindowCharacters = uniq(window);

        if (uniqWindowCharacters.length === windowSize) {
            solution = i + 1;
            break;
        }
    }

    console.log('P1:', solution);
}

solveP1();
solveP2();
