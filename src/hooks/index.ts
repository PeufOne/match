import { sequence } from '@sveltejs/kit/hooks'
import type { GetSession, Handle } from '@sveltejs/kit'
import cookie from 'cookie'

const ensureDirectusAuthorization: Handle = async ({ event, resolve }) => {
	const { headers } = event.request
	const auth = headers.get('authorization')
	if (auth) return await resolve(event)

	const cookies = headers.get('cookie')?.split('; ') || []
	const cookie = cookies.find((c) => c.startsWith('auth_token='))
	if (!cookie) return await resolve(event)

	const token = cookie.replace('auth_token=', '')
	const bearer = token.startsWith(`Bearer `) ? token : `Bearer ${token}`
	headers.append('Authorization', bearer)
	return await resolve(event)
}

const setLocalsFromCookies: Handle = async ({ event, resolve }) => {
	const { headers } = event.request
	event.locals.cookies = cookie.parse(headers.get('cookie') || '')
	/*
	const cookie = cookies.find((c) => c.startsWith('auth_token='))
	if (!cookie) return await resolve(event)
	*/
	return await resolve(event)
}

export const handle = sequence(setLocalsFromCookies)

export const getSession: GetSession = async (event) => {
	return {
		directus: event.locals.cookies,
	}
}
