import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			ssr: {
				noExternal: [/^@smui(?:-extra)?\//],
			},
			server: {
				proxy: {
					'/directus': {
						target: 'http://localhost:8055',
						changeOrigin: true,
						rewrite: (path) => path.replace(/^\/directus/, ''),
					},
				},
			},
		},
	},
}

export default config
