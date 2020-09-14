"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequence_1 = require("./Sequence");
const data_1 = __importDefault(require("./data"));
const { performance } = require("perf_hooks");
//#region all
let allDemo = () => {
    let arr = ["foo", "bar", "baz"];
    let data = Sequence_1.from(arr);
    console.log();
    console.log("--- ALL ---");
    console.log(data.all((e) => e.startsWith("f") || e.startsWith("b"))); // displays true
    console.log(data.all((e) => e.includes("oop"))); // returns false;
};
//#endregion
//#region any
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
//#endregion
//#region append
let appendDemo = () => {
    // Append is implemented per the LINQ specification. Because it returns a
    // new sequence containing the appended items, you can chain calls to it to
    // add more items.
    let seq = Sequence_1.Sequence.empty().append("foo").append("bar").append("baz");
    console.log(seq.toString());
    var items = seq.toArray();
};
//#endregion
//#region elementAt
let elementAtDemo = () => {
    let record = Sequence_1.from(data_1.default).elementAt(3);
    console.log(record);
};
//#endregion
//#region empty
let emptyDemo = () => {
    let ds = Sequence_1.Sequence.empty();
    let count = ds.count();
    console.log(`empty set count: ${count}`);
};
//#endregion
//#region range
let rangeDemo = () => {
    // Range creates an array of numbers starting at the specified number,
    // and having the specified number of elements. It's useful for quickly
    // creating an array for testing purposes.
    let seq = Sequence_1.Sequence.range(10, 10);
    console.log();
    console.log("--- RANGE ---");
    console.log(seq.toString());
};
//#endregion
//#region select
let selectDemo = () => {
    let seq = Sequence_1.from(data_1.default)
        .where((d) => d.isActive)
        .select((d) => ({ name: d.name, address: d.address }));
    console.log();
    console.log("--- SELECT ---");
    console.log(seq.toString());
};
//#endregion
// allDemo();
// anyDemo();
//appendDemo();
elementAtDemo();
// emptyDemo();
// rangeDemo();
// selectDemo();
//# sourceMappingURL=main.js.map