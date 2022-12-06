const { readInput, range, intersection } = require("../common");
const inputPath = `${__dirname}/input.txt`;

const getAssignmentSectors = (assignmentString) => {
    const numbersStr = assignmentString.split('-');
    const start = Number(numbersStr[0]);
    const end = Number(numbersStr[1]);

    return range(start, end);
}

function solveP1() {
    let solution = 0;

    const assignmentsList = readInput(inputPath);
    assignmentsList.forEach(assignmentPair => {
        const [left, right] = assignmentPair.split(',');

        const leftSectors = getAssignmentSectors(left);
        const rightSectors = getAssignmentSectors(right);

        const intersectingNumbers = intersection(leftSectors, rightSectors);

        if (intersectingNumbers.length === leftSectors.length ||
            intersectingNumbers.length === rightSectors.length) {
                solution++;
        }
    });

    console.log('P1:', solution);
}

function solveP2() {
    let solution = 0;

    const assignmentsList = readInput(inputPath);
    assignmentsList.forEach(assignmentPair => {
        const [left, right] = assignmentPair.split(',');

        const leftSectors = getAssignmentSectors(left);
        const rightSectors = getAssignmentSectors(right);

        const intersectingNumbers = intersection(leftSectors, rightSectors);

        if (intersectingNumbers.length) {
                solution++;
        }
    });

    console.log('P2:', solution);
}

solveP1();
solveP2();
