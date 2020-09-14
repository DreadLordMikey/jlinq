"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sequence = exports.from = void 0;
//#region from
/**
 * Gets a Sequence&lt;T&gt; from an array.
 * @param arr {Array<T>} The source array. An exception is thrown if arr is
 * null or undefined.
 * @returns {Sequence<T>} A Sequence&lt;T&gt; containing a copy of the source array.
 */
function from(arr) {
    return new Sequence(arr);
}
exports.from = from;
//#endregion
class Sequence {
    //#region Constructor
    constructor(data) {
        if (typeof data === "undefined" || data === null) {
            throw "Object construction exception: The argument to the constructor of Sequence<T> cannot be null or undefined.";
        }
        this.data = [...data];
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
    all(predicate) {
        return this.data.every(predicate);
    }
    any(predicate) {
        if (predicate) {
            let index = this.data.findIndex(predicate);
            return index > -1;
        }
        else {
            return this.data.length > 0;
        }
    }
    count(predicate) {
        if (predicate) {
            return this.data.filter(predicate).length;
        }
        else {
            return this.data.length;
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
    static range(start, count) {
        let arr = new Array(count);
        let value = start;
        for (let i = 0; i < count; i++) {
            arr[i] = value;
            value++;
        }
        return new Sequence(arr);
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
    select(selector) {
        let data = this.data.map(selector);
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
    where(predicate) {
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
    toArray() {
        return [...this.data];
    }
    //#endregion
    //#region toString
    /**
     * Returns a string that represents the current object.
     * @returns A string that represents the current object.
     */
    toString() {
        return JSON.stringify(this.data);
    }
}
exports.Sequence = Sequence;
//# sourceMappingURL=Sequence.js.map