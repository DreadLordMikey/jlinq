import { from, Sequence } from "./Sequence";
import data, { dataRecord } from "./data";

const { performance } = require("perf_hooks");

//#region all
let allDemo = () => {
  let arr = ["foo", "bar", "baz"];
  let data = from(arr);
  console.log();
  console.log("--- ALL ---");
  console.log(data.all((e) => e.startsWith("f") || e.startsWith("b"))); // displays true
  console.log(data.all((e) => e.includes("oop"))); // returns false;
};
//#endregion

//#region any
let anyDemo = () => {
  var data = new Sequence([1, 2, 3, 4, 5]);
  var emptyData = new Sequence<number>([]);

  console.log("---ANY with []---");
  console.log(`Any elements at all: ${emptyData.any()} (should be false)`);
  console.log(
    `Any equal to -1:     ${emptyData.any(
      (e: number) => e === -1
    )} (should be false)`
  );
  console.log(
    `Any equal to 3:      ${emptyData.any(
      (e: number) => e === 3
    )} (should be false)`
  );
  console.log();
  console.log("---ANY with [1, 2, 3, 4, 5]---");
  console.log(`Any elements at all: ${data.any()} (should be true)`);
  console.log(
    `Any equal to -1:     ${data.any(
      (e: number) => e === -1
    )} (should be false)`
  );
  console.log(
    `Any equal to 3:      ${data.any((e: number) => e === 3)} (should be true)`
  );
};
//#endregion

//#region append
let appendDemo = () => {
  // Append is implemented per the LINQ specification. Because it returns a
  // new sequence containing the appended items, you can chain calls to it to
  // add more items.

  let seq = Sequence.empty<string>().append("foo").append("bar").append("baz");

  console.log(seq.toString());
  var items = seq.toArray();
};
//#endregion

//#region elementAt
let elementAtDemo = () => {
    let record = from(data).elementAt(3);
    console.log(record);
};
//#endregion

//#region empty
let emptyDemo = () => {
  let ds = Sequence.empty<dataRecord>();
  let count = ds.count();
  console.log(`empty set count: ${count}`);
};
//#endregion

//#region range
let rangeDemo = () => {
  // Range creates an array of numbers starting at the specified number,
  // and having the specified number of elements. It's useful for quickly
  // creating an array for testing purposes.

  let seq = Sequence.range(10, 10);
  console.log();
  console.log("--- RANGE ---");
  console.log(seq.toString());
};
//#endregion

//#region select
let selectDemo = () => {
  let seq = from(data)
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
