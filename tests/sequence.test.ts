import { from, Sequence } from '../src/Sequence';
import data, { dataRecord } from '../src/data';

//#region constructor
describe('Sequence construction', () => {
  it('throws if passed undefined', () => {
    expect(() => new Sequence<number>(undefined)).toThrow();
  });
  it('throws if passed null', () => {
    expect(() => new Sequence<number>(null)).toThrow();
  });
  it('succeeds when passed an empty array', () => {
    expect(new Sequence<number>([])).not.toBeNull;
  });
  it('succeeds when passed a non-empty array', () => {
    expect(
      new Sequence<number>([1, 2, 3]),
    ).not.toBeNull;
  });
});
//#endregion

//#region all
describe('all() tests', () => {
  const arr: Array<string> = ['foo', 'bar', 'baz'];

  it('returns false if no elements match the predicate condition', () => {
    const result: boolean = from(arr).all((e) => e === 'foobarbaz');
    expect(result).toBeFalsy;
  });
  it('returns true if all element satisfy the predicate condition', () => {
    const result: boolean = from(arr).all(
      (e) => e.startsWith('f') || e.startsWith('b'),
    );
    expect(result).toBeTruthy;
  });
});
//#endregion

//#region any
describe('any() tests', () => {
  it('returns false if array is empty and no predicate is provided', () => {
    const any: boolean = from<number>([]).any();
    expect(any).toBeFalsy;
  });
  it('does not return true if array is empty and no predicate is provided', () => {
    const any: boolean = from<number>([]).any();
    expect(any).not.toBeTruthy;
  });
  it('returns true if array is not empty and no predicate is provided', () => {
    const any: boolean = from([1, 2, 3, 4, 5]).any();
    expect(any).toBeTruthy;
  });
  it('returns false if not empty and no items match predicate', () => {
    expect(() => from([1, 2, 3]).any((e) => e === -1)).toBeFalsy;
  });
  it('returns true if not empty and any item matches predicate', () => {
    expect(() => from([1, 2, 3]).any((e) => e === 3)).toBeTruthy;
  });
});
//#endregion

//#region append
describe('append() tests', () => {
  it('appends a new value to the end of the sequence.', () => {
    const seq = Sequence.empty<string>();
    const newSeq: string[] = seq.append('foo').toArray();

    const item = newSeq[0];
    expect(item).toEqual('foo');
  });
  it('preserves existing values', () => {
    let seq = Sequence.empty<string>();

    seq = seq.append('foo').append('bar').append('baz');

    const items = seq.toArray();
    expect(items.length).toEqual(3);
    expect(items[0]).toEqual('foo');
    expect(items[1]).toEqual('bar');
    expect(items[2]).toEqual('baz');
  });
  it('append performs in < .5s with large dataset', () => {
    const seq = from(data);
    const firstItem: dataRecord = data[0];

    // Create a copy of the first item in the array.
    const newItem: dataRecord = { ...firstItem };
    newItem.friends = { ...firstItem.friends };
    newItem.tags = { ...firstItem.tags };

    newItem._id = '1234567890';

    seq.append(newItem);
  });
});
//#endregion

//#region concat
describe('concat() tests', () => {
  let first: Sequence<string>;
  let second: Sequence<string>;
  let expected: Sequence<string>;
  beforeEach(() => {
    first = from(['Orange', 'Banana', 'Apple']);
    second = from(['Carrot', 'Corn', 'Radish']);
    expected = from(['Orange', 'Banana', 'Apple', 'Carrot', 'Corn', 'Radish']);
  });
  it('returns sequence of correct length', () => {
    const newSet = first.concat(second);
    expect(newSet.count()).toEqual(6);
  });
  it('returns elements in the correct order', () => {
    const newSet = first.concat(second);
    expect(newSet).toEqual(expected);
  });
});
//#endregion

//#region count
describe('count() tests', () => {
  // Create an array containing 100 integers, with values from 0 to 99.
  const start = 0;
  const count = 100;
  const seq = Sequence.range(start, count);

  it('returns correct count when no predicate is provided', () => {
    // If no predicate is provided, count() returns the total number of
    // items in the sequence.
    const c = seq.count();
    expect(c).toEqual(count);
  });

  it('returns correct count when predicate is provided', () => {
    // If a predicate is provided, count() returns the number of items in the
    // sequence that satisfy the predicate condition. In the condition below,
    // we expect the count to be one half of the total items.
    const c = seq.count((n) => n % 2 === 0);
    expect(c).toEqual(count / 2);
  });
});
//#endregion

