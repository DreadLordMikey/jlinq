"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sequence = void 0;
class Sequence {
    constructor(data) {
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
    any(predicate) {
        if (predicate) {
            var index = this.data.findIndex(predicate);
            return index > -1;
        }
        else {
            return this.data.length > 0;
        }
    }
}
exports.Sequence = Sequence;
//# sourceMappingURL=Sequence.js.map