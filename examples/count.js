// HighWaterMark in count mode
const HighWaterMark = require('../src');

const h = new HighWaterMark({
	mode: 'count',
	countLimit: 5,
});

h.store(10);
h.store(1);
h.store(2);
h.store(3);
h.store(4);
// history is full at this point with 5 items: [10, 1, 2, 3, 4]
console.log(h.value); // 10

h.store(5);
// oldest (and highest) of 10 falls off the history at this point
console.log(h.value); // 5
