import { BaseStorage } from '@directus/sdk'
import Cookies from 'js-cookie'
import { browser } from '$app/env'

export class KitStorage extends BaseStorage {
	constructor(private session?: App.Session) {
		super()
	}
	get(key: string) {
		if (!browser && !this.session)
			console.warn(
				'The session must be provided when the request can be executed on the server side'
			)
		const value = browser ? Cookies.get(key) : this.session!.cookies[key]
		return value || null
	}
	set(key: string, value: string) {
		console.log('set value', { [key]: value })
		Cookies.set(key, value)
		return value
	}
	delete(key: string) {
		Cookies.remove(key)
		return null
	}
}
