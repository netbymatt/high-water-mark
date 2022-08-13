module.exports = {
	env: {
		commonjs: true,
		node: true,
		mocha: true,
	},
	extends: 'airbnb-base',
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		indent: [
			'error',
			'tab',
		],
		'no-use-before-define': [
			'error',
			{
				variables: false,
			},
		],
		'no-tabs': 0,
		'no-underscore-dangle': [
			'error',
			{
				allowAfterThis: true,
			},
		],
		'max-len': 0,
	},
	ignorePatterns: [

	],
};
