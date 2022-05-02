import { ITransport } from '@directus/sdk'
import type { TransportRequestOptions, TransportResponse } from '@directus/sdk'
import Cookies from 'js-cookie'
import { HOST } from './index'

type FetchFunction = (info: RequestInfo, init?: RequestInit) => Promise<Response>

export class TransportFetch extends ITransport {
	fetch: FetchFunction
	constructor(fetch: FetchFunction) {
		super()
		this.fetch = fetch
	}

	getUrl(path: string, options?: TransportRequestOptions) {
		const params = new URLSearchParams(options?.params)
		const url = `${HOST}${path}?${params.toString()}`
		return url
	}

	getAuthorization() {
		const token = Cookies.get('auth_token')
		if (!token) return {}
		const bearer = token.startsWith(`Bearer `) ? token : `Bearer ${token}`
		return { Authorization: bearer }
	}

	async request(
		method: 'get' | 'head' | 'options' | 'delete' | 'post' | 'put' | 'patch',
		path: string,
		options?: TransportRequestOptions,
		data?: any
	) {
		const url = this.getUrl(path, options)
		const init: RequestInit = {
			headers: {
				...options?.headers,
				...this.getAuthorization(),
			},
			method,
		}
		if (data) init.body = JSON.stringify(data)
		const res = await this.fetch(url, init)
		const json = await res.json()
		if (!res.ok) throw new Error(json.errors[0]?.message)
		return { raw: json, ...json, ...res }
	}

	async get<T = any, R = any>(
		path: string,
		options?: TransportRequestOptions
	): Promise<TransportResponse<T, R>> {
		return this.request('get', path, options)
	}

	async head<T = any, R = any>(
		path: string,
		options?: TransportRequestOptions
	): Promise<TransportResponse<T, R>> {
		return this.request('head', path, options)
	}

	async options<T = any, R = any>(
		path: string,
		options?: TransportRequestOptions
	): Promise<TransportResponse<T, R>> {
		return this.request('options', path, options)
	}

	async delete<T = any, P = any, R = any>(
		path: string,
		data?: P,
		options?: TransportRequestOptions
	): Promise<TransportResponse<T, R>> {
		return this.request('delete', path, options, data)
	}

	async post<T = any, P = any, R = any>(
		path: string,
		data?: P,
		options?: TransportRequestOptions
	): Promise<TransportResponse<T, R>> {
		return this.request('post', path, options, data)
	}

	async put<T = any, P = any, R = any>(
		path: string,
		data?: P,
		options?: TransportRequestOptions
	): Promise<TransportResponse<T, R>> {
		return this.request('put', path, options, data)
	}

	async patch<T = any, P = any, R = any>(
		path: string,
		data?: P,
		options?: TransportRequestOptions
	): Promise<TransportResponse<T, R>> {
		return this.request('patch', path, options, data)
	}
}
