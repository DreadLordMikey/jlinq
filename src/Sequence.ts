import { Predicate, Selector } from './interfaces';

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
export class Sequence<T> {
  data: Array<T>;

  //#region Constructor
  constructor(data: Array<T>) {
    if (typeof data === 'undefined' || data === null) {
      throw 'Object construction exception: The argument to the constructor of Sequence<T> cannot be null or undefined.';
    }
    this.data = data;
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
  any(predicate?: unknown): boolean {
    if (predicate) {
      const index = this.data.findIndex(<Predicate<T>>predicate);
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
    return new Sequence<T>(this.data.concat([element]));
  }
  //#endregion

  //#region concat
  /**
   * Concatenates two sequences.
   * @param {T[]} items The sequence to concatenate to this sequence.
   * @returns {Sequence} A Sequence&lt;T&gt; An that contains the concatenated
   * elements of the two input sequences.
   */
  concat(items: T[]): Sequence<T>;
  /**
   * Concatenates two sequences.
   * @param {Sequence<T>} items The sequence to concatenate to this sequence.
   * @returns {Sequence} A Sequence&lt;T&gt; An that contains the concatenated
   * elements of the two input sequences.
   */
  concat(items: Sequence<T>): Sequence<T>;
  concat(items: unknown): Sequence<T> {
    if (Array.isArray(items)) {
      return new Sequence<T>(this.data.concat(items));
    } else {
      return new Sequence<T>(this.data.concat((<Sequence<T>>items).toArray()));
    }
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
  count(predicate?: unknown): number {
    if (predicate) {
      return this.data.filter(<Predicate<T>>predicate).length;
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
      throw 'Index out of range exception: index is less than 0 or greater than or equal to the number of elements in the sequence.';
    }
    return this.data[index];
  }
  //#endregion

  //#region elementAtOrDefault
  /**
   * Returns the element at a specified index in a sequence or a default value
   * if the index is out of range.
   * @param {T} defaultValue The value to return if there are no elements in
   * the sequence or if the specified element does not exist.
   * @param {number} index The zero-based index of the element to retrieve.
   * @returns defaultValue if the index is outside the bounds of the source
   * sequence; otherwise, the element at the specified position in the source
   * sequence.
   */
  elementAtOrDefault(defaultValue: T, index: number): T {
    if (index < 0 || index >= this.data.length) {
      return defaultValue;
    }
    return this.data[index];
  }
  //#endregion

  //#region empty
  /**
   * Returns an empty Sequence&lt;T&gt; that has the specified type argument.
   * @param {TReturn} TReturn The type to assign to the type parameter of the
   * returned generic Sequence&lt;T&gt;
   * @returns An empty Sequence whose type argument is `TReturn`.
   * @template TReturn
   */
  static empty<TReturn>(): Sequence<TReturn> {
    return from(new Array<TReturn>());
  }
  //#endregion

  //#region first
  /**
   * Gets the first item in a sequence.
   * @returns {T} The first element in the sequence.
   * @throws An exception is thrown if the sequence is empty.
   */
  first(): T;
  /**
   * Gets the first item in the sequence that satisfies a condition.
   * @param {Predicate} predicate A function to test for a condition.
   * @returns {T} The first element in the sequence that satisfies the
   * predicate condition.
   * @throws An exception is thrown if the sequence is empty or if no
   * elements in the sequence satisfy the predicate condition.
   */
  first(predicate: Predicate<T>): T;
  first(predicate?: unknown): T {
    if (this.data.length === 0) {
      throw 'Invalid operation: sequence is empty.';
    }

    if (!predicate) {
      return this.data[0];
    } else {
      const index: number = this.data.findIndex((e, i) =>
        (<Predicate<T>>predicate)(e, i),
      );
      if (index === -1) {
        throw 'Invalid operation: no elements satisfy predicate condition.';
      }
      return this.data[index];
    }
  }
  //#endregion

  //#region firstOrDefault
  /**
   * Gets the first element in the sequence, or a default value if there are no
   * elements in the sequence.
   * @param {T} defaultValue The value to return if there are no elements in the
   * sequence.
   * @returns {T} The first element in the sequence if one exists; otherwise,
   * `defaultValue` is returned.
   */
  firstOrDefault(defaultValue: T): T;
  /**
   * Gets the first element in the sequence that satisfies a condition, or a
   * default value if no elements satisfy the condition.
   * @param {T} defaultValue The value to return if either there are no elements
   * in the sequence or there are no elements in the sequence that satisfy the
   * predicate condition.
   * @param {Predicate} predicate A function to test each element for a condition.
   * @returns The first element in the sequence that satisfies the predicate
   * condition; otherwise, `defaultValue` is returned.
   */
  firstOrDefault(defaultValue: T, predicate: Predicate<T>): T;
  firstOrDefault(defaultValue: T, predicate?: unknown): T {
    if (this.data.length === 0) {
      return defaultValue;
    }

    if (!predicate) {
      return this.data[0];
    } else {
      const index = this.data.findIndex((e, i) =>
        (<Predicate<T>>predicate)(e, i),
      );
      if (index === -1) {
        return defaultValue;
      } else {
        return this.data[index];
      }
    }
  }
  //#endregion

  //#region last
  /**
   * Gets the last element from a sequence.
   * @throws An exception is thrown if the sequence is empty.
   * @returns The last element in the sequence.
   */
  last(): T;
  /**
   * Gets the last element in a sequence that satisfies the provided predicate
   * condition.
   * @param {Predicate} predicate A function to test each element for a
   * condition.
   * @throws An exception is thrown if:
   * - The sequence is empty OR
   * - No elements in the sequence satisfy the predicate condition.
   * @returns {T} The last element in the sequence that satisfies the predicate
   * condition.
   */
  last(predicate: Predicate<T>): T;
  last(predicate?: unknown): T {
    if (this.data.length === 0) {
      throw 'Invalid operation exception: sequence is empty.';
    }

    if (!predicate) {
      return this.data[this.data.length - 1];
    } else {
      for (let i = this.data.length - 1; i >= 0; i--) {
        const e = this.data[i];
        if ((<Predicate<T>>predicate)(e, i)) {
          return e;
        }
      }
      throw 'Invalid operation exception: no elements satisfy predicate condition.';
    }
  }
  //#endregion

  //#region lastOrDefault
  /**
   * Gets the last element from a sequence, or a default value if the sequence
   * contains no elements.
   * @param {T} defaultValue The value to return if the sequence is empty.
   * @returns {T} The last element in the sequence, or `defaultValue` if the sequence contains no elements.
   */
  lastOrDefault(defaultValue: T): T;
  /** */
  lastOrDefault(defaultValue: T, predicate: Predicate<T>): T;
  lastOrDefault(defaultValue: T, predicate?: unknown): T {
    if (this.data.length === 0) {
      return defaultValue;
    }

    if (!predicate) {
      return this.data[this.data.length - 1];
    } else {
      for (let i = this.data.length - 1; i >= 0; i--) {
        const e = this.data[i];
        if ((<Predicate<T>>predicate)(e, i)) {
          return e;
        }
      }
      return defaultValue;
    }
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
    const arr = new Array<number>(count);
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
    const data: Array<TReturn> = this.data.map(selector);
    return from(data);
  }
  //#endregion

  //#region single
  /**
   * Gets the single element from this sequence.
   *
   * @throws An exception is thrown if either the sequence is empty or the
   * sequence contains more than one element.
   * @type T
   * @returns T The single element in this sequence.
   */
  single(): T;
  /**
   * Gets the single element from this sequence that satisfies the provided
   * predicate condition.
   *
   * @param Predicate<T> predicate A function to test each element for a
   * condition.
   *
   * @throws An exception is thrown if either the sequence is empty or if
   * multiple elements satisfy the provided predicate condition.
   *
   * @type T
   * @returns T The single element in this sequence that satisfies the
   * provided predicate condition.
   */
  single(predicate: Predicate<T>): T;
  single(predicate?: unknown): T {
    if (this.data.length === 0) {
      throw 'Invalid operation exception: sequence is empty.';
    }

    if (!predicate) {
      if (this.data.length > 1) {
        throw 'Invalid operation exception: sequence contains multiple elements.';
      } else {
        return this.data[0];
      }
    } else {
      const items = this.data.filter((e, i) => (<Predicate<T>>predicate)(e, i));
      if (items.length === 0) {
        throw 'Invalid operation exception: no items match predicate condition.';
      } else if (items.length > 1) {
        throw 'Invalid operation exception: multiple items match predicate condition.';
      } else {
        return items[0];
      }
    }
  }
  //#endregion

  //#region singleOrDefault
  /**
   * Gets the sole element from this sequence, or a default value if no such element
   * exists.
   *
   * @param T defaultValue The value to return if the sequence is empty.
   * @throws An exception is thrown if the sequence contains multiple items.
   * @returns The single element from this sequence. If the sequence is empty,
   * `defaultValue` is returned.
   */
  singleOrDefault(defaultValue: T): T;
  /**
   * Gets the sole element from this sequence that satisfies the provided predicate
   * condition, or a default value if no such element exists.
   *
   * @param T defaultValue The value to return if either the sequence is empty or if
   * no elements in the sequence satisfy the predicate condition.
   * @param Predicate predicate A function test each element in the sequence for a
   * condition.
   * @throws An exception is thrown if multiple elements in the sequence satisfy the
   * predicate condition.
   * @returns The sole element in the sequence that satisfies the predicate condition.
   * If no elements satisfy the predicate condition, `defaultValue` is returned.
   */
  singleOrDefault(defaultValue: T, predicate: Predicate<T>): T;
  singleOrDefault(defaultValue: T, predicate?: unknown): T {
    if (!predicate) {
      if (this.data.length === 1) {
        return this.data[0];
      } else if (this.data.length === 0) {
        return defaultValue;
      } else {
        throw 'Invalid operation exception: sequence is empty.';
      }
    } else {
      const matches = this.data.filter((e, i) =>
        (<Predicate<T>>predicate)(e, i),
      );

      if (matches.length === 1) {
        return matches[0];
      } else if (matches.length === 0) {
        return defaultValue;
      } else {
        throw 'Invalid oepration exception: multiple elements in sequence satisfy predicate condition.';
      }
    }
  }
  //#endregion

  //#region skip
  /**
   * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
   * @param {number} count The number of elements to skip.
   * @returns A Sequence&lt;T&gt; that contains the elements that occur after the specified index
   * in this sequence.
   * @remarks If count is less than or equal to zero, all elements in the source sequence are
   * returned. If count is greater than the number of elements in the sequence, an empty sequence
   * is returned.
   */
  skip(count: number): Sequence<T> {
    // If count is less than or equal to zero, return all elements.
    if (count <= 0) {
      return new Sequence<T>(this.data);
    }

    // If count is greater than the number of items in the array,
    // return an empty sequence.
    if (count > this.data.length) {
      return new Sequence<T>([]);
    }

    // Otherwise, get all items starting at the index specified by count to the
    // end of the array.
    return new Sequence<T>(this.data.splice(count));
  }
  //#endregion

  //#region skipWhile
  /**
   * Bypasses elements in a sequence as long as a specified condition is true
   * and then returns the remaining elements.
   * @param {Predicate} predicate A function to test each element for a
   * condition.
   * @returns {Sequence} A sequence that contains the elements from the input
   * sequence starting at the first element in the linear series that does not
   * pass the test specified by `predicate`.
   * @remarks This method tests each element of the source sequence by using
   * `predicate` and skips the element if the result is `true`. After the
   * predicate returns `false` for an element, that element and the remaining
   * elements in `source` are yielded, and there are no more invocations of
   * `predicate`.
   *
   * If `predicate` returns `true` for all elements in a sequence, an empty
   * sequence is returned.
   */
  skipWhile(predicate: Predicate<T>): Sequence<T> {
    if (!predicate) {
      throw 'Argument null or undefined: predicate';
    }
    const firstNonMatchingIndex = this.data.findIndex(
      (v: T, i: number) => !predicate(v, i),
    );
    if (firstNonMatchingIndex === -1) {
      return new Sequence<T>([]);
    }
    return new Sequence<T>(this.data.slice(firstNonMatchingIndex));
  }
  //#endregion

  //#region take
  /**
   * Returns a specified number of contiguous elements from the start of a sequence.
   * @param {number} count The number of elements to return.
   * @returns {Sequence} A Sequence that contains the specified number of elements
   * from the start of this sequence.
   * @description If count is less than zero, take returns an empty sequence. If count
   * is greater than the number of items in the sequence, take returns all items in
   * the sequence. Otherwise, take returns the specfied number of items from the
   * sequence, starting at index 0.
   */
  take(count: number): Sequence<T> {
    // If the count is less than 0, return an empty sequence.
    if (count < 0) return new Sequence<T>(new Array<T>());

    // If the count is greater than the number of items in the sequence,
    // return the entire sequence.
    if (count > this.data.length) return new Sequence<T>(this.data);

    // If the count is greater than zero, and less than the number of
    // items in the sequence, return the specified number of items from
    // the sequence, beginning at index 0.
    return new Sequence<T>(this.data.slice(0, count));
  }
  //#endregion

  //#region takeWhile
  /**
   * Returns elements from a sequence as long as a specified condition is true,
   * and then skips the remaining elements.
   * @param {Predicate} predicate A function to test each element for a
   * condition.
   * @returns {Sequence} A sequence that contains the elements from this
   * sequence that occur before the element at which the test no longer
   * passes.
   * @remarks `takeWhile` uses `Array.prototype.findIndex` to retrieve the
   * index of the first element in the sequence that does not satisfy the
   * predicate condition.
   *
   * If no elements satisfy this condition, the entire sequence is returned.
   * Otherwise, all elements up to and excluding that element are returned.
   * The order of the elements in the sequence is preserved.
   * @throws An exception is thrown if `predicate` is `null` or `undefined`.
   */
  takeWhile(predicate: Predicate<T>): Sequence<T> {
    if (!predicate) {
      throw 'Argument null or undefined: predicate';
    }
    const index = this.data.findIndex((e, i) => !predicate(e, i));
    return this.take(index);
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
    return JSON.stringify(this.data, null, 2);
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
    if (predicate === null || typeof predicate === 'undefined') {
      throw 'Object null or undefined: predicate is required when calling "where".';
    }

    const items = this.data.filter(predicate);
    return new Sequence([...items]);
  }
  //#endregion

  //#region getDefaultConstructionOptions
  private getDefaultConstructionOptions() {
    return {
      directStore: false,
    };
  }
  //#endregion
}