//#region elementAt
describe('elementAt() tests', () => {
  it('throws when index < 0', () => {
    const seq = Sequence.range(0, 10);
    expect(() => {
      seq.elementAt(-1);
    }).toThrow();
  });
  it('throws when index >= sequence count', () => {
    const seq = Sequence.range(0, 10);
    expect(() => {
      seq.elementAt(100);
    }).toThrow();
  });
  it('returns item when index is valid', () => {
    const item = Sequence.range(0, 10).elementAt(4);
    expect(item).toEqual(4);
  });
});
//#endregion

//#region elementAtOrDefault
describe('elementAtOrDefault() tests', () => {
  const DEFAULT_NUMBER = 0;
  const DEFAULT_BOOLEAN = false;
  const DEFAULT_STRING = null;
  const DEFAULT_OBJECT = null;
  describe('numeric values', () => {
    const seq = Sequence.range(10, 10);
    it('returns default value when index is out of range', () => {
      const item = seq.elementAtOrDefault(DEFAULT_NUMBER, -1);
      expect(item).toEqual(DEFAULT_NUMBER);
    });
    it('returns item when index is in range', () => {
      const item = seq.elementAtOrDefault(DEFAULT_NUMBER, 1);
      expect(item).toEqual(11);
    });
  });
  describe('string values', () => {
    const seq = from(['foo', 'bar', 'baz']);
    it('returns default value when index is out of range', () => {
      const item = seq.elementAtOrDefault(DEFAULT_STRING, -1);
      expect(item).toBeNull;
    });
    it('returns item when index is in range', () => {
      const item = seq.elementAtOrDefault(DEFAULT_STRING, 1);
      expect(item).not.toBeNull();
      expect(item).toEqual('bar');
    });
  });
  describe('boolean values', () => {
    const seq = from([false, true, true, false, true, false]);
    it('returns default value when index is out of range', () => {
      const item = seq.elementAtOrDefault(DEFAULT_BOOLEAN, -1);
      expect(item).toEqual(DEFAULT_BOOLEAN);
    });
    it('returns item when index is in range', () => {
      const item = seq.elementAtOrDefault(DEFAULT_BOOLEAN, 1);
      expect(item).toEqual(true);
    });
  });
  describe('complex values', () => {
    const seq = from(data);
    it('returns default value when index is out of range', () => {
      const item = seq.elementAtOrDefault(DEFAULT_OBJECT, -1);
      expect(item).toEqual(DEFAULT_OBJECT);
    });
    it('returns item when index is in range', () => {
      const item = seq.elementAtOrDefault(DEFAULT_OBJECT, 1);
      const firstItem = data[1];
      expect(item).not.toBeNull();
      expect(item).toEqual(firstItem);
    });
  });
});
//#endregion

//#region empty
describe('empty() tests', () => {
  const emptySet = Sequence.empty<number>();
  it('set is not null', () => {
    expect(emptySet).not.toBeNull;
  });
  it('set contains no items', () => {
    const count = emptySet.count();
    expect(count).toEqual(0);
  });
});
//#endregion

//#region first
describe('first() tests', () => {
  it('throws if sequence is empty', () => {
    expect(() => from([]).first()).toThrow();
  });
  it('returns first element in populated sequence when no predicate is provided', () => {
    const received = from([1, 2, 3]).first();
    expect(received).toEqual(1);
  });
  it('throws when no elements in sequence satisfy predicate condition', () => {
    expect(() => from([1, 2, 3]).first((n) => n === 5)).toThrow();
  });
  it('returns first item that matches predicate condition', () => {
    const received = from([17, 5, 50, 87, 2]).first((n) => n % 50 === 0);
    expect(received).toEqual(50);
  });
});
//#endregion

