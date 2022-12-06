const { readInput } = require("../common");
const inputPath = `${__dirname}/input.txt`;

const generatePrioMap = () => {
    const lowercaseStartingLetterCode = 97;
    const uppercaseStartingLetterCode = 65;
    const length = 26;

    const lowercaseString = [...Array(length).keys()].map(k => String.fromCharCode(lowercaseStartingLetterCode + k)).join('');
    const uppercaseString = lowercaseString.toLocaleUpperCase();

   return lowercaseString + uppercaseString;
};

const priorityMap = generatePrioMap();

const intersection = (arr1, arr2, arr3) => {
    if (!arr3) {
        return arr1.filter(v => arr2.includes(v));
    } else {
        return arr1.filter(v => arr2.includes(v) && arr3.includes(v));
    }
}

function solveP1() {
    const itemLists = readInput(inputPath);

    let commonItemsPrioSum = 0;
    itemLists.forEach(list => {
        const firstCompartment = list.slice(0, list.length / 2);
        const secondCompartment = list.slice(list.length / 2);

        const [commonItem] = intersection([...firstCompartment], [...secondCompartment]);

        commonItemsPrioSum += priorityMap.indexOf(commonItem) + 1;
    });

    console.log('P1:', commonItemsPrioSum);
}

function solveP2() {
    const itemLists = readInput(inputPath);

    let badgesPrioSum = 0;
    for (let i = 0; i < itemLists.length - 2; i += 3) {
        const rucksack1 = itemLists[i];
        const rucksack2 = itemLists[i + 1];
        const rucksack3 = itemLists[i + 2];

        const [commonItem] = intersection([...rucksack1], [...rucksack2], [...rucksack3]);

        console.log('common badge stuff', i, commonItem);
        badgesPrioSum += priorityMap.indexOf(commonItem) + 1
    }

    console.log('P2:', badgesPrioSum);
}

solveP1();
solveP2();
