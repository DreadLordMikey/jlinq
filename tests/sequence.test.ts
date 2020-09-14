import { from, Sequence } from "../src/Sequence";

describe("Sequence construction", () => {
  it("throws if passed undefined", () => {
    expect(() => new Sequence<number>(undefined)).toThrow();
  });
  it("throws if passed null", () => {
    expect(() => new Sequence<number>(null)).toThrow();
  });
  it("succeeds when passed an empty array", () => {
    expect(new Sequence<number>([])).not.toBeNull;
  });
  it("succeeds when passed a non-empty array", () => {
    expect(
      new Sequence<number>([1, 2, 3])
    ).not.toBeNull;
  });
});

describe("any() tests", () => {
  it("returns false if array is empty and no predicate is provided", () => {
    let any: boolean = from<number>([]).any();
    expect(any).toBeFalsy;
  });
  it("does not return true if array is empty and no predicate is provided", () => {
    let any: boolean = from<number>([]).any();
    expect(any).not.toBeTruthy;
  });
  it("returns true if array is not empty and no predicate is provided", () => {
    let any: boolean = from([1, 2, 3, 4, 5]).any();
    expect(any).toBeTruthy;
  });
  it("returns false if not empty and no items match predicate", () => {
    expect(() => from([1, 2, 3]).any((e) => e === -1)).toBeFalsy;
  });
  it("returns true if not empty and any item matches predicate", () => {
    expect(() => from([1, 2, 3]).any((e) => e === 3)).toBeTruthy;
  });
});

describe("count() tests", () => {
  // Create an array containing 100 integers, with values from 0 to 99.
  let start = 0;
  let count = 100;
  let seq = Sequence.range(start, count);

  it("returns correct count when no predicate is provided", () => {
    // If no predicate is provided, count() returns the total number of
    // items in the sequence.
    let c = seq.count();
    expect(c).toEqual(count);
  });

  it("returns correct count when predicate is provided", () => {
    // If a predicate is provided, count() returns the number of items in the
    // sequence that satisfy the predicate condition. In the condition below,
    // we expect the count to be one half of the total items.
    let c = seq.count((n) => n % 2 === 0);
    expect(c).toEqual(count / 2);
  });
});

describe("toArray() tests", () => {
  var arr = [1, 2, 3, 4, 5];
  var copy = from(arr).toArray();

  it("returns non-null array instance", () => {
    expect(copy).not.toBeNull;
  });

  it("gets a copy of the original array", () => {
    expect(copy).not.toBe(arr);
  });

  it("gets array equal in size to original array", () => {
    expect(copy.length).toEqual(arr.length);
  });

  it("gets values equal to original values", () => {
    // toEqual walks all values recursively and compares them.
    expect(copy).toEqual(arr);
  });
});

describe("where() tests", () => {
  let seq = Sequence.range(0, 5);

  let evens = seq.toArray().filter((n) => n % 2 === 0);
  let odds = seq.toArray().filter((n) => n % 2 !== 0);

  it("throws if predicate is undefined", () => {
    expect(() => seq.where(undefined)).toThrow();
  });

  it("throws if predicate is null", () => {
    expect(() => seq.where(null)).toThrow();
  });

  it("selects all even values", () => {
    let localEvens = seq.where((n) => n % 2 === 0).toArray();
    expect(localEvens).toEqual(evens);
  });

  it("selects all odd values", () => {
    let localOdds = seq.where((n) => n % 2 !== 0).toArray();
    expect(localOdds).toEqual(odds);
  });
});
