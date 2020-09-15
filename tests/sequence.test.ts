import { from, Sequence } from "../src/Sequence";
import data, { dataRecord } from "../src/data";

//#region constructor
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
//#endregion

//#region all
describe("all() tests", () => {
  var arr: Array<string> = ["foo", "bar", "baz"];

  it("returns false if no elements match the predicate condition", () => {
    let result: boolean = from(arr).all((e) => e === "foobarbaz");
    expect(result).toBeFalsy;
  });
  it("returns true if all element satisfy the predicate condition", () => {
    let result: boolean = from(arr).all(
      (e) => e.startsWith("f") || e.startsWith("b")
    );
    expect(result).toBeTruthy;
  });
});
//#endregion

//#region any
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
//#endregion

//#region append
describe("append() tests", () => {
  it("appends a new value to the end of the sequence.", () => {
    let seq = Sequence.empty<string>();
    let newSeq: string[];

    newSeq = seq.append("foo").toArray();

    let item = newSeq[0];
    expect(item).toEqual("foo");
  });
  it("preserves existing values", () => {
    let seq = Sequence.empty<string>();

    seq = seq.append("foo").append("bar").append("baz");

    let items = seq.toArray();
    expect(items.length).toEqual(3);
    expect(items[0]).toEqual("foo");
    expect(items[1]).toEqual("bar");
    expect(items[2]).toEqual("baz");
  });
  it("append performs in < .5s with large dataset", () => {
    let seq = from(data);
    let firstItem: dataRecord = data[0];

    // Create a copy of the first item in the array.
    let newItem: dataRecord = { ...firstItem };
    newItem.friends = { ...firstItem.friends };
    newItem.tags = { ...firstItem.tags };

    newItem._id = "1234567890";

    seq = seq.append(newItem);
  });
});
//#endregion

//#region count
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
//#endregion

//#region elementAt
describe("elementAt() tests", () => {
  it("throws when index < 0", () => {
    let seq = Sequence.range(0, 10);
    expect(() => {
      let item = seq.elementAt(-1);
    }).toThrow();
  });
  it("throws when index >= sequence count", () => {
    let seq = Sequence.range(0, 10);
    expect(() => {
      let item = seq.elementAt(100);
    }).toThrow();
  });
  it("returns item when index is valid", () => {
    let item = Sequence.range(0, 10).elementAt(4);
    expect(item).toEqual(4);
  });
});
//#endregion

//#region elementAtOrDefault
describe("elementAtOrDefault() tests", () => {
  describe("numeric values", () => {
    let seq = Sequence.range(10, 10);
    it("returns default value when index is out of range", () => {
      let item = seq.elementAtOrDefault(-1);
      expect(item).toEqual(0);
    });
    it("returns item when index is in range", () => {
      let item = seq.elementAtOrDefault(1);
      expect(item).toEqual(11);
    });
  });
  describe("string values", () => {
    let seq = from(["foo", "bar", "baz"]);
    it("returns default value when index is out of range", () => {
      let item = seq.elementAtOrDefault(-1);
      expect(item).toBeNull;
    });
    it("returns item when index is in range", () => {
      let item = seq.elementAtOrDefault(1);
      expect(item).toEqual("bar");
    });
  });
  describe("boolean values", () => {
    let seq = from([false, true, true, false, true, false]);
    it("returns default value when index is out of range", () => {
      let item = seq.elementAtOrDefault(-1);
      expect(item).toEqual(false);
    });
    it("returns item when index is in range", () => {
      let item = seq.elementAtOrDefault(1);
      expect(item).toEqual(true);
    });
  });
  describe("complex values", () => {
    let seq = from(data);
    it("returns default value when index is out of range", () => {
      let item = seq.elementAtOrDefault(-1);
      expect(item).toEqual(null);
    });
    it("returns item when index is in range", () => {
      let item = seq.elementAtOrDefault(1);
      let firstItem = data[1];
      expect(item).toEqual(firstItem);
    });
  });
});
//#endregion

//#region empty
describe("empty() tests", () => {
  let emptySet = Sequence.empty<number>();
  it("set is not null", () => {
    expect(emptySet).not.toBeNull;
  });
  it("set contains no items", () => {
    let count = emptySet.count();
    expect(count).toEqual(0);
  });
});
//#endregion

//#region select
describe("select() tests", () => {
  it("returns non-empty set", () => {
    let count = from(data)
      .select((d) => {
        d.address, d.email, d.name, d.phone;
      })
      .toArray().length;
    expect(count).not.toEqual(0);
  });

  it("selects contact information", () => {
    let arr = from(data)
      .select((d) => ({
        address: d.address,
        email: d.email,
        name: d.name,
        phone: d.phone,
      }))
      .toArray();

    let allMatch = true;
    for (var i = 0; i < arr.length; i++) {
      let e = arr[i];
      let hasProps =
        e.hasOwnProperty("address") &&
        e.hasOwnProperty("email") &&
        e.hasOwnProperty("name") &&
        e.hasOwnProperty("phone");

      if (!hasProps) {
        allMatch = false;
        break;
      }
    }

    expect(allMatch).toBeTruthy;
  });

  it("selects and includes element index", () => {
    let arr = from(data)
      .select((d, i) => ({
        index: i,
        name: d.name,
      }))
      .toArray();

    let allMatch = true;
    for (var i = 0; i < arr.length; i++) {
      let e: number = arr[i]["index"];
      if (e != i) {
        allMatch = false;
        break;
      }
    }
    expect(allMatch).toBeTruthy;
  });
});
//#endregion

//#region toArray
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
//#endregion

//#region where
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
//#endregion
