import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import { rolldown } from 'rolldown';

import { readFileSync } from 'fs';

async function build() {
	console.log('Building widget...');

	const bundle = await rolldown({
		input: 'web-sdk/index.ts',
		plugins: [
			replace({
				preventAssignment: true,
				values: {
					'process.env.NODE_ENV': JSON.stringify('production')
				}
			}),
			terser({
				compress: {
					drop_console: false, // Keep console.warn/error for debugging
					drop_debugger: true,
					passes: 2
				},
				mangle: {
					reserved: ['FeatureFlag'] // Don't mangle the public API
				},
				format: {
					comments: false
				}
			})
		]
	});

	await bundle.write({
		file: 'web-sdk/demo/widget.js',
		format: 'iife',
		name: 'FeedbackWidgetBundle', // Internal name, not exposed
		sourcemap: false
	});

	// Get file size
	const stats = readFileSync('web-sdk/demo/widget.js');
	console.log(`Built web-sdk/demo/widget.js (${(stats.length / 1024).toFixed(1)} KB)`);
}

build().catch(console.error);
