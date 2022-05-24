import { Directus } from '@directus/sdk'
import type { ICollections } from 'types'
import { browser } from '$app/env'

import { KitStorage } from './storage'

export function getDirectus(session?: App.Session): Directus<ICollections> {
	const url = browser ? '/directus' : 'http://localhost:8055'
	return new Directus<ICollections>(url, {
		storage: new KitStorage(session),
		auth: { autoRefresh: true, mode: 'json' },
	})
}
