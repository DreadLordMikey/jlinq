[jlinq](README.md) › [Globals](globals.md)

# jlinq

# JLINQ

JLINQ is a personal project attempting to implement Microsoft's [Language Integrated Query (LINQ)](https://docs.microsoft.com/en-us/dotnet/standard/linq/) in [TypeScript](https://www.typescriptlang.org/docs/).

* [Code of Conduct](CODE_OF_CONDUCT.md)
* [License](LICENSE)

## Running the Tests

Unit tests for JLINQ are created using [jest](https://jestjs.io/). To run them, open a terminal or command prompt and run the following

```
npm test
```

## Running the Demo App

JLINQ ships with a demo script that demonstrates the usage of each method of Sequence&lt;T&gt;. To run this demo script, open a terminal window or command prompt and run the following:

```
npx ts-node main.ts
```

## A Word or Two on the Design Goals

The primary goal of this project is to provide as complete and accurate an implementation of LINQ as possible using idiomatic TypeScript and ES6.

However, the following are worth noting, in no particular order:

- Wherever possible, idiomatic TypeScript and ES6 are used.
- Due to intrinsic differences between .NET and TypeScript/ES6, there will be differences between the way that certain methods will be implemented in JLINQ. A one-to-one parity between the .NET implementation and JLINQ is not possible. This is particularly apparent in method signatures.
- While professional standards of development are being applied to this repo, this project is not intended to produce a production-ready library. It is solely for learning purposes.
- Certain features in LINQ (such as deferred execution) likely cannot be implemented as Microsoft has documented them. Therefore, they are beyond the scope of this project.

The methods implemented in the Sequence&lt;T&gt; class are known as the _Standard Query Operators_. The documentation for their expected behavior was provided by Microsoft in May, 2006. The document containing these specifications is located in the docs folder of this repository, and serves as the primary requirements document for this project.

The initial implementation does not provide support for asynchronous operations; future releases may do so.

[JLinq and -OrDefault Methods](xxxOrDefault.md)

## API Reference

For complete documentation on this API, see [docs/README.md](docs/README.md).
