const { readInput } = require("../common");
const inputPath = `${__dirname}/input.txt`;

/**
 * The first column is what your opponent is going to play: A for Rock, B for Paper, and C for Scissors.
 * The second column--
 */

// A ROCK
// B PAPER
// C SCISSORS

// part 1
// X ROCK - score 1
// Y PAPER - score 2
// Z SCISSORS - score 3

// part 2
// X loss
// Y draw
// Z win

// scores
// loss - 0
// draw - 3
// win - 6

// SCISSORS > ROCK > PAPER > SCISSORS

const rock = 'r';
const paper = 'p';
const scissors = 's';
const scoreMap = { [rock]: 1, [paper]: 2, [scissors]: 3 };
const shapesMap = {
    A: rock, X: rock,
    B: paper, Y: paper,
    C: scissors, Z: scissors
}

function playRockPaperScissors(theirs, ours) {
    const shapeTheirs = shapesMap[theirs] || theirs;
    const shapeOurs = shapesMap[ours] || ours;
    let score = scoreMap[shapeOurs];

    if (shapeTheirs === shapeOurs) {
        score += 3;
    } else if (
        shapeTheirs === rock && shapeOurs === paper ||
        shapeTheirs === paper && shapeOurs === scissors ||
        shapeTheirs === scissors && shapeOurs === rock) {
        score += 6;
    }

    return score;
}

function solveP1() {
    const strategy = readInput(inputPath);

    let scoreSum = 0;
    strategy.forEach(game => {
        const [theirs, ours] = game.split(' ').map(s => s.trim());

        const gameScore = playRockPaperScissors(theirs, ours);

        scoreSum += gameScore;
    });

    console.log('P1:', scoreSum);
}

function solveP2() {
    const outcomeFnMap = {
        X: (theirs) => {
            const shapeTheirs = shapesMap[theirs];
            return shapeTheirs === paper ? rock :
                shapeTheirs === rock ? scissors :
                shapeTheirs === scissors ? paper : paper;
        }, // loss
        Y: (theirs) => theirs, // draw
        Z: (theirs) => {
            const shapeTheirs = shapesMap[theirs];
            return shapeTheirs === paper ? scissors :
                shapeTheirs === rock ? paper :
                shapeTheirs === scissors ? rock : paper;
        } // win
    };

    const strategy = readInput(inputPath);

    let scoreSum = 0;
    strategy.forEach(game => {
        const [theirs, expectedOutcome] = game.split(' ').map(s => s.trim());
        const shapeOurs = outcomeFnMap[expectedOutcome](theirs);

        const gameScore = playRockPaperScissors(theirs, shapeOurs);

        scoreSum += gameScore;
    });

    console.log('P2:', scoreSum);
}

solveP1();
solveP2();
