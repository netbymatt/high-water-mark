const chai = require('chai');

const { expect } = chai;

const HighWaterMark = require('../src');

describe('Options validation', () => {
	describe('Unknown options', () => {
		it('Should reject an unknown option key', () => {
			expect(() => new HighWaterMark({ foo: true })).to.throw('Unexpected option');
		});
	});

	describe('Mode', () => {
		it('Should accept: all', () => {
			expect(() => new HighWaterMark({ mode: 'all' })).to.not.throw;
		});
		it('Should accept: time', () => {
			expect(() => new HighWaterMark({ mode: 'time' })).to.not.throw;
		});
		it('Should accept: count', () => {
			expect(() => new HighWaterMark({ mode: 'count' })).to.not.throw;
		});
		it('Should not accept invalid modes', () => {
			expect(() => new HighWaterMark({ mode: 'foo' })).to.throw('Invalid mode selected.');
		});
	});

	describe('Mode: time', () => {
		it('Should accept a number > 0', () => {
			expect(() => new HighWaterMark({ mode: 'time', timeLimit: 10 })).to.not.throw;
		});
		it('Should not accept a number <= 0', () => {
			expect(() => new HighWaterMark({ mode: 'time', timeLimit: 0 })).to.throw('Time limit must be greater than zero');
			expect(() => new HighWaterMark({ mode: 'time', timeLimit: -10 })).to.throw('Time limit must be greater than zero');
		});
	});

	describe('Mode: count', () => {
		it('Should accept a number > 0', () => {
			expect(() => new HighWaterMark({ mode: 'count', countLimit: 10 })).to.not.throw;
		});
		it('Should not accept a number <= 0', () => {
			expect(() => new HighWaterMark({ mode: 'count', countLimit: 0 })).to.throw('Count limit must be greater than zero');
			expect(() => new HighWaterMark({ mode: 'count', countLimit: -10 })).to.throw('Count limit must be greater than zero');
		});
	});

	describe('Invert', () => {
		it('Should reject a non boolean', () => {
			expect(() => new HighWaterMark({ invert: 'foo' })).to.throw('Invert must be true or false');
		});
	});
});
