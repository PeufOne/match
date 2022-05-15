import { Directus, type DirectusOptions } from '@directus/sdk'
import type { ICollections } from 'types'
import { browser } from '$app/env'

import { KitStorage } from './storage'
import { TransportFetch } from './transport'

export const HOST = '/directus'

/**
 * Retourne une instance de directus avec la possibilité d'utiliser
 * le fetch fourni par de sveltkit nécéssaire pour les credentials côté serveur.
 * https://kit.svelte.dev/docs/loading#input-fetch
 */

export function getDirectus(session: App.Session): Directus<ICollections> {
	const options: DirectusOptions = { storage: new KitStorage(session) }
	// if (fetch) options.transport = new TransportFetch(fetch)
	const url = browser ? '/directus' : 'http://localhost:8055'
	return new Directus<ICollections>(url, options)
}

type FetchFunction = (info: RequestInfo, init?: RequestInit) => Promise<Response>
