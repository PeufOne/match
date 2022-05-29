import type { RequestHandler } from '@sveltejs/kit'
import { getDirectus } from '$lib/directus'

export const post: RequestHandler = async ({ request, locals }) => {
	const directus = getDirectus(locals.session.data)

	return {
		status: 201,
		body: {},
	}
}
