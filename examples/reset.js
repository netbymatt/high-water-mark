// HighWaterMark reset()
const HighWaterMark = require('../src');

const h = new HighWaterMark({
	mode: 'all',
});

console.log(h.value); // undefined
h.store(10);
h.store(5);
console.log(h.value); // 10
h.store(15);
console.log(h.value); // 15

h.reset();
console.log(h.value); // undefined
h.store(100);
h.store(50);
console.log(h.value); // 100
