import { Directus } from '@directus/sdk'
import type { ICollections } from 'types'
import { CookieStorage } from './storage'
import { TransportFetch } from './transport'

export const HOST = '/directus'

const directus = new Directus('http://localhost:3000' + HOST, {
	auth: { mode: 'cookie' },
	storage: new CookieStorage(),
})
export default directus

type FetchFunction = (info: RequestInfo, init?: RequestInit) => Promise<Response>

/**
 * Retourne une instance de directus avec la possibilité d'utiliser
 * le fetch fourni par de sveltkit nécéssaire pour les credentials côté serveur.
 * https://kit.svelte.dev/docs/loading#input-fetch
 */
export async function getDirectus(fetch: FetchFunction): Promise<Directus<ICollections>> {
	return new Directus<ICollections>(HOST, {
		auth: { mode: 'cookie' },
		transport: new TransportFetch(fetch),
		storage: new CookieStorage(),
	})
}
