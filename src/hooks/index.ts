import { sequence } from '@sveltejs/kit/hooks'
import type { Handle } from '@sveltejs/kit'

export const ensureAuthorization: Handle = async ({ event, resolve }) => {
	const headers = event.request.headers
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

export const handle = sequence(ensureAuthorization)
