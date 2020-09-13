"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequence_1 = require("./Sequence");
let anyDemo = () => {
    var data = new Sequence_1.Sequence([1, 2, 3, 4, 5]);
    var emptyData = new Sequence_1.Sequence([]);
    console.log("---ANY with []---");
    console.log(`Any elements at all: ${emptyData.any()} (should be false)`);
    console.log(`Any equal to -1: ${emptyData.any((e) => e === -1)} (should be false)`);
    console.log(`Any equal to 3: ${emptyData.any((e) => e === 3)} (should be false)`);
    console.log();
    console.log("---ANY with [1, 2, 3, 4, 5]---");
    console.log(`Any elements at all: ${data.any()} (should be true)`);
    console.log(`Any equal to -1: ${data.any((e) => e === -1)} (should be false)`);
    console.log(`Any equal to 3: ${data.any((e) => e === 3)} (should be true)`);
};
anyDemo();
//# sourceMappingURL=main.js.map