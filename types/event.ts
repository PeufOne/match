import type { TTeam } from './team'

export type TEvent = {
	status: 'draft' | 'published' | 'archived'
	name: string
	teams: TTeam[]
	startDate: Date
	endDate: Date
}
