// HighWaterMark in time mode
const HighWaterMark = require('../src');

const h = new HighWaterMark({
	mode: 'time',	// default mode shown for clarity
	timeLimit: 1000, // 1 second limit
});

h.store(10);
h.store(5);
console.log(h.value); // 10

// wait 2 seconds
setTimeout(() => {
	// 10 and 5 have timed out at this point
	h.store(4);
	h.store(3);
	console.log(h.value); // 4
}, 2000);
