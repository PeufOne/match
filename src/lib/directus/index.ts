import { Directus } from '@directus/sdk'
import type { TCollections } from 'types'
import { browser } from '$app/env'
import { KitStorage } from './storage'

export function getDirectus(session?: App.Session) {
	const url = browser ? '/directus' : 'http://localhost:8055'
	return new Directus<TCollections>(url, {
		storage: new KitStorage(session),
		auth: { mode: 'json' },
	})
}
