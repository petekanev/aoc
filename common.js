const { readFileSync } = require('fs');

const readInput = (path, trimLines = false) => {
    const input = readFileSync(path)?.toString();
    const result = input.split('\n').map(line => trimLines ? line.trim() : line);

    return result;
};

const intersection = (arr1, arr2, arr3) => {
    if (!arr3) {
        return arr1.filter(v => arr2.includes(v));
    } else {
        return arr1.filter(v => arr2.includes(v) && arr3.includes(v));
    }
};

const range = (start, end) => {
    const step = 1;
    const arr = [start];
    let i = start;

    while (i < end) {
        i += step;
        arr.push(i);
    }

    return arr;
};

const uniq = (arr) => {
    return arr.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });
};

const sortObject = (obj) => {
    return Object.keys(obj)
        .sort()
        .reduce((accumulator, key) => {
            accumulator[key] = obj[key];

            return accumulator;
        }, {});
}

const filterObject = (obj, predicate) => {
    return Object.keys(obj).reduce((accumulator, key) => {
        if (predicate(obj[key])) {
            accumulator[key] = obj[key];
        }

        return accumulator;
      }, {});
}

module.exports = {
    readInput,
    intersection,
    range,
    uniq,
    sortObject,
    filterObject
}
