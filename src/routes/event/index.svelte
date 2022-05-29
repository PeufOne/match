<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import { getDirectus } from '$lib/directus'

	export const load: Load = async ({ session }) => {
		const directus = getDirectus(session)
		const resEvents = await directus
			.items('event')
			.readByQuery({ meta: 'total_count', fields: ['name', '*.*'] })
		return {
			status: 200,
			props: {
				events: resEvents.data,
				eventsCount: resEvents.meta?.total_count,
			},
		}
	}
</script>

<script lang="ts">
	import type { TEvent } from 'types'
	// import Paper, { Title, Content } from '@smui/paper'
	import Card, { Content, PrimaryAction } from '@smui/card'

	import IconButton from '$lib/smui/IconButton.svelte'
	import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'

	export let events: TEvent[] = []
	export let eventsCount = 0

	const formater = new Intl.DateTimeFormat(undefined, {
		weekday: 'short',
		day: 'numeric',
		hour: '2-digit',
		month: 'short',
		year: '2-digit',
		minute: '2-digit',
	})
</script>

<div class="m-3 grid gap-3">
	<h2 class="text-2xl">Mes évenements</h2>

	{#each events as event}
		<Card>
			<PrimaryAction>
				<Content>
					<h2 class="text-xl">{event.name}</h2>
					<span class="text-sm">
						{formater.formatRange(new Date(event.startDate), new Date(event.endDate))}
					</span>
				</Content>
			</PrimaryAction>
		</Card>
	{:else}
		<Card>
			<Content>Vous n'avez aucun évenement pour l'instant</Content>
		</Card>
	{/each}
</div>

<div class="fixed bottom-3 right-3">
	<IconButton fab icon={faSearch} class="mr-3" />
	<IconButton href="/event/new" fab icon={faPlus} color="primary" />
</div>
