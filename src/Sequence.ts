import { IPredicate } from "./interfaces";

export class Sequence<T> {
  data: Array<T>;

  constructor(data: Array<T>) {
    if (typeof data === "undefined" || data === null) {
      throw "Object construction exception: The argument to the constructor of Sequence<T> cannot be null or undefined.";
    }
    this.data = [...data];
  }

  /**
   * Determines whether any element of a sequence exists or satisfies a condition.
   * @param predicate Optional.A function to test each element for a condition. This function
   * accepts the current item in the array as its sole argument and returns a boolean
   * value indicating whether or not the element satisifes the condition.
   * @returns true if any elements exist in the sequence or satisifes the provided
   * predicate condition; otherwise, false.
   */
  any(predicate?: IPredicate): boolean {
    if (predicate) {
      var index = this.data.findIndex(predicate);
      return index > -1;
    } else {
      return this.data.length > 0;
    }
  }

  /**
   * Copies the elements of the List<T> to a new array.
   * @returns An array containing copies of the elements of the Sequence<T>.
   */
  toArray(): Array<T> {
    return [...this.data];
  }
}
