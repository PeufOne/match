import { browser } from '$app/env'
import { BaseStorage } from '@directus/sdk'
import debounce from 'debounce'

type AuthKey = 'access_token' | 'refresh_token' | 'expires'

export class KitStorage extends BaseStorage {
	constructor(private session: App.Session = { directus: {} }) {
		super()
	}
	get(key: AuthKey) {
		return this.session.directus[key] || null
	}
	set(key: AuthKey, value: string) {
		this.session.directus[key] = value
		this.setSession()
		return value
	}
	delete(key: AuthKey) {
		if (this.session.directus[key]) {
			delete this.session.directus[key]
			this.setSession()
		}
		console.log('storage delete:', key)
		return null
	}

	setSession = debounce(async () => {
		const url = browser ? '/session' : 'http://localhost:3000/session'
		fetch(url, {
			method: 'put',
			body: JSON.stringify(this.session),
		})
	}, 50)
}
