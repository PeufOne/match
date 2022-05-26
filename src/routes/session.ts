import type { RequestHandler } from '@sveltejs/kit'

export const put: RequestHandler = async ({ request, locals }) => {
	const sessionData = await request.json()
	locals.session.data = { ...locals.session.data, ...sessionData }
	return {
		body: sessionData,
	}
}

export const del: RequestHandler = async ({ locals }) => {
	locals.session.destroy()
	return {
		body: { ok: true },
	}
}
