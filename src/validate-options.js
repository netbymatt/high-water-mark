// validate supplied options

const MODES = [
	'all',
	'time',
	'count',
];

module.exports = (options, DEFAULT_OPTIONS) => {
	// keys
	const DEFAULT_KEYS = Object.keys(DEFAULT_OPTIONS);
	Object.keys(options).forEach((key) => {
		if (!DEFAULT_KEYS.includes(key)) throw new Error(`Unexpected option: ${key}`);
	});
	// mode
	if (!MODES.includes(options.mode)) throw new Error(`Invalid mode selected. Must be one of: ${MODES.join(',')}`);

	if (typeof options.invert !== 'boolean') throw new Error('Invert must be true or false');

	// time
	if (options.mode === 'time') {
		if (options.timeLimit <= 0) throw new Error('Time limit must be greater than zero');
	}

	// count
	if (options.mode === 'count') {
		if (options.countLimit <= 0) throw new Error('Count limit must be greater than zero');
	}
};
