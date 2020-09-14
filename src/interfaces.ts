/**
 * A function provided to a standard query operator to determine whether or
 * not an item in a sequence should be included in the results.
 *
 * A predicate receives, as its sole argument, the current item in the array.
 * The predicate returns true if the item should be included in the results;
 * otherwise, it returns false.
 */
export interface IPredicate<T> {
  (source: T, index?: number): boolean;
}

export interface ISequence<T> {
  all(predicate: IPredicate<T>): boolean;

  any(): boolean;
  any(predicate: IPredicate<T>): boolean;

  count(): number;
  count(predicate: IPredicate<T>): number;

  where(predicate: IPredicate<T>): ISequence<T>;
}
