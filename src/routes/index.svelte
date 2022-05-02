<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import { getDirectus } from '$lib/directus'
	import type { ITeam } from 'types'

	export const load: Load = async ({ fetch }) => {
		const directus = await getDirectus(fetch)
		const res = await directus
			.items('team')
			.readByQuery({ meta: 'total_count', fields: ['name', '*.*'] })
		return {
			status: 200,
			props: {
				teams: res.data,
			},
		}
	}
</script>

<script lang="ts">
	export let teams: ITeam[]
</script>

<h3>Mon super index</h3>

<ul>
	{#each teams as team}
		<li>
			{team.name}
		</li>
	{/each}
</ul>
