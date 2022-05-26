import type { TEvent } from './event'
import type { TTeam } from './team'
import type { TUser, TUserCustom } from './user'

type TBaseItem = {
	id: number
	user_created: TUser
	user_updated: TUser
	date_created: Date
	date_updated: Date
}

export type TCollections = {
	directus_users: TUserCustom
	team: TTeam & TBaseItem
	event: TEvent & TBaseItem
}
