[jlinq](../README.md) › [Globals](../globals.md) › [Sequence](sequence.md)

# Class: Sequence ‹**T**›

## Type parameters

▪ **T**

## Hierarchy

* **Sequence**

## Implements

* [ISequence](../interfaces/isequence.md)‹T›

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
* [getDefaultConstructionOptions](sequence.md#private-getdefaultconstructionoptions)
* [select](sequence.md#select)
* [toArray](sequence.md#toarray)
* [toString](sequence.md#tostring)
* [where](sequence.md#where)
* [empty](sequence.md#static-empty)
* [range](sequence.md#static-range)

## Constructors

###  constructor

\+ **new Sequence**(`data`: Array‹T›, `options?`: [SequenceConstructionOptions](../globals.md#sequenceconstructionoptions)): *[Sequence](sequence.md)*

*Defined in [Sequence.ts:21](https://github.com/DreadLordMikey/jlinq/blob/938cb3d/src/Sequence.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Array‹T› |
`options?` | [SequenceConstructionOptions](../globals.md#sequenceconstructionoptions) |

**Returns:** *[Sequence](sequence.md)*

## Properties

###  data

• **data**: *Array‹T›*

*Defined in [Sequence.ts:21](https://github.com/DreadLordMikey/jlinq/blob/938cb3d/src/Sequence.ts#L21)*

## Methods

###  all

▸ **all**(`predicate`: [Predicate](../globals.md#predicate)‹T›): *boolean*

*Implementation of [ISequence](../interfaces/isequence.md)*

*Defined in [Sequence.ts:43](https://github.com/DreadLordMikey/jlinq/blob/938cb3d/src/Sequence.ts#L43)*

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

*Implementation of [ISequence](../interfaces/isequence.md)*

*Defined in [Sequence.ts:53](https://github.com/DreadLordMikey/jlinq/blob/938cb3d/src/Sequence.ts#L53)*

Determines if any elements exist in the sequence.

**Returns:** *boolean*

true if any elements exist in the sequence; otherwise, false.

▸ **any**(`predicate?`: [Predicate](../globals.md#predicate)‹T›): *boolean*

*Implementation of [ISequence](../interfaces/isequence.md)*

*Defined in [Sequence.ts:58](https://github.com/DreadLordMikey/jlinq/blob/938cb3d/src/Sequence.ts#L58)*

Determines if any elements exist in the sequence that satisfy a condition.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`predicate?` | [Predicate](../globals.md#predicate)‹T› | A function to test each element for a condition.  |

**Returns:** *boolean*

___

###  append

▸ **append**(`element`: T): *[Sequence](sequence.md)‹T›*

*Implementation of [ISequence](../interfaces/isequence.md)*

*Defined in [Sequence.ts:75](https://github.com/DreadLordMikey/jlinq/blob/938cb3d/src/Sequence.ts#L75)*

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

*Implementation of [ISequence](../interfaces/isequence.md)*

*Defined in [Sequence.ts:87](https://github.com/DreadLordMikey/jlinq/blob/938cb3d/src/Sequence.ts#L87)*

Concatenates two sequences.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`items` | T[] | The sequence to concatenate to this sequence. |

**Returns:** *[Sequence](sequence.md)‹T›*

A Sequence&lt;T&gt; An that contains the concatenated
elements of the two input sequences.

▸ **concat**(`items`: [ISequence](../interfaces/isequence.md)‹T›): *[Sequence](sequence.md)‹T›*

*Implementation of [ISequence](../interfaces/isequence.md)*

*Defined in [Sequence.ts:94](https://github.com/DreadLordMikey/jlinq/blob/938cb3d/src/Sequence.ts#L94)*

Concatenates two sequences.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`items` | [ISequence](../interfaces/isequence.md)‹T› | The sequence to concatenate to this sequence. |

**Returns:** *[Sequence](sequence.md)‹T›*

A Sequence&lt;T&gt; An that contains the concatenated
elements of the two input sequences.

___

###  count

▸ **count**(): *number*

*Implementation of [ISequence](../interfaces/isequence.md)*

*Defined in [Sequence.ts:110](https://github.com/DreadLordMikey/jlinq/blob/938cb3d/src/Sequence.ts#L110)*

Returns the number of elements in a sequence.

**Returns:** *number*

The total number of elements in the sequence.

▸ **count**(`predicate`: [Predicate](../globals.md#predicate)‹T›): *number*

*Implementation of [ISequence](../interfaces/isequence.md)*

*Defined in [Sequence.ts:118](https://github.com/DreadLordMikey/jlinq/blob/938cb3d/src/Sequence.ts#L118)*

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

*Implementation of [ISequence](../interfaces/isequence.md)*

*Defined in [Sequence.ts:134](https://github.com/DreadLordMikey/jlinq/blob/938cb3d/src/Sequence.ts#L134)*

Returns the element at a specified index in a sequence.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`index` | number | The zero-based index of the element to retrieve. |

**Returns:** *T*

The element at the specfied index in the sequence.

___

###  elementAtOrDefault

▸ **elementAtOrDefault**(`index`: number): *T*

*Implementation of [ISequence](../interfaces/isequence.md)*

*Defined in [Sequence.ts:151](https://github.com/DreadLordMikey/jlinq/blob/938cb3d/src/Sequence.ts#L151)*

Returns the element at a specified index in a sequence or a default value
if the index is out of range.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`index` | number | The zero-based index of the element to retrieve. |

**Returns:** *T*

default {T} if the index is outside the bounds of the source
sequence; otherwise, the element at the specified position in the source
sequence.

___

### `Private` getDefaultConstructionOptions

▸ **getDefaultConstructionOptions**(): *object*

*Defined in [Sequence.ts:269](https://github.com/DreadLordMikey/jlinq/blob/938cb3d/src/Sequence.ts#L269)*

**Returns:** *object*

* **directStore**: *boolean* = false

___

###  select

▸ **select**‹**TReturn**›(`selector`: [Selector](../globals.md#selector)‹T, TReturn›): *[Sequence](sequence.md)‹TReturn›*

*Implementation of [ISequence](../interfaces/isequence.md)*

*Defined in [Sequence.ts:220](https://github.com/DreadLordMikey/jlinq/blob/938cb3d/src/Sequence.ts#L220)*

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

###  toArray

▸ **toArray**(): *Array‹T›*

*Defined in [Sequence.ts:254](https://github.com/DreadLordMikey/jlinq/blob/938cb3d/src/Sequence.ts#L254)*

Copies the elements of the List<T> to a new array.

**Returns:** *Array‹T›*

An array containing copies of the elements of the Sequence<T>.

___

###  toString

▸ **toString**(): *string*

*Defined in [Sequence.ts:264](https://github.com/DreadLordMikey/jlinq/blob/938cb3d/src/Sequence.ts#L264)*

Returns a string that represents the current object.

**Returns:** *string*

A string that represents the current object.

___

###  where

▸ **where**(`predicate`: [Predicate](../globals.md#predicate)‹T›): *[Sequence](sequence.md)‹T›*

*Implementation of [ISequence](../interfaces/isequence.md)*

*Defined in [Sequence.ts:239](https://github.com/DreadLordMikey/jlinq/blob/938cb3d/src/Sequence.ts#L239)*

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

*Defined in [Sequence.ts:187](https://github.com/DreadLordMikey/jlinq/blob/938cb3d/src/Sequence.ts#L187)*

Returns an empty Sequence&lt;T&gt; that has the specified type argument.

**Type parameters:**

▪ **TReturn**

**Returns:** *[Sequence](sequence.md)‹TReturn›*

An empty Sequence&lt;&gt; whose type argument is {TReturn}.

___

### `Static` range

▸ **range**(`start`: number, `count`: number): *[Sequence](sequence.md)‹number›*

*Defined in [Sequence.ts:200](https://github.com/DreadLordMikey/jlinq/blob/938cb3d/src/Sequence.ts#L200)*

Generates a sequence of integral numbers within a specified range.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`start` | number | The value of the first integer in the sequence. |
`count` | number | The number of sequential integers to generate. |

**Returns:** *[Sequence](sequence.md)‹number›*

An Sequence<T> that contains a range of sequential integral
numbers.