//#region firstOrDefault
describe('firstOrDefault() tests', () => {
  describe('boolean values', () => {
    it('returns default value when index is out of range', () => {
      const item = new Sequence<boolean>([]).firstOrDefault(false);
      expect(item).toBeFalsy();
    });
    it('returns item when index is in range', () => {
      const item = new Sequence([true, false]).firstOrDefault(false);
      expect(item).toBeTruthy();
    });
  });
  describe('complex values', () => {
    it('returns default when index is out of range', () => {
      const item = new Sequence<dataRecord>([]).firstOrDefault(null);
      expect(item).toBeNull();
    });
    it('returns item when index is in range', () => {
      const seq = from(data);
      const item = seq.firstOrDefault(null);
      const first = seq.elementAt(0);
      expect(item).not.toBeNull();
      expect(item).toEqual(first);
    });
  });
  describe('numeric values', () => {
    it('returns default when index is out of range', () => {
      const item = new Sequence<number>([]).firstOrDefault(0);
      expect(item).toEqual(0);
    });
    it('returns value when index is in range', () => {
      const item = new Sequence<number>([5, 24, -13]).firstOrDefault(0);
      expect(item).toEqual(5);
    });
  });
  describe('string values', () => {
    it('returns default when index is out of range', () => {
      const item = new Sequence<string>([]).firstOrDefault(null);
      expect(item).toBeNull();
    });
    it('returns value when index is in range', () => {
      const arr: string[] = ['foo', 'bar', 'baz'];
      const item = new Sequence<string>(arr).firstOrDefault(null);
      expect(item).not.toBeNull();
      expect(item).toEqual('foo');
    });
  });
});
//#endregion

//#region select
describe('select() tests', () => {
  it('returns non-empty set', () => {
    const count = from(data)
      .select((d) => {
        d.address, d.email, d.name, d.phone;
      })
      .toArray().length;
    expect(count).not.toEqual(0);
  });

  it('selects contact information', () => {
    const arr = from(data)
      .select((d) => ({
        address: d.address,
        email: d.email,
        name: d.name,
        phone: d.phone,
      }))
      .toArray();

    let allMatch = true;
    for (let i = 0; i < arr.length; i++) {
      const e = arr[i];
      const hasProps =
        e.hasOwnProperty('address') &&
        e.hasOwnProperty('email') &&
        e.hasOwnProperty('name') &&
        e.hasOwnProperty('phone');

      if (!hasProps) {
        allMatch = false;
        break;
      }
    }

    expect(allMatch).toBeTruthy;
  });

  it('selects and includes element index', () => {
    const arr = from(data)
      .select((d, i) => ({
        index: i,
        name: d.name,
      }))
      .toArray();

    let allMatch = true;
    for (let i = 0; i < arr.length; i++) {
      const e: number = arr[i]['index'];
      if (e != i) {
        allMatch = false;
        break;
      }
    }
    expect(allMatch).toBeTruthy;
  });
});
//#endregion

//#region single
describe('single', () => {
  it('throws if sequence is empty and no predicate is provided', () => {
    expect(() => {
      from([]).single();
    }).toThrow('Invalid operation exception: sequence is empty.');
  });
  it('throws if sequence is empty and predicate is provided', () => {
    const seq = new Sequence<number>([]);
    expect(() => {
      seq.single((n) => n === 5);
    }).toThrow('Invalid operation exception: sequence is empty.');
  });
  it('throws if sequence contains multiple elements and no predicate is provided', () => {
    const seq = from([1, 2, 3, 4, 5]);
    expect(() => {
      seq.single();
    }).toThrow(
      'Invalid operation exception: sequence contains multiple elements.',
    );
  });
  it('returns element if sequence contains single element and no predicate is provided', () => {
    expect(from([150]).single()).toEqual(150);
  });
  it('throws if sequence is not empty and no elements satisfy predicate condition', () => {
    expect(() => {
      from([1, 2, 3, 4, 5]).single((n) => n === 10);
    }).toThrow(
      'Invalid operation exception: no items match predicate condition.',
    );
  });
  it('throws if sequence is not empty and multiple elements satisfy predicate condition', () => {
    expect(() => {
      from([1, 2, 3, 4, 5]).single((n) => n % 2 === 0);
    }).toThrow(
      'Invalid operation exception: multiple items match predicate condition.',
    );
  });
  it('returns element if sequence is not empty and single element satisfies predicate condition', () => {
    expect(from([1, 2, 3, 4, 5]).single((n) => n === 3)).toEqual(3);
  });
});
//#endregion

//#region skip
describe('skip() tests', () => {
  it('returns all items if count < array size', () => {
    const expected = 100;
    const received = Sequence.range(0, 100).skip(-1).count();
    expect(received).toEqual(expected);
  });
  it('returns all items if count === 0', () => {
    const expected = 100;
    const received = Sequence.range(0, 100).skip(0).count();
    expect(received).toEqual(expected);
  });
  it('returns empty if count > array size', () => {
    const expected = 0;
    const received = Sequence.range(0, 100).skip(120).count();
    expect(received).toEqual(expected);
  });
  it('returns set if count === array size', () => {
    const expected = 0;
    const received = Sequence.range(0, 100).skip(100).count();
    expect(received).toEqual(expected);
  });
  it('returns set if count < array size', () => {
    const data = Sequence.range(0, 100);
    const subset = data.skip(50);
    const expected = 50;
    const received = subset.count();
    expect(received).toEqual(expected);
  });
});
//#endregion

