[jlinq](../README.md) › [Globals](../globals.md) › [ISequence](isequence.md)

# Interface: ISequence ‹**T**›

## Type parameters

▪ **T**

## Hierarchy

* **ISequence**

## Implemented by

* [Sequence](../classes/sequence.md)

## Index

### Methods

* [all](isequence.md#all)
* [any](isequence.md#any)
* [append](isequence.md#append)
* [concat](isequence.md#concat)
* [count](isequence.md#count)
* [elementAt](isequence.md#elementat)
* [elementAtOrDefault](isequence.md#elementatordefault)
* [select](isequence.md#select)
* [skip](isequence.md#skip)
* [skipWhile](isequence.md#skipwhile)
* [take](isequence.md#take)
* [takeWhile](isequence.md#takewhile)
* [where](isequence.md#where)

## Methods

###  all

▸ **all**(`predicate`: [Predicate](../globals.md#predicate)‹T›): *boolean*

*Defined in [interfaces.ts:31](https://github.com/DreadLordMikey/jlinq/blob/ce1e563/src/interfaces.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`predicate` | [Predicate](../globals.md#predicate)‹T› |

**Returns:** *boolean*

___

###  any

▸ **any**(): *boolean*

*Defined in [interfaces.ts:33](https://github.com/DreadLordMikey/jlinq/blob/ce1e563/src/interfaces.ts#L33)*

**Returns:** *boolean*

▸ **any**(`predicate`: [Predicate](../globals.md#predicate)‹T›): *boolean*

*Defined in [interfaces.ts:34](https://github.com/DreadLordMikey/jlinq/blob/ce1e563/src/interfaces.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`predicate` | [Predicate](../globals.md#predicate)‹T› |

**Returns:** *boolean*

___

###  append

▸ **append**(`element`: T): *[ISequence](isequence.md)‹T›*

*Defined in [interfaces.ts:36](https://github.com/DreadLordMikey/jlinq/blob/ce1e563/src/interfaces.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`element` | T |

**Returns:** *[ISequence](isequence.md)‹T›*

___

###  concat

▸ **concat**(`items`: T[]): *[ISequence](isequence.md)‹T›*

*Defined in [interfaces.ts:38](https://github.com/DreadLordMikey/jlinq/blob/ce1e563/src/interfaces.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`items` | T[] |

**Returns:** *[ISequence](isequence.md)‹T›*

▸ **concat**(`items`: [ISequence](isequence.md)‹T›): *[ISequence](isequence.md)‹T›*

*Defined in [interfaces.ts:39](https://github.com/DreadLordMikey/jlinq/blob/ce1e563/src/interfaces.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`items` | [ISequence](isequence.md)‹T› |

**Returns:** *[ISequence](isequence.md)‹T›*

___

###  count

▸ **count**(): *number*

*Defined in [interfaces.ts:41](https://github.com/DreadLordMikey/jlinq/blob/ce1e563/src/interfaces.ts#L41)*

**Returns:** *number*

▸ **count**(`predicate`: [Predicate](../globals.md#predicate)‹T›): *number*

*Defined in [interfaces.ts:42](https://github.com/DreadLordMikey/jlinq/blob/ce1e563/src/interfaces.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`predicate` | [Predicate](../globals.md#predicate)‹T› |

**Returns:** *number*

___

###  elementAt

▸ **elementAt**(`index`: number): *T*

*Defined in [interfaces.ts:44](https://github.com/DreadLordMikey/jlinq/blob/ce1e563/src/interfaces.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *T*

___

###  elementAtOrDefault

▸ **elementAtOrDefault**(`index`: number): *T*

*Defined in [interfaces.ts:45](https://github.com/DreadLordMikey/jlinq/blob/ce1e563/src/interfaces.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *T*

___

###  select

▸ **select**‹**TReturn**›(`selector`: [Selector](../globals.md#selector)‹T, TReturn›): *any*

*Defined in [interfaces.ts:47](https://github.com/DreadLordMikey/jlinq/blob/ce1e563/src/interfaces.ts#L47)*

**Type parameters:**

▪ **TReturn**

**Parameters:**

Name | Type |
------ | ------ |
`selector` | [Selector](../globals.md#selector)‹T, TReturn› |

**Returns:** *any*

___

###  skip

▸ **skip**(`count`: number): *[ISequence](isequence.md)‹T›*

*Defined in [interfaces.ts:49](https://github.com/DreadLordMikey/jlinq/blob/ce1e563/src/interfaces.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`count` | number |

**Returns:** *[ISequence](isequence.md)‹T›*

___

###  skipWhile

▸ **skipWhile**(`predicate`: [Predicate](../globals.md#predicate)‹T›): *[ISequence](isequence.md)‹T›*

*Defined in [interfaces.ts:50](https://github.com/DreadLordMikey/jlinq/blob/ce1e563/src/interfaces.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`predicate` | [Predicate](../globals.md#predicate)‹T› |

**Returns:** *[ISequence](isequence.md)‹T›*

___

###  take

▸ **take**(`count`: number): *[ISequence](isequence.md)‹T›*

*Defined in [interfaces.ts:52](https://github.com/DreadLordMikey/jlinq/blob/ce1e563/src/interfaces.ts#L52)*

**Parameters:**

Name | Type |
------ | ------ |
`count` | number |

**Returns:** *[ISequence](isequence.md)‹T›*

___

###  takeWhile

▸ **takeWhile**(`predicate`: [Predicate](../globals.md#predicate)‹T›): *[ISequence](isequence.md)‹T›*

*Defined in [interfaces.ts:53](https://github.com/DreadLordMikey/jlinq/blob/ce1e563/src/interfaces.ts#L53)*

**Parameters:**

Name | Type |
------ | ------ |
`predicate` | [Predicate](../globals.md#predicate)‹T› |

**Returns:** *[ISequence](isequence.md)‹T›*

___

###  where

▸ **where**(`predicate`: [Predicate](../globals.md#predicate)‹T›): *[ISequence](isequence.md)‹T›*

*Defined in [interfaces.ts:55](https://github.com/DreadLordMikey/jlinq/blob/ce1e563/src/interfaces.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`predicate` | [Predicate](../globals.md#predicate)‹T› |

**Returns:** *[ISequence](isequence.md)‹T›*
