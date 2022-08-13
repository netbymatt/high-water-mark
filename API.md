<a name="HighWaterMark"></a>

## HighWaterMark ⇐ <code>EventEmitter</code>
**Kind**: global class  
**Extends**: <code>EventEmitter</code>  

* [HighWaterMark](#HighWaterMark) ⇐ <code>EventEmitter</code>
    * [new HighWaterMark([options])](#new_HighWaterMark_new)
    * [.value](#HighWaterMark+value) ⇒ <code>number</code>
    * [.store(value)](#HighWaterMark+store)
    * [.reset()](#HighWaterMark+reset)
    * ["newHigh"](#HighWaterMark+event_newHigh) ⇒ <code>number</code>

<a name="new_HighWaterMark_new"></a>

### new HighWaterMark([options])
Track a high water mark by all-time, time interval or count


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> |  |  |
| [options.mode] | <code>string</code> | <code>&quot;all&quot;</code> | All time: 'all', Time limited: 'time', Count limited: 'count' |
| [options.invert] | <code>boolean</code> | <code>false</code> | When true tracks the low water mark instead of the high |
| [options.timeLimit] | <code>integer</code> | <code>60000</code> | When mode = 'time' the amount of time over which the high water mark is monitored (ms) |
| [options.countLimit] | <code>integer</code> | <code>10</code> | When mode = 'count' the number of items over which the high water mark is monitored |

<a name="HighWaterMark+value"></a>

### highWaterMark.value ⇒ <code>number</code>
Get the current high water mark

**Kind**: instance property of [<code>HighWaterMark</code>](#HighWaterMark)  
**Returns**: <code>number</code> - Value of high water mark  
**Read only**: true  
<a name="HighWaterMark+store"></a>

### highWaterMark.store(value)
Store a new value to the high water mark

**Kind**: instance method of [<code>HighWaterMark</code>](#HighWaterMark)  
**Emits**: [<code>newHigh</code>](#HighWaterMark+event_newHigh)  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="HighWaterMark+reset"></a>

### highWaterMark.reset()
Reset the high water mark. Deletes all history if using mode = time or count

**Kind**: instance method of [<code>HighWaterMark</code>](#HighWaterMark)  
<a name="HighWaterMark+event_newHigh"></a>

### "newHigh" ⇒ <code>number</code>
A new high water mark has been reached

**Kind**: event emitted by [<code>HighWaterMark</code>](#HighWaterMark)  
**Returns**: <code>number</code> - Value of new high water mark  
