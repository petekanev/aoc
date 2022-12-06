const { readFileSync } = require('fs');

const inputP1Path = `${__dirname}/input.txt`;

function solveP1(inputPath) {
    const input = readFileSync(inputPath)?.toString();

    const elves = [];
    let currElf = 0;
    input.split('\n').forEach(number => {
        const num = number.trim();

        if (!elves[currElf]) {
            elves[currElf] = 0;
        }

        if (num) {
            elves[currElf] += Number(num);
        } else {
            currElf++;
        }
    });

    const sortedElves = elves.sort((a, b) => b - a);

    console.log(sortedElves);
}

solveP1(inputP1Path);
