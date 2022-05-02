import type { RequestHandler } from '@sveltejs/kit'
import directus from '$lib/directus'

export const get: RequestHandler = async ({ request }) => {
	console.log('YOLO HEADERS', request.headers)

	// const res = await directus.items('event').readByQuery({ fields: ['name', '*.*'] })
	return {
		status: 200,
		body: {
			events: [],
		},
	}
}
