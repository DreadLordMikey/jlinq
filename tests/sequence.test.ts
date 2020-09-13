import { Sequence } from "../src/Sequence";

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
    var seq = new Sequence<number>([]);
    var any = seq.any();
    expect(any).toBeFalsy;
  });
  it("does not return true if array is empty and no predicate is provided", () => {
    var seq = new Sequence<number>([]);
    var any: boolean = seq.any();
    expect(any).not.toBeTruthy;
  });
  it("returns true if array is not empty and no predicate is provided", () => {
    var seq = new Sequence<number>([1, 2, 3, 4, 5]);
    var any: boolean = seq.any();
    expect(any).toBeTruthy;
  });
  it("returns false if not empty and no items match predicate", () => {
    expect(() => new Sequence<number>([1, 2, 3]).any((e) => e === -1))
      .toBeFalsy;
  });
  it("returns true if not empty and any item matches predicate", () => {
    expect(() => new Sequence([1, 2, 3]).any((e) => e === 3)).toBeTruthy;
  });
});

describe("toArray() tests", () => {
  var arr = [1, 2, 3, 4, 5];
  var seq = new Sequence(arr);
  var copy = seq.toArray();

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
