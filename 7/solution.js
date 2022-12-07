const path = require('path');
const { readInput, filterObject } = require("../common");
const inputPath = `${__dirname}/input.txt`;

const buildDirStructure = (input) => {
    let currentPath = '/';
    const dirStructure = {
        '/': 0
    };

    input
        // ls as a command can be ignored; dir as an identifier can also be ignored
        .filter(l => !l.startsWith('ls') || !l.startsWith('dir'))
        .forEach((line) => {
            const lineParts = line.split(' ');
            if (line.startsWith('$')) {
                const [_, command, param] = lineParts;

                if (command === 'cd') {
                    currentPath = path.resolve(currentPath, param);
                }
            } else {
                const [dirOrSize, fileName] = lineParts;
                const filePath = path.resolve(currentPath, fileName);

                if (!dirStructure[filePath]) {
                    dirStructure[filePath] = 0;
                }

                if (dirOrSize !== 'dir') {
                    const size = Number(dirOrSize);
                    dirStructure[filePath] += size;
                }
            }
        });

    return dirStructure;
};

const countDirectorySize = (dirStructure, dirName) => {
    const fileKeys = Object.keys(dirStructure).filter(k => k.startsWith(dirName));

    const dirSize = fileKeys.reduce((accumulator, key) => {
        accumulator += dirStructure[key];

        return accumulator;
    }, 0);

    return dirSize;
};

function solveP1() {
    let solution = 0;

    const input = readInput(inputPath);

    const dirStructure = buildDirStructure(input);
    const maxDirSize = 100000;

    const onlyDirs = filterObject(dirStructure, (file) => file === 0);
    const onlyDirsKeys = Object.keys(onlyDirs);

    const sumOfSizes = onlyDirsKeys.reduce((accumulator, key) => {
        const size = countDirectorySize(dirStructure, key);

        if (size <= maxDirSize) {
            accumulator += size;
        }

        return accumulator;
    }, 0);

    solution = sumOfSizes;

    console.log('P1:', solution);
}

function solveP2() {
    let solution = 0;

    const input = readInput(inputPath);

    const dirStructure = buildDirStructure(input);
    const totalDiskSpace = 70000000;
    const goalSpace = 30000000;


    const onlyDirs = filterObject(dirStructure, (file) => file === 0);
    const onlyDirsKeys = Object.keys(onlyDirs);

    const occupiedDiskSpace = countDirectorySize(dirStructure, '/');
    const availableDiskSpace = totalDiskSpace - occupiedDiskSpace;
    const minTarget = goalSpace - availableDiskSpace;

    console.log({ occupiedDiskSpace, availableDiskSpace, minTarget });

    const dirSizesDeleteCandidates = onlyDirsKeys
        .map((key) => countDirectorySize(dirStructure, key))
        .filter(size => size >= minTarget)
        .sort((a, b) => a - b);

    const dirSizeToDelete = dirSizesDeleteCandidates[0];

    solution = dirSizeToDelete;

    console.log('P2:', solution);
}

solveP1();
solveP2();
