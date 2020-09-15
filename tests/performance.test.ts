import { from, Sequence } from "../src/Sequence";
import data, { dataRecord } from "../src/data";

//#region profile
let profile = (f: Function, name?: string, maxTime: number = 1) => {
  let title = `executes in ${maxTime.toFixed(2)}ms or less ${name ?? ""}`;

  it(title, () => {
    let started = performance.now();
    f();
    let stopped = performance.now();
    let elapsed = stopped - started;

    expect(elapsed).toBeLessThanOrEqual(maxTime);
  });
};
//#endregion

let sourceData: Sequence<dataRecord> = from(data);

describe("all", () => {
  profile(() => {
    sourceData.all((e) => e.isActive);
  });
});

describe("any", () => {
  profile(() => {
    sourceData.any((e) => e.isActive);
  });
});

describe("append", () => {
  // We need a new copy of the data so we don't pollute the original, here.
  var tempData = from(sourceData.toArray());
  var sourceItem = sourceData.elementAt(0);
  var item = { ...sourceItem };
  item.friends = { ...sourceItem.friends };
  item.tags = { ...sourceItem.tags };
  item._id = "1234567890";

  profile(() => {
    tempData.append(item);
  });
});

describe("concat", () => {
  profile(() => Sequence.range(0, 10000).concat(Sequence.range(10000, 10000)));
});

describe("count", () => {
  profile(() => sourceData.count(), "without a predicate");
  profile(() => sourceData.count((e) => e.isActive), "with a predicate");
});

describe("elementAt", () =>
  profile(() => {
    sourceData.elementAt(0);
  }));

describe("elementAtOrDefault", () => {
  profile(() => sourceData.elementAtOrDefault(-1), "with invalid index");
  profile(() => sourceData.elementAtOrDefault(0), "with valid index");
});

describe("empty", () => {
  profile(() => Sequence.empty<number>());
});

describe("select", () =>
  profile(() => sourceData.select((d) => ({
    address: d.address,
    email: d.email,
    name: d.name,
    phone: d.phone,
  }))));

describe("take", () => {
  profile(() => Sequence.range(0, 1000).take(-1), "where count < 0");
  profile(
    () => Sequence.range(0, 1000).take(50000),
    "where count > sequence count"
  );
  profile(() => Sequence.range(0, 1000).take(50), "where count is valid");
});

describe("takeWhile", () => {
  profile(() => Sequence.range(-50, 100).takeWhile(n => n < 0));
});

describe("toArray", () => {
  profile(() => sourceData.toArray());
});

describe("where", () => {
  profile(() => sourceData.where((e) => e.isActive));
});
