import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import serve from 'rollup-plugin-serve'

const production = !process.env.ROLLUP_WATCH
const env = production ? 'production' : 'development'

export default {
	input: 'src/index.js',

	output: {
		sourcemap: true,
		format: 'iife',
		file: 'public/build/bundle.js',
	},

  plugins: [
		replace({
			preventAssignment: true,
			values: {
				'process.env.NODE_ENV': JSON.stringify(env)
			},
		}),
		babel({ browserslistEnv: env }),
    resolve({ browser: true }),
    commonjs(),

		!production && serve({ port: 8080, contentBase: 'public', open: true }),
		!production && livereload('public'),

    production && terser(),
  ],
}
