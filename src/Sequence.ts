import { Predicate, ISequence, Selector } from "./interfaces";

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
  constructor(data: Array<T>) {
    if (typeof data === "undefined" || data === null) {
      throw "Object construction exception: The argument to the constructor of Sequence<T> cannot be null or undefined.";
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
  concat(items: ISequence<T>): Sequence<T>;
  concat(items: any): Sequence<T> {
    if (Array.isArray(items)) {
      return new Sequence<T>(this.data.concat(items));
    } else {
      return new Sequence<T>(this.data.concat(items.toArray()));
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

  //#region elementAtOrDefault
  /**
   * Returns the element at a specified index in a sequence or a default value
   * if the index is out of range.
   * @param {number} index The zero-based index of the element to retrieve.
   * @returns {T} default {T} if the index is outside the bounds of the source
   * sequence; otherwise, the element at the specified position in the source
   * sequence.
   */
  elementAtOrDefault(index: number): T {
    if (index < 0 || index >= this.data.length) {
      // This is the tricky part. Generics are not available at runtime. So how
      // do we get a default value for the provided generic type?
      //
      // Since the index is out of range, we can assume there are elements in
      // the array. We retrieve the first one and inspect its type. From that,
      // we can infer the types of all elements in the array, and return a
      // suitable default value.
      //
      // For all reference types, the default value is null. For numerics, it is
      // 0; for booleans it is false.
      var t = typeof this.data[0];
      switch (t) {
        case "bigint":
          return <T>(<unknown>0);
        case "boolean":
          return <T>(<unknown>false);
        case "number":
          return <T>(<unknown>0);
        default:
          return <T>(<unknown>null);
      }
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
      throw "Argument null or undefined: predicate";
    }
    var firstNonMatchingIndex = this.data.findIndex(
      (v: T, i: number) => !predicate(v, i)
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
   * @returns {Sequence} A Sequence&lt;T&gt; that contains the elements from
   * this sequence that occur before the element at which the test no longer
   * passes.
   */
  takeWhile(predicate: Predicate<T>): Sequence<T> {
    // Get the index of the first element to return false;
    let index = this.data.findIndex((e, i) => !predicate(e, i));
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
    if (predicate === null || typeof predicate === "undefined") {
      throw 'Object null or undefined: predicate is required when calling "where".';
    }

    let items = this.data.filter(predicate);
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
