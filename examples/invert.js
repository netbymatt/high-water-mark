// HighWaterMark in all-time inverted mode
const HighWaterMark = require('../src');

const h = new HighWaterMark({
	mode: 'all',	// default mode shown for clarity
	invert: true,
});

h.store(5);
h.store(10);
console.log(h.value); // 5
h.store(1);
console.log(h.value); // 1
