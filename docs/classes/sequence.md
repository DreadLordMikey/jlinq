[jlinq](../README.md) › [Globals](../globals.md) › [Sequence](sequence.md)

# Class: Sequence ‹**T**›

## Type parameters

▪ **T**

## Hierarchy

* **Sequence**

## Index

### Constructors

* [constructor](sequence.md#constructor)

### Properties

* [data](sequence.md#data)

### Methods

* [all](sequence.md#all)
* [any](sequence.md#any)
* [append](sequence.md#append)
* [concat](sequence.md#concat)
* [count](sequence.md#count)
* [elementAt](sequence.md#elementat)
* [elementAtOrDefault](sequence.md#elementatordefault)
* [first](sequence.md#first)
* [firstOrDefault](sequence.md#firstordefault)
* [select](sequence.md#select)
* [single](sequence.md#single)
* [skip](sequence.md#skip)
* [skipWhile](sequence.md#skipwhile)
* [take](sequence.md#take)
* [takeWhile](sequence.md#takewhile)
* [toArray](sequence.md#toarray)
* [toString](sequence.md#tostring)
* [where](sequence.md#where)
* [empty](sequence.md#static-empty)
* [range](sequence.md#static-range)

## Constructors

###  constructor

\+ **new Sequence**(`data`: Array‹T›): *[Sequence](sequence.md)*

*Defined in [Sequence.ts:17](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Array‹T› |

**Returns:** *[Sequence](sequence.md)*

## Properties

###  data

• **data**: *Array‹T›*

*Defined in [Sequence.ts:17](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L17)*

## Methods

###  all

▸ **all**(`predicate`: [Predicate](../globals.md#predicate)‹T›): *boolean*

*Defined in [Sequence.ts:36](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L36)*

Determines whether all elements of a sequence satisfy a condition.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`predicate` | [Predicate](../globals.md#predicate)‹T› | A function to test each element for a condition. |

**Returns:** *boolean*

true if every element in the sequence satisfies the
predicate condition; otherwise, false.

___

###  any

▸ **any**(): *boolean*

*Defined in [Sequence.ts:46](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L46)*

Determines if any elements exist in the sequence.

**Returns:** *boolean*

true if any elements exist in the sequence; otherwise, false.

▸ **any**(`predicate?`: [Predicate](../globals.md#predicate)‹T›): *boolean*

*Defined in [Sequence.ts:51](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L51)*

Determines if any elements exist in the sequence that satisfy a condition.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`predicate?` | [Predicate](../globals.md#predicate)‹T› | A function to test each element for a condition.  |

**Returns:** *boolean*

___

###  append

▸ **append**(`element`: T): *[Sequence](sequence.md)‹T›*

*Defined in [Sequence.ts:68](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L68)*

Appends a value to the end of the sequence.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`element` | T | The value to append to the sequence. |

**Returns:** *[Sequence](sequence.md)‹T›*

A new sequence that ends with element.

___

###  concat

▸ **concat**(`items`: T[]): *[Sequence](sequence.md)‹T›*

*Defined in [Sequence.ts:80](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L80)*

Concatenates two sequences.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`items` | T[] | The sequence to concatenate to this sequence. |

**Returns:** *[Sequence](sequence.md)‹T›*

A Sequence&lt;T&gt; An that contains the concatenated
elements of the two input sequences.

▸ **concat**(`items`: [Sequence](sequence.md)‹T›): *[Sequence](sequence.md)‹T›*

*Defined in [Sequence.ts:87](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L87)*

Concatenates two sequences.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`items` | [Sequence](sequence.md)‹T› | The sequence to concatenate to this sequence. |

**Returns:** *[Sequence](sequence.md)‹T›*

A Sequence&lt;T&gt; An that contains the concatenated
elements of the two input sequences.

___

###  count

▸ **count**(): *number*

*Defined in [Sequence.ts:102](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L102)*

Returns the number of elements in a sequence.

**Returns:** *number*

The total number of elements in the sequence.

▸ **count**(`predicate`: [Predicate](../globals.md#predicate)‹T›): *number*

*Defined in [Sequence.ts:110](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L110)*

Returns a number that represents how many elements in the sequence
satisfy a condition.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`predicate` | [Predicate](../globals.md#predicate)‹T› | A function to test each element for a condition. |

**Returns:** *number*

A number that represents how many elements in the sequence
satisfy the condition in the predicate function.

___

###  elementAt

▸ **elementAt**(`index`: number): *T*

*Defined in [Sequence.ts:126](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L126)*

Returns the element at a specified index in a sequence.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`index` | number | The zero-based index of the element to retrieve. |

**Returns:** *T*

The element at the specfied index in the sequence.

___

###  elementAtOrDefault

▸ **elementAtOrDefault**(`defaultValue`: T, `index`: number): *T*

*Defined in [Sequence.ts:145](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L145)*

Returns the element at a specified index in a sequence or a default value
if the index is out of range.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`defaultValue` | T | The value to return if there are no elements in the sequence or if the specified element does not exist. |
`index` | number | The zero-based index of the element to retrieve. |

**Returns:** *T*

defaultValue if the index is outside the bounds of the source
sequence; otherwise, the element at the specified position in the source
sequence.

___

###  first

▸ **first**(): *T*

*Defined in [Sequence.ts:172](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L172)*

Gets the first item in a sequence.

**`throws`** An exception is thrown if the sequence is empty.

**Returns:** *T*

The first element in the sequence.

▸ **first**(`predicate`: [Predicate](../globals.md#predicate)‹T›): *T*

*Defined in [Sequence.ts:181](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L181)*

Gets the first item in the sequence that satisfies a condition.

**`throws`** An exception is thrown if the sequence is empty or if no
elements in the sequence satisfy the predicate condition.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`predicate` | [Predicate](../globals.md#predicate)‹T› | A function to test for a condition. |

**Returns:** *T*

The first element in the sequence that satisfies the
predicate condition.

___

###  firstOrDefault

▸ **firstOrDefault**(`defaultValue`: T): *T*

*Defined in [Sequence.ts:210](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L210)*

Gets the first element in the sequence, or a default value if there are no
elements in the sequence.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`defaultValue` | T | The value to return if there are no elements in the sequence. |

**Returns:** *T*

The first element in the sequence if one exists; otherwise,
`defaultValue` is returned.

▸ **firstOrDefault**(`defaultValue`: T, `predicate`: [Predicate](../globals.md#predicate)‹T›): *T*

*Defined in [Sequence.ts:221](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L221)*

Gets the first element in the sequence that satisfies a condition, or a
default value if no elements satisfy the condition.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`defaultValue` | T | The value to return if either there are no elements in the sequence or there are no elements in the sequence that satisfy the predicate condition. |
`predicate` | [Predicate](../globals.md#predicate)‹T› | A function to test each element for a condition. |

**Returns:** *T*

The first element in the sequence that satisfies the predicate
condition; otherwise, `defaultValue` is returned.

___

###  select

▸ **select**‹**TReturn**›(`selector`: [Selector](../globals.md#selector)‹T, TReturn›): *[Sequence](sequence.md)‹TReturn›*

*Defined in [Sequence.ts:270](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L270)*

Projects each element of a sequence into a new form.

**Type parameters:**

▪ **TReturn**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`selector` | [Selector](../globals.md#selector)‹T, TReturn› | A transform function to apply to each source element; the second parameter of the function represents the index of the source element. |

**Returns:** *[Sequence](sequence.md)‹TReturn›*

A new sequence containing the transformed
data.

___

###  single

▸ **single**(): *T*

*Defined in [Sequence.ts:285](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L285)*

Gets the single element from this sequence.

**`throws`** An exception is thrown if either the sequence is empty or the
sequence contains more than one element.

**Returns:** *T*

T The single element in this sequence.

▸ **single**(`predicate`: [Predicate](../globals.md#predicate)‹T›): *T*

*Defined in [Sequence.ts:300](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L300)*

Gets the single element from this sequence that satisfies the provided
predicate condition.

**`throws`** An exception is thrown if either the sequence is empty or if
multiple elements satisfy the provided predicate condition.

**Parameters:**

Name | Type |
------ | ------ |
`predicate` | [Predicate](../globals.md#predicate)‹T› |

**Returns:** *T*

T The single element in this sequence that satisfies the
provided predicate condition.

___

###  skip

▸ **skip**(`count`: number): *[Sequence](sequence.md)‹T›*

*Defined in [Sequence.ts:335](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L335)*

Bypasses a specified number of elements in a sequence and then returns the remaining elements.

**`remarks`** If count is less than or equal to zero, all elements in the source sequence are
returned. If count is greater than the number of elements in the sequence, an empty sequence
is returned.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`count` | number | The number of elements to skip. |

**Returns:** *[Sequence](sequence.md)‹T›*

A Sequence&lt;T&gt; that contains the elements that occur after the specified index
in this sequence.

___

###  skipWhile

▸ **skipWhile**(`predicate`: [Predicate](../globals.md#predicate)‹T›): *[Sequence](sequence.md)‹T›*

*Defined in [Sequence.ts:371](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L371)*

Bypasses elements in a sequence as long as a specified condition is true
and then returns the remaining elements.

**`remarks`** This method tests each element of the source sequence by using
`predicate` and skips the element if the result is `true`. After the
predicate returns `false` for an element, that element and the remaining
elements in `source` are yielded, and there are no more invocations of
`predicate`.

If `predicate` returns `true` for all elements in a sequence, an empty
sequence is returned.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`predicate` | [Predicate](../globals.md#predicate)‹T› | A function to test each element for a condition. |

**Returns:** *[Sequence](sequence.md)‹T›*

A sequence that contains the elements from the input
sequence starting at the first element in the linear series that does not
pass the test specified by `predicate`.

___

###  take

▸ **take**(`count`: number): *[Sequence](sequence.md)‹T›*

*Defined in [Sequence.ts:396](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L396)*

Returns a specified number of contiguous elements from the start of a sequence.

**`description`** If count is less than zero, take returns an empty sequence. If count
is greater than the number of items in the sequence, take returns all items in
the sequence. Otherwise, take returns the specfied number of items from the
sequence, starting at index 0.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`count` | number | The number of elements to return. |

**Returns:** *[Sequence](sequence.md)‹T›*

A Sequence that contains the specified number of elements
from the start of this sequence.

___

###  takeWhile

▸ **takeWhile**(`predicate`: [Predicate](../globals.md#predicate)‹T›): *[Sequence](sequence.md)‹T›*

*Defined in [Sequence.ts:429](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L429)*

Returns elements from a sequence as long as a specified condition is true,
and then skips the remaining elements.

**`remarks`** `takeWhile` uses `Array.prototype.findIndex` to retrieve the
index of the first element in the sequence that does not satisfy the
predicate condition.

If no elements satisfy this condition, the entire sequence is returned.
Otherwise, all elements up to and excluding that element are returned.
The order of the elements in the sequence is preserved.

**`throws`** An exception is thrown if `predicate` is `null` or `undefined`.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`predicate` | [Predicate](../globals.md#predicate)‹T› | A function to test each element for a condition. |

**Returns:** *[Sequence](sequence.md)‹T›*

A sequence that contains the elements from this
sequence that occur before the element at which the test no longer
passes.

___

###  toArray

▸ **toArray**(): *Array‹T›*

*Defined in [Sequence.ts:443](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L443)*

Copies the elements of the List<T> to a new array.

**Returns:** *Array‹T›*

An array containing copies of the elements of the Sequence<T>.

___

###  toString

▸ **toString**(): *string*

*Defined in [Sequence.ts:453](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L453)*

Returns a string that represents the current object.

**Returns:** *string*

A string that represents the current object.

___

###  where

▸ **where**(`predicate`: [Predicate](../globals.md#predicate)‹T›): *[Sequence](sequence.md)‹T›*

*Defined in [Sequence.ts:471](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L471)*

Filters a sequence of values based on a predicate.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`predicate` | [Predicate](../globals.md#predicate)‹T› | A function to test each source element for a condition.  The first argument to the predicate is the current item in the sequence.  The second argument to the predicate is the index of the item in the sequence.  |

**Returns:** *[Sequence](sequence.md)‹T›*

A Sequence<T> containing the rows that satisfy the predicate
condition.

___

### `Static` empty

▸ **empty**‹**TReturn**›(): *[Sequence](sequence.md)‹TReturn›*

*Defined in [Sequence.ts:161](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L161)*

Returns an empty Sequence&lt;T&gt; that has the specified type argument.

**Type parameters:**

▪ **TReturn**

**Returns:** *[Sequence](sequence.md)‹TReturn›*

An empty Sequence&lt;&gt; whose type argument is {TReturn}.

___

### `Static` range

▸ **range**(`start`: number, `count`: number): *[Sequence](sequence.md)‹number›*

*Defined in [Sequence.ts:250](https://github.com/DreadLordMikey/jlinq/blob/3114c0a/src/Sequence.ts#L250)*

Generates a sequence of integral numbers within a specified range.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`start` | number | The value of the first integer in the sequence. |
`count` | number | The number of sequential integers to generate. |

**Returns:** *[Sequence](sequence.md)‹number›*

An Sequence<T> that contains a range of sequential integral
numbers.
