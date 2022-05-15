import { BaseStorage } from '@directus/sdk'
import Cookies from 'js-cookie'
import { browser } from '$app/env'

export class KitStorage extends BaseStorage {
	constructor(private session: App.Session) {
		super()
	}
	get(key: string) {
		const value = browser ? Cookies.get(key) : this.session.directus[key]
		return value || null
	}
	set(key: string, value: string) {
		Cookies.set(key, value)
		return value
	}
	delete(key: string) {
		Cookies.remove(key)
		return null
	}
}
