import type { RequestHandler } from '@sveltejs/kit'
import cookie from 'cookie'

import { getDirectus } from '$lib/directus'

// Peut très bien être déplacé coté client pour évité les set-cookie.
export const post: RequestHandler = async (event) => {
	try {
		/*
		const directus = getDirectus(event.locals)
		console.log('BEFORE')
		const { request } = event
		const { register, ...user } = await request.json()
		const res = register
			? await directus.users.createOne(user).then(() => directus.auth.login(user))
			: await directus.auth.login(user)
		console.log('AFTER')
		/*
		Object.entries(res).forEach(([key, value]) => {
			event.request.headers.append('set-cookie', cookie.serialize(key, String(value)))
		})
		*/
		return {
			status: 201,
			body: { todo: 'please' },
		}
	} catch (error: any) {
		return {
			status: 403,
			body: error,
		}
	}
}
