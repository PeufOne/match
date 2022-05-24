import type { GetSession, Handle } from '@sveltejs/kit'
import { handleSession } from 'svelte-kit-cookie-session'
import dotenv from 'dotenv'
dotenv.config()

export const handle: Handle = handleSession({
	secret: process.env.SECRET_SESSION!,
})

export const getSession: GetSession = async ({ locals }) => locals.session.data
