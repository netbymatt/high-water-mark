// HighWaterMark in all-time mode
const HighWaterMark = require('../src');

const h = new HighWaterMark({
	mode: 'all',	// default mode shown for clarity
});

console.log(h.value); // undefined
h.store(10);
h.store(5);
console.log(h.value); // 10
h.store(15);
console.log(h.value); // 15
