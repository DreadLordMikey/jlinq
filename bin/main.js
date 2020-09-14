"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequence_1 = require("./src/Sequence");
let anyDemo = () => {
    var data = new Sequence_1.Sequence([1, 2, 3, 4, 5]);
    var emptyData = new Sequence_1.Sequence([]);
    console.log("---ANY with []---");
    console.log(`Any elements at all: ${emptyData.any()} (should be false)`);
    console.log(`Any equal to -1:     ${emptyData.any((e) => e === -1)} (should be false)`);
    console.log(`Any equal to 3:      ${emptyData.any((e) => e === 3)} (should be false)`);
    console.log();
    console.log("---ANY with [1, 2, 3, 4, 5]---");
    console.log(`Any elements at all: ${data.any()} (should be true)`);
    console.log(`Any equal to -1:     ${data.any((e) => e === -1)} (should be false)`);
    console.log(`Any equal to 3:      ${data.any((e) => e === 3)} (should be true)`);
};
let rangeDemo = () => {
    // Range creates an array of numbers starting at the specified number,
    // and having the specified number of elements. It's useful for quickly
    // creating an array for testing purposes.
    let seq = Sequence_1.Sequence.range(10, 10);
    let seq2 = seq.where((e, i) => i > 0);
    let evenCount = seq2.count((n) => n % 2 === 0);
    let oddCount = seq2.count((n) => n % 2 !== 0);
    let evens = seq2.toArray().filter((n) => n % 2 === 0);
    let odds = seq2.toArray().filter((n) => n % 2 !== 0);
    console.log();
    console.log("--- RANGE ---");
    console.log(seq.toString());
    console.log(seq2.toString());
    console.log(evenCount);
    console.log(evens);
    console.log(oddCount);
    console.log(odds);
};
//anyDemo();
rangeDemo();
//# sourceMappingURL=main.js.map