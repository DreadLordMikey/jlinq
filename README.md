# JSLINQ

JSLINQ is a personal project attempting to implement Microsoft's [Language Integrated Query (LINQ)](https://docs.microsoft.com/en-us/dotnet/standard/linq/) in [TypeScript](https://www.typescriptlang.org/docs/).

## Running the Tests

Unit tests for JSLINQ are created using [jest](https://jestjs.io/). To run them, open a terminal or command prompt and run the following

```
npm test
```

## Running the Demo App

JSLINQ ships with a demo script that demonstrates the usage of each method of Sequence&lt;T&gt;. To run this demo script, open a terminal window or command prompt and run the following:

```
npx ts-node main.ts
```

## A Word or Two on the Design Goals

The primary goal of this project is to provide as complete and accurate an implementation of LINQ as possible using idiomatic TypeScript and ES6.

However, the following are worth noting, in no particular order:

- Wherever possible, idiomatic TypeScript and ES6 are used.
- Due to intrinsic differences between .NET and TypeScript/ES6, there will be differences between the way that certain methods will be implemented in JSLINQ. A one-to-one parity between the .NET implementation and JSLINQ is not possible. This is particularly apparent in method signatures.
- While professional standards of development are being applied to this repo, this project is not intended to produce a production-ready library. It is solely for learning purposes.
- Certain features in LINQ (such as deferred execution) likely cannot be implemented as Microsoft has documented them. Therefore, they are beyond the scope of this project.

The methods implemented in the Sequence&lt;T&gt; class are known as the _Standard Query Operators_. The documentation for their expected behavior was provided by Microsoft in May, 2006. The document containing these specifications is located in the docs folder of this repository, and serves as the primary requirements document for this project.

The initial implementation does not provide support for asynchronous operations; future releases may do so.

## Currently Supported Operators

- `all(predicate: Predicate<T>) : boolean`: Determines whether all elements of a sequence satisfy a condition.
- `any() => boolean`: Determines if any elements exist in the sequence.
- `any<T>(predicate: Predicate<T>) => boolean`: Determines if any elements exist in the sequence that satisfy the predicate condition.
- `append<T>(source: T) => Sequence<T>`: Appends a value to the end of the sequence.
- `concat(items: T[] | Sequence<T>) => Sequence<T>`: Concatenates two sequences.
- `count() => number`: Gets the total number of items in the sequence.
- `count(predicate: Predicate<T>) => number`: Gets the total number of items in the sequence that satisfy the povided predicate condition.
- `elementAt(index: number): T`: Returns the element at a specified index in a sequence.
- `elementAtOrDefault(index: number): T` Returns the element at a specified index in a sequence or a default value if the index is out of range.
- `empty(): Sequence<T>`: Returns an empty Sequence&lt;T&gt; that has the specified type argument.
- `range(start: number, count:number) => Sequence<T>` Generates a sequence of integral numbers within a specified range.
- `select<TReturn>(selector: Selector<T, TReturn>): Sequence<TReturn>`: Projects each element of a sequence into a new form.
- `where(predicate: Predicate<T>) => Sequence<T>` Filters a sequence of values based on a predicate.
- `toArray() => Array<T>`: Creates an Array&lt;T&gt; from the sequence.
- `toString() => string`: Gets the JSON string representation of the sequence.
