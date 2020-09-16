// LINQ Interfaces

export type Action = () => void;

//#region Predicate
/**
 * A function used to test whether or not an element in a sequence satisfies a
 * condition.
 * @param {T} source The current element in the sequence.
 * @param {number} index The index of `source` in the sequence.
 * @returns {booelan} `true` if `source` satisfies the predicate condition;
 * otherwise, `false`.
 */
export type Predicate<T> = (source: T, index?: number) => boolean;
//#endregion

//#region Selector
/**
 * A function used to project an element in a sequence from one form into another.
 *
 * @param {TSource} source The current element in the sequence.
 * @param {number} index The index of `source` in the sequence.
 * @returns {TReturn} A new object representing the transformed data.
 */
export type Selector<TSource, TReturn> = (
  source: TSource,
  index: number,
) => TReturn;
//#endregion
