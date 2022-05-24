/// <reference types="@sveltejs/kit" />

interface SessionData {
	directus: {
		access_token?: string
		expires?: string
		refresh_token?: string
	}
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		session: import('svelte-kit-cookie-session').Session<SessionData>
		cookies: Record<string, string>
	}
	// interface Platform {}
	interface Session extends SessionData {}
	// interface Stuff {}
}
