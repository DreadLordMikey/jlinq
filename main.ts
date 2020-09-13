import { Sequence } from "./src/Sequence";

let anyDemo = () => {
  var data = new Sequence([1, 2, 3, 4, 5]);
  var emptyData = new Sequence<number>([]);

  console.log("---ANY with []---");
  console.log(`Any elements at all: ${emptyData.any()} (should be false)`);
  console.log(`Any equal to -1:     ${emptyData.any((e: number) => e === -1)} (should be false)`);
  console.log(`Any equal to 3:      ${emptyData.any((e: number) => e === 3)} (should be false)`);
  console.log();
  console.log("---ANY with [1, 2, 3, 4, 5]---");
  console.log(`Any elements at all: ${data.any()} (should be true)`);
  console.log(`Any equal to -1:     ${data.any((e: number) => e === -1)} (should be false)`);
  console.log(`Any equal to 3:      ${data.any((e: number) => e === 3)} (should be true)`);
};

anyDemo();