//#region skipWhile
describe('skipWhile() tests', () => {
  let seq: Sequence<number>;
  beforeEach(() => (seq = Sequence.range(0, 100)));
  it('throws if predicate is null', () => {
    expect(() => seq.skipWhile(null)).toThrow();
  });
  it('throws if predicate is undefined', () => {
    expect(() => seq.skipWhile(undefined)).toThrow();
  });
  it('returns empty set if all items match predicate condition', () => {
    const skipCount = seq.skipWhile((n) => n < 500).count();
    expect(skipCount).toEqual(0);
  });
  it('returns subset if some items match predicate condition', () => {
    const received = seq.skipWhile((n) => n < 90).toArray();
    const expected = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99];
    expect(received).toEqual(expected);
  });
  it('returns all items if no items match predicate condition', () => {
    const received = seq.skipWhile((n) => n > 100).toArray();
    const expected = Sequence.range(0, 100).toArray();
    expect(received).toEqual(expected);
  });
});
//#endregion

//#region take
describe('take() tests', () => {
  it('returns empty set when count is < 0', () => {
    const count = Sequence.range(0, 100).take(-1).count();
    expect(count).toEqual(0);
  });
  it('returns entire set when count is > sequence length', () => {
    const count = Sequence.range(0, 100).take(10000).count();
    expect(count).toEqual(100);
  });
  it('returns correct count when count is > 0 and < sequence length', () => {
    const count = Sequence.range(0, 100).take(5).count();
    expect(count).toEqual(5);
  });
  it('returns correct data when count is > 0 and < sequence length', () => {
    const expected = [0, 1, 2, 3, 4];
    const actual = Sequence.range(0, 10).take(5).toArray();
    expect(actual).toEqual(expected);
  });
});
//#endregion

//#region takeWhile
describe('takeWhile() tests', () => {
  const seq = Sequence.range(-50, 100);
  it('throws if predicate is null', () => {
    expect(() => seq.takeWhile(null)).toThrow();
  });
  it('returns correct count with when some items satisfy predicate condition', () => {
    const subset = seq.takeWhile((e) => e < 0);
    const count = subset.count();
    expect(count).toEqual(50);
  });
  it('returns correct data when some items satisfy predicate condition', () => {
    const subset = seq.takeWhile((e) => e < 0).toArray();
    const expected = seq.toArray().slice(0, 50);
    expect(subset).toEqual(expected);
  });
  it('returns empty set when no items satisfy predicate condition', () => {
    const subset = seq.takeWhile((e) => e > 100);
    const count = subset.count();
    expect(count).toEqual(0);
  });
});
//#endregion

//#region toArray
describe('toArray() tests', () => {
  const arr = [1, 2, 3, 4, 5];
  const copy = from(arr).toArray();

  it('returns non-null array instance', () => {
    expect(copy).not.toBeNull;
  });

  it('gets a copy of the original array', () => {
    expect(copy).not.toBe(arr);
  });

  it('gets array equal in size to original array', () => {
    expect(copy.length).toEqual(arr.length);
  });

  it('gets values equal to original values', () => {
    // toEqual walks all values recursively and compares them.
    expect(copy).toEqual(arr);
  });
});
//#endregion

//#region where
describe('where() tests', () => {
  const seq = Sequence.range(0, 5);

  const evens = seq.toArray().filter((n) => n % 2 === 0);
  const odds = seq.toArray().filter((n) => n % 2 !== 0);

  it('throws if predicate is undefined', () => {
    expect(() => seq.where(undefined)).toThrow();
  });

  it('throws if predicate is null', () => {
    expect(() => seq.where(null)).toThrow();
  });

  it('selects all even values', () => {
    const localEvens = seq.where((n) => n % 2 === 0).toArray();
    expect(localEvens).toEqual(evens);
  });

  it('selects all odd values', () => {
    const localOdds = seq.where((n) => n % 2 !== 0).toArray();
    expect(localOdds).toEqual(odds);
  });
});
//#endregion
