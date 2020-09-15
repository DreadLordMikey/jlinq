// LINQ Interfaces

//#region Predicate
/**
 * A function provided to a standard query operator to determine whether or
 * not an item in a sequence should be included in the results.
 *
 * A predicate receives, as its sole argument, the current item in the array.
 * The predicate returns true if the item should be included in the results;
 * otherwise, it returns false.
 */
export type Predicate<T> = (source: T, index?: number) => boolean;
//#endregion

//#region Selector
/**
 * A function provided to a standard query operator to project an element of a
 * sequence from one form to another.
 *
 * The first argument to this function is the current element in the sequence.
 *
 * The second argument to this function is the index of the current element in
 * the sequence.
 *
 * @param source {TSource} The current element in the sequence.
 * @param index {number} Optional. The index of the current element in the
 * sequence.
 *
 * @returns {TReturn} A new object representing the transformed data.
 */
export type Selector<TSource, TReturn> = (
  source: TSource,
  index: number
) => TReturn;
//#endregion

//#region ISequence
export interface ISequence<T> {
  all(predicate: Predicate<T>): boolean;

  any(): boolean;
  any(predicate: Predicate<T>): boolean;

  append(element: T): ISequence<T>;

  concat(items: T[]): ISequence<T>;
  concat(items: ISequence<T>): ISequence<T>;

  count(): number;
  count(predicate: Predicate<T>): number;

  elementAt(index: number): T;
  elementAtOrDefault(index: number): T;

  select<TReturn>(selector: Selector<T, TReturn>): any;

  skip(count: number): ISequence<T>;

  take(count: number): ISequence<T>;
  takeWhile(predicate: Predicate<T>): ISequence<T>;

  where(predicate: Predicate<T>): ISequence<T>;
}
//#endregion
