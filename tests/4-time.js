const chai = require('chai');
const { setTimeout } = require('timers/promises');

const { expect } = chai;

const HighWaterMark = require('../src');

describe('Mode: Time', () => {
	describe('Standard', () => {
		const options = { mode: 'time', timeLimit: 500 };
		it('Should return undefined', () => {
			const h = new HighWaterMark(options);
			expect(h.value).to.be.undefined;
		});

		it('Should return the first value as highest', () => {
			const h = new HighWaterMark(options);
			h.store(50);
			expect(h.value).to.equal(50);
		});

		it('Should ignore not high enough value', () => {
			const h = new HighWaterMark(options);
			h.store(50);
			h.store(40);
			expect(h.value).to.equal(50);
		});

		it('Should update on higher value', () => {
			const h = new HighWaterMark(options);
			h.store(50);
			h.store(40);
			h.store(60);
			expect(h.value).to.equal(60);
		});

		it('Should discard values outside the time window', async () => {
			const h = new HighWaterMark(options);
			h.store(100);
			h.store(2);
			expect(h.value).to.equal(100);
			await setTimeout(1000);
			h.store(3);
			expect(h.value).to.equal(3);
		});

		it('Should emit newHigh event', (done) => {
			const h = new HighWaterMark(options);
			let stage = 0;
			h.on('newHigh', (data) => {
				if (stage === 0) {
					expect(data).to.equal(50);
					stage = 1;
				} else if (stage === 1) {
					expect(data).to.not.equal(40);
					expect(data).to.equal(60);
					done();
				}
			});
			h.store(50);
			h.store(40);
			h.store(60);
		});

		it('Should return to undefined after reset', () => {
			const h = new HighWaterMark(options);
			h.store(10);
			expect(h.value).to.equal(10);
			h.reset();
			expect(h.value).to.be.undefined;
		});
	});

	describe('Inverted', () => {
		const options = { mode: 'time', timeLimit: 500, invert: true };
		it('Should return undefined', () => {
			const h = new HighWaterMark(options);
			expect(h.value).to.be.undefined;
		});

		it('Should return the first value as highest', () => {
			const h = new HighWaterMark(options);
			h.store(-50);
			expect(h.value).to.equal(-50);
		});

		it('Should ignore not high enough value', () => {
			const h = new HighWaterMark(options);
			h.store(-50);
			h.store(-40);
			expect(h.value).to.equal(-50);
		});

		it('Should update on higher value', () => {
			const h = new HighWaterMark(options);
			h.store(-50);
			h.store(-40);
			h.store(-60);
			expect(h.value).to.equal(-60);
		});

		it('Should emit newHigh event', (done) => {
			const h = new HighWaterMark(options);
			let stage = 0;
			h.on('newHigh', (data) => {
				if (stage === 0) {
					expect(data).to.equal(-50);
					stage = 1;
				} else if (stage === 1) {
					expect(data).to.not.equal(-40);
					expect(data).to.equal(-60);
					done();
				}
			});
			h.store(-50);
			h.store(-40);
			h.store(-60);
		});

		it('Should discard values outside the time window', async () => {
			const h = new HighWaterMark(options);
			h.store(-100);
			h.store(-2);
			expect(h.value).to.equal(-100);
			await setTimeout(1000);
			h.store(-3);
			expect(h.value).to.equal(-3);
		});

		it('Should return to undefined after reset', () => {
			const h = new HighWaterMark(options);
			h.store(10);
			expect(h.value).to.equal(10);
			h.reset();
			expect(h.value).to.be.undefined;
		});
	});
});
