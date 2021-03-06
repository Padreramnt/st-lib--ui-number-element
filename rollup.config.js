const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve').default
const { terser } = require('rollup-plugin-terser')

module.exports = [
	{
		input: 'lib/dist.js',
		output: {
			file: 'dist/index.js',
			format: 'iife',
			name: 'UINumberElement',
		},
		plugins: [
			commonjs(),
			resolve(),
		],
	},
	{
		input: 'lib/dist.js',
		output: {
			file: 'dist/index.min.js',
			format: 'iife',
			name: 'UINumberElement',
		},
		plugins: [
			commonjs(),
			resolve(),
			terser({
				compress: {
					passes: 3,
				},
				mangle: {
					keep_classnames: true,
				}
			}),
		],
	}
]
