import { IPredicate, ISequence } from "./interfaces";

/**
 * Gets a Sequence&lt;T&gt; from an array.
 * @param arr {Array<T>} The source array. An exception is thrown if arr is
 * null or undefined.
 * @returns {Sequence<T>} A Sequence&lt;T&gt; containing a copy of the source array.
 */
export function from<T>(arr: Array<T>): Sequence<T> {
    return new Sequence<T>(arr);
}

export class Sequence<T> implements ISequence<T> {
  data: Array<T>;

  constructor(data: Array<T>) {
    if (typeof data === "undefined" || data === null) {
      throw "Object construction exception: The argument to the constructor of Sequence<T> cannot be null or undefined.";
    }
    this.data = [...data];
  }

  /**
   * Determines if any elements exist in the sequence.
   * @returns true if any elements exist in the sequence; otherwise, false.
   */
  any(): boolean;
  /**
   * Determines if any elements exist in the sequence that satisfy a condition.
   * @param predicate A function to test each element for a condition.
   */
  any(predicate?: IPredicate<T>): boolean;
  any(predicate?: any): boolean {
    if (predicate) {
      let index = this.data.findIndex(predicate);
      return index > -1;
    } else {
      return this.data.length > 0;
    }
  }

  /**
   * Returns the number of elements in a sequence.
   * @returns The total number of elements in the sequence.
   */
  count(): number;
  /**
   * Returns a number that represents how many elements in the sequence
   * satisfy a condition.
   * @param predicate A function to test each element for a condition.
   * @returns A number that represents how many elements in the sequence
   * satisfy the condition in the predicate function.
   */
  count(predicate: IPredicate<T>): number;
  count(predicate?: any) {
    if (predicate) {
      return this.data.filter(predicate).length;
    } else {
      return this.data.length;
    }
  }

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
  where(predicate: IPredicate<T>): Sequence<T> {
    if (predicate === null || typeof predicate === "undefined") {
      throw 'Object null or undefined: predicate is required when calling "where".';
    }

    let items = this.data.filter(predicate);
    return new Sequence([...items]);
  }

  /**
   * Copies the elements of the List<T> to a new array.
   * @returns An array containing copies of the elements of the Sequence<T>.
   */
  toArray(): Array<T> {
    return [...this.data];
  }

  /**
   * Returns a string that represents the current object.
   * @returns A string that represents the current object.
   */
  toString(): string {
    return JSON.stringify(this.data);
  }
}
