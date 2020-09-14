import { Predicate, ISequence, Selector } from "./interfaces";

type SequenceConstructionOptions = {
  directStore: boolean;
};

//#region from
/**
 * Gets a Sequence&lt;T&gt; from an array.
 * @param arr {Array<T>} The source array. An exception is thrown if arr is
 * null or undefined.
 * @returns {Sequence<T>} A Sequence&lt;T&gt; containing a copy of the source array.
 */
export function from<T>(arr: Array<T>): Sequence<T> {
  return new Sequence<T>(arr);
}
//#endregion

/** @template T */
export class Sequence<T> implements ISequence<T> {
  data: Array<T>;

  //#region Constructor
  constructor(data: Array<T>, options?: SequenceConstructionOptions) {
    if (typeof data === "undefined" || data === null) {
      throw "Object construction exception: The argument to the constructor of Sequence<T> cannot be null or undefined.";
    }

    options = options ?? this.getDefaultConstructionOptions();

    this.data = options?.directStore ? data : [...data];
  }
  //#endregion

  //#region all
  /**
   * Determines whether all elements of a sequence satisfy a condition.
   * @param predicate {Predicate<T>} A function to test each element for a
   * condition.
   * @returns {boolean} true if every element in the sequence satisfies the
   * predicate condition; otherwise, false.
   */
  all(predicate: Predicate<T>): boolean {
    return this.data.every(predicate);
  }
  //#endregion

  //#region any
  /**
   * Determines if any elements exist in the sequence.
   * @returns true if any elements exist in the sequence; otherwise, false.
   */
  any(): boolean;
  /**
   * Determines if any elements exist in the sequence that satisfy a condition.
   * @param predicate A function to test each element for a condition.
   */
  any(predicate?: Predicate<T>): boolean;
  any(predicate?: any): boolean {
    if (predicate) {
      let index = this.data.findIndex(predicate);
      return index > -1;
    } else {
      return this.data.length > 0;
    }
  }
  //#endregion

  //#region append
  /**
   * Appends a value to the end of the sequence.
   * @param element The value to append to the sequence.
   * @returns {Sequence<T>} A new sequence that ends with element.
   */
  append(element: T): Sequence<T> {
    return new Sequence<T>(this.data.concat([element]), { directStore: true });
  }
  //#endregion

  //#region count
  /**
   * Returns the number of elements in a sequence.
   * @returns The total number of elements in the sequence.
   */
  count(): number;
  /**
   * Returns a number that represents how many elements in the sequence
   * satisfy a condition.
   * @param predicate {Predicate} A function to test each element for a condition.
   * @returns {number} A number that represents how many elements in the sequence
   * satisfy the condition in the predicate function.
   */
  count(predicate: Predicate<T>): number;
  count(predicate?: any) {
    if (predicate) {
      return this.data.filter(predicate).length;
    } else {
      return this.data.length;
    }
  }
  //#endregion

  //#region elementAt
  /**
   * Returns the element at a specified index in a sequence.
   * @param {number} index The zero-based index of the element to retrieve.
   * @returns The element at the specfied index in the sequence.
   */
  elementAt(index: number): T {
    if (index < 0 || index >= this.data.length) {
      throw "Index out of range exception: index is less than 0 or greater than or equal to the number of elements in the sequence.";
    }
    return this.data[index];
  }
  //#endregion

  //#region empty
  /**
   * Returns an empty Sequence&lt;T&gt; that has the specified type argument.
   * @param {TReturn} TReturn The type to assign to the type parameter of the
   * returned generic Sequence&lt;T&gt;
   * @returns {Sequence<T>} An empty Sequence&lt;&gt; whose type argument is {TReturn}.
   * @template TReturn
   */
  static empty<TReturn>(): Sequence<TReturn> {
    return from(new Array<TReturn>());
  }
  //#endregion

  //#region range
  /**
   * Generates a sequence of integral numbers within a specified range.
   * @param start The value of the first integer in the sequence.
   * @param count The number of sequential integers to generate.
   * @returns An Sequence<T> that contains a range of sequential integral
   * numbers.
   */
  static range(start: number, count: number): Sequence<number> {
    let arr = new Array<number>(count);
    let value = start;
    for (let i = 0; i < count; i++) {
      arr[i] = value;
      value++;
    }
    return new Sequence<number>(arr);
  }
  //#endregion

  //#region select
  /**
   * Projects each element of a sequence into a new form.
   * @param selector {Selector} A transform function to apply to each source
   * element; the second parameter of the function represents the index of the
   * source element.
   * @returns {Sequence<TReturn>} A new sequence containing the transformed
   * data.
   */
  select<TReturn>(selector: Selector<T, TReturn>): Sequence<TReturn> {
    let data: Array<TReturn> = this.data.map(selector);
    return from(data);
  }
  //#endregion

  //#region where
  /**
   * Filters a sequence of values based on a predicate.
   * @param predicate A function to test each source element for a condition.
   *
   * The first argument to the predicate is the current item in the sequence.
   *
   * The second argument to the predicate is the index of the item in the
   * sequence.
   *
   * @returns A Sequence<T> containing the rows that satisfy the predicate
   * condition.
   */
  where(predicate: Predicate<T>): Sequence<T> {
    if (predicate === null || typeof predicate === "undefined") {
      throw 'Object null or undefined: predicate is required when calling "where".';
    }

    let items = this.data.filter(predicate);
    return new Sequence([...items]);
  }
  //#endregion

  //#region toArray
  /**
   * Copies the elements of the List<T> to a new array.
   * @returns An array containing copies of the elements of the Sequence<T>.
   */
  toArray(): Array<T> {
    return [...this.data];
  }
  //#endregion

  //#region toString
  /**
   * Returns a string that represents the current object.
   * @returns A string that represents the current object.
   */
  toString(): string {
    return JSON.stringify(this.data);
  }
  //#endregion

  private getDefaultConstructionOptions() {
    return {
      directStore: false,
    };
  }
}
