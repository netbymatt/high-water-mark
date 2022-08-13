// HighWaterMark in all-time mode showing event
const HighWaterMark = require('../src');

const h = new HighWaterMark({
	mode: 'all',	// default mode shown for clarity
});

h.on('newHigh', (newHigh) => console.log(`New high water mark: ${newHigh}`));

h.store(10);	// event emitted: 10
h.store(5);
h.store(15);	// event emitted: 15
