[jlinq](README.md) › [Globals](globals.md)

# jlinq

## Index

### Classes

* [Sequence](classes/sequence.md)

### Interfaces

* [ISequence](interfaces/isequence.md)

### Type aliases

* [Predicate](globals.md#predicate)
* [Selector](globals.md#selector)
* [dataRecord](globals.md#datarecord)

### Functions

* [from](globals.md#from)

## Type aliases

###  Predicate

Ƭ **Predicate**: *function*

*Defined in [interfaces.ts:12](https://github.com/DreadLordMikey/jlinq/blob/ce1e563/src/interfaces.ts#L12)*

A function used to test whether or not an element in a sequence satisfies a
condition.

**`param`** The current element in the sequence.

**`param`** The index of `source` in the sequence.

**`returns`** `true` if `source` satisfies the predicate condition;
otherwise, `false`.

#### Type declaration:

▸ (`source`: T, `index?`: undefined | number): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`source` | T |
`index?` | undefined &#124; number |

___

###  Selector

Ƭ **Selector**: *function*

*Defined in [interfaces.ts:23](https://github.com/DreadLordMikey/jlinq/blob/ce1e563/src/interfaces.ts#L23)*

A function used to project an element in a sequence from one form into another.

**`param`** The current element in the sequence.

**`param`** The index of `source` in the sequence.

**`returns`** A new object representing the transformed data.

#### Type declaration:

▸ (`source`: TSource, `index`: number): *TReturn*

**Parameters:**

Name | Type |
------ | ------ |
`source` | TSource |
`index` | number |

___

###  dataRecord

Ƭ **dataRecord**: *object*

*Defined in [data.ts:7](https://github.com/DreadLordMikey/jlinq/blob/ce1e563/src/data.ts#L7)*

**`interal`** 

#### Type declaration:

* **_id**: *string*

* **about**: *string*

* **address**: *string*

* **age**: *number*

* **balance**: *string*

* **company**: *string*

* **email**: *string*

* **eyeColor**: *string*

* **favoriteFruit**: *string*

* **friends**: *friendData[]*

* **gender**: *string*

* **greeting**: *string*

* **guid**: *string*

* **index**: *number*

* **isActive**: *boolean*

* **latitude**: *number*

* **longitude**: *number*

* **name**: *string*

* **phone**: *string*

* **picture**: *string*

* **registered**: *string*

* **tags**: *string[]*

## Functions

###  from

▸ **from**‹**T**›(`arr`: Array‹T›): *[Sequence](classes/sequence.md)‹T›*

*Defined in [Sequence.ts:10](https://github.com/DreadLordMikey/jlinq/blob/ce1e563/src/Sequence.ts#L10)*

Gets a Sequence&lt;T&gt; from an array.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`arr` | Array‹T› | The source array. An exception is thrown if arr is null or undefined. |

**Returns:** *[Sequence](classes/sequence.md)‹T›*

A Sequence&lt;T&gt; containing a copy of the source array.
