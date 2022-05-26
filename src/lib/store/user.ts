import { writable } from 'svelte/store'
import type { TUser } from 'types'

const user = writable<TUser | null>(null)

export { user }
