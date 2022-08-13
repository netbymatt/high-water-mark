# High Water Mark
Zero-dependency tracking of a high water mark over a series of values with configurable options including a low water mark.

This document only talks about a high water mark for clarity. Setting `options.invert = true` will flip the output to track the lowest values.

## Features
- Invert to track the low water mark
- All time high tracking
- Time expiring tracking tracking
- Last n values tracking

## Use
```bash
npm i high-water-mark
```
In its default configuration an all-time high is tracked as shown below.
```javascript
const HighWaterMark = require('high-water-mark');

const h = new HighWaterMark();

h.store(10);
h.store(5);
console.log(h.value); // 10
h.store(15);
console.log(h.value); // 15
```
Additional examples for each mode are available in the `examples` folder.

## API
Complete [API documentation](API.md)

## Count mode
Count mode keeps a history of the last `options.countLimit` values. Upon `.store`ing a value if the internal history length has reached the limit the newest value is added at the bottom of the history and the oldest value is removed from the top of the list.
When accessing `.value` the maximum value of the internal history is returned.

## Time mode
Time mode timestamps each value as it is `.store`d. Upon evaluating `.value` all items with a timestamp older than `options.timeLimit` are removed from the internal history, and the highest value in the history is returned.

**Important** The expiration time is calculated from the moment when `.value` is accessed, not from the most recent timestamp recorded in history.

**Also Important** If more time than `options.timeLimit` has elapsed since the last value was `.store`d then `.value` will return `undefined` this is by design.

## newHigh event
The event `newHigh` is emitted when a value is `.store`d and is a new high value.
- This event is not emitted if `newValue === currentHighValue`
- This event is always emitted on the first `.store` event when the `.value` changes from undefined to the stored value.

## Performance considerations
The library has been designed with the best performance in mind for each mode. All modes are still very performant. Any computations made are cached to the best extent possible. But if you want to squeeze every bit of speed out of your code continue reading.

In terms of performance the three modes are fastest to slowest:
- all
- count
- time

Please also consider:
- Using the `newHigh` event decreases performance for `count` and `time` as the highest value must be evaluated on every `.store`. Without using this event calculation of highest is deferred to accessing `.value`.
- If you are considering `time` mode it may not be necessary in many situations. If you are calling `.store` and `.value` in the same time-driven routine (such as `setInterval`) then `count` mode can be used to achieve the same idea: `options.timeLimit = options.countLimit * setInterval time`.

## Tests and coverage
```
npm test
npm run coverage
```