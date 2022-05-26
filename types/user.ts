import type { PartialItem, UserItem } from '@directus/sdk'

export type TUserCustom = {
	username: string
}
export type TUser = PartialItem<UserItem<TUserCustom>>
