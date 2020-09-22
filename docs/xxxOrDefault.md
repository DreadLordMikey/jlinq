# JLinq and -OrDefault() Methods

In .NET, `FirstOrDefault`, `ElementOrDefault`, `LastOrDefault`, and `SingleOrDefault` share the same pattern in their method signatures and behavior. For example,

<dl>
  <dt><code>T FirstOrDefault&lt;T&gt;()</code></dt>
  <dd>Returns the first element in the sequence if there is one; otherwise, returns the default value for <code>T</code>.</dd>
  <dt><code>T FirstOrDefault&lt;T&gt;(Func&lt;T, bool&gt; predicate)</code></dt>
  <dd>Returns the first element in the sequence that satisfies the provided predicate condition if there is one; otherwise, returns the default value for <code>T</code>.
</dl>

At build time, .NET classes are compiled in such a way that generic type information is preserved in the assembly metadata.
This allows code at runtime to determine the type of any `Array<T>`, `List<T>`, or even `IEnumerable<T>` using reflection.

## TypeScript versus .NET

JLinq is written in TypeScript. When the TypeScript code is transpiled down to ECMAScript, all type information is lost in a form of "type erasure." This is because ECMAScript does not have any notion of metadata that remotely resembles that present in .NET.

Since there is no queryable metadata available at runtime, neither JLinq nor its consumers can reliably query the `Sequence<T>`; for the type of the items that should be stored in and returned from it at runtime.

## How This is a Problem
For the methods we're discussing, we need to determine the value to return if the requested element does not exist in a sequence. This can happen because:

1. No elements in the sequence satisfy the predicate condition -OR-
1. All elements in the sequence are `null` or `undefined` -OR-
1. The sequence is empty -OR-

For scenario 1, our problem is easily solved: return the default value for the type stored in the first non-null element. But what if there are no non-null elements? In the real world, an array containing nothing but `null` or `undefined` elements is perfectly plausible. What do we do then?

And then there's Scenario 3. What if the array is empty (that is, contains `0` elements)?

Scenarios 2 and 3 are effectively the same for our problem's purposes: There is insufficient data from which to derive a default value to return to the caller.

We could return `null`, but that is not what the user is expecting. If the user declared a `Sequence<number>`, `FirstOrDefault` should return `0` and for a `Sequence<boolean>` it should return `false`.

## The Solution

The only feasible and idiomatic ECMAScript solution is to have the caller provide us with a default value to use. This is, of course, a deviation from the .NET implementation. However, working code trumps strict adherence to the .NET implementation.

Once this was decided, parameter order became an issue. It seemed natural to me to put the default value in the last position. Forexample:

``` js
const DEFAULT_VALUE: number = 0;
const item = from([1, 2, 3]).firstOrDefault((e) => e % 3 == 0, DEFAULT_VALUE);
```

However, the predicate is an optional parameter, based on the overloads. If we follow best practices for API design, the default value must come first:


``` js
const DEFAULT_VALUE: number = 0;
const item1 = from([1, 2, 3]).firstOrDefault(DEFAULT_VALUE);
const item2 = from([1, 2, 3]).firstOrDefault(DEFAULT_VALUE, (e) => e % 3 == 0);
```

This satisfies the best practices guidelines, and provides a consistent calling order for all four methods.

An additional benefit of this is that the caller now has the ability to specify a custom default value. For example, assume that `seq`, below, is a `Sequence` containing Date objects:

``` javascript
const DEFAULT_DATE = new Date(1990, 00, 01, 00, 00, 00);
let item = seq.firstOrDefault(DEFAULT_DATE);
```

## Conclusion

The JLinq implementation of `ElementAtOrDefault`, `FirstOrDefault`, `LastOrDefault` and `SingleOrDefault` deviates from the .NET implementation due to the fact that type information is not available at runtime. To account for this, callers must provide a default value to return if either (a) the sequence is empty or (b) no elements satisfy the provided predicate condition. The default value must always be provided, and is always the first argument in the method call.
