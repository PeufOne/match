import { BaseStorage } from '@directus/sdk'
import Cookies from 'js-cookie'

export class CookieStorage extends BaseStorage {
	get(key: string) {
		const value = Cookies.get(key)
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
