# JSLINQ

JSLINQ is a personal project attempting to implement Microsoft's [Language Integrated Query (LINQ)](https://docs.microsoft.com/en-us/dotnet/standard/linq/) in [TypeScript](https://www.typescriptlang.org/docs/).

A couple of things to note:

1. Wherever possible, idiomatic TypeScript and ES6 are used.
1. While professional standards of development are being applied to this repo, this project is not intended to produce a production-ready library. It is solely for learning purposes.
1. Certain features in LINQ (such as deferred execution) likely cannot be implemented as Microsoft has documented them. Therefore, they are beyond the scope of this project.

This implementation wraps an array in a new class:  Sequence&lt;T&gt;, which contains all the LINQ operators that JLINQ implements.

The design goal is fairly straightforward. A user should be able to call JLINQ as follows:

```
new Sequence(myArray)
.Where(e => e.OrderSize > 50
  && e.State === 'FL')
.Select(e => new {
    e.FirstName,
    e.LastName,
    e.Address
  })
.OrderBy(e => e.LastName + e.FirstName)
.ToArray();
```
During construction, Sequence&lt;T&gt; creates a copy of the source array. The original array is never modified. From that point forward, operations like Where, FirstOrDefault, and Join return new Sequence&lt;T&gt; instances that contain subsets of the original data.

Better designs may emerge over time. I will consider them as they arise.