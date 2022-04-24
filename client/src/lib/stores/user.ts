import { writable } from 'svelte/store'
import type { UserType } from '@directus/sdk'

const user = writable<UserType | null>(null)

export { user }
