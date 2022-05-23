import type { GetSession, Handle } from '@sveltejs/kit'
import cookie from 'cookie'

export const getSession: GetSession = async (event) => ({
	cookies: cookie.parse(event.request.headers.get('cookie') || ''),
})
