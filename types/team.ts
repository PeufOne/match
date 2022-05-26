import type { TEvent } from './event'
import type { TUser } from './user'

export type TTeam = {
	status: 'draft' | 'published' | 'archived'
	name: string
	event: TEvent
	members: TUser[]
}
