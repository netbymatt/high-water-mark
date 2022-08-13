const { EventEmitter } = require('events');
const validateOptions = require('./validate-options');

const DEFAULT_OPTIONS = {
	mode: 'all',
	timeLimit: 60000,
	countLimit: 10,
	invert: false,
};

/**
 * Track a high water mark by all-time, time interval or count
 *
 * @class HighWaterMark
 * @extends {EventEmitter}
 * @param {object} [options]
 * @param {string} [options.mode=all] All time: 'all', Time limited: 'time', Count limited: 'count'
 * @param {boolean} [options.invert=false] When true tracks the low water mark instead of the high
 * @param {integer} [options.timeLimit=60000] When mode = 'time' the amount of time over which the high water mark is monitored (ms)
 * @param {integer} [options.countLimit=10] When mode = 'count' the number of items over which the high water mark is monitored
 */
class HighWaterMark extends EventEmitter {
	constructor(options) {
		super();
		// combine and store options
		this._options = { ...DEFAULT_OPTIONS, ...(options ?? {}) };

		// validate options, throws if invalid combination selected
		validateOptions(this._options, DEFAULT_OPTIONS);

		// track if the highest is up-to-date
		// yes by default because by definition this returns undefined if no values have been sent
		this._highestUpToDate = true;

		// set up initial values
		this._history = [];
		this._highest = undefined;
	}

	/**
	 * Store a new value to the high water mark
	 *
	 * @param {number} value
	 * @memberof HighWaterMark
	 * @fires HighWaterMark#newHigh
	 */
	store(value) {
		// change detection
		let change = false;

		// all time high water mark
		if (this._options.mode === 'all') {
			change = this._isNewWaterMark(value, this._highest);
			if (change) {
				this._setHighest(value);
				this._emitnewHigh();
			}
			return;
		}

		if (this._options.mode === 'time') {
			// add new value and timestamp
			this._history.push({ value, time: Date.now() });

			// reset flag
			this._highestUpToDate = false;
		}

		if (this._options.mode === 'count') {
			// add new value at end
			this._history.push(value);

			// manage array length
			if (this._history.length > this._options.countLimit) this._history.shift();

			// reset flag
			this._highestUpToDate = false;
		}

		// if there are subscribers calculate the new highest (not done on every update for performance)
		// then send event
		if (this.listenerCount('newHigh') > 0) {
			const oldHighest = this._highest;
			this._calcHighest();
			if (oldHighest !== this._highest) {
				this._emitnewHigh();
			}
		}
	}

	/**
	 * A new high water mark has been reached
   * @event HighWaterMark#newHigh
	 * @memberof HighWaterMark
	 * @returns {number} Value of new high water mark
	 */
	_emitnewHigh() {
		this.emit('newHigh', this._highest);
	}

	/**
	 * Reset the high water mark. Deletes all history if using mode = time or count
	 *
	 * @memberof HighWaterMark
	 */
	reset() {
		this._highest = undefined;
		this._highestUpToDate = true;
		this._history = [];
	}

	/**
	 * Set the internal highest and reset the flag
	 *
	 * @private
	 * @memberof HighWaterMark
	 */
	_setHighest(value) {
		this._highest = value;

		// the highest is never considered up-to-date in time mode
		if (this._options.mode === 'time') return;
		this._highestUpToDate = true;
	}

	/**
	 *	Calculate the highest value of the array and set flag
	 *
	 *	@private
	 *  @memberof HighWaterMark
	 */
	_calcHighest() {
		// no calculation required if already up to date (typically mode='all')
		if (this._highestUpToDate) return this._highest;

		// remove out of date values from the array in mode = 'time'
		if (this._options.mode === 'time') {
			const oldest = Date.now() - this._options.timeLimit;
			this._history = this._history.filter((value) => value.time > oldest);
		}
		// no special handling is required for count, the array is managed at set-time

		// find max of the array
		this._setHighest(this._history.reduce((prev, cur) => {
			if (this._isNewWaterMark(cur?.value ?? cur, prev)) {
				return cur.value ?? cur;
			}
			return prev;
		}, undefined));

		return this._highest;
	}

	/**
 * Tests if a value is greater than the high water mark (low water mark when invert = true)
 *
 * @private
 * @param {number} value Value to test
 * @param {number} highest Current highest value (lowest when invert = true)
 * @param {boolean} [invert=false] When true test for low water mark
 */
	_isNewWaterMark(value, highest) {
	// if highest is not supplied this is the highest
	// this allows for easily using this in a .reduce loop where highest may not be defined on the first iteration
		if (highest === undefined) return true;

		if (!this._options.invert) return value > highest;
		return value < highest;
	}

	valueOf() {
		return this._calcHighest();
	}

	/**
	 * Get the current high water mark
	 *
	 * @readonly
	 * @memberof HighWaterMark
	 * @returns {number} Value of high water mark
	 */
	get value() {
		return this.valueOf();
	}
}

module.exports = HighWaterMark;
