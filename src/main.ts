import { from, Sequence } from "./Sequence";
import data, { dataRecord } from "./data";

let allDemo = () => {
  let arr = ["foo", "bar", "baz"];
  let data = from(arr);
  console.log();
  console.log("--- ALL ---");
  console.log(data.all((e) => e.startsWith("f") || e.startsWith("b"))); // displays true
  console.log(data.all((e) => e.includes("oop"))); // returns false;
};

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

let rangeDemo = () => {
  // Range creates an array of numbers starting at the specified number,
  // and having the specified number of elements. It's useful for quickly
  // creating an array for testing purposes.

  let seq = Sequence.range(10, 10);
  console.log();
  console.log("--- RANGE ---");
  console.log(seq.toString());
};

let selectDemo = () => {
  let seq = from(data)
    .where((d) => d.isActive)
    .select((d) => ({ name: d.name, address: d.address }));
  console.log();
  console.log("--- SELECT ---");
  console.log(seq.toString());
};

// allDemo();
// anyDemo();
// rangeDemo();
selectDemo();
