/// <reference types="@sveltejs/kit" />

interface AuthResult {
	access_token: string
	expires: number
	refresh_token?: string
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		cookies: Record<string, string>
	}
	// interface Platform {}
	interface Session {
		directus: Record<string, string>
	}
	// interface Stuff {}
}
