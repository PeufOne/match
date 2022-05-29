<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import { getDirectus } from '$lib/directus'

	export const load: Load = async ({ session }) => {
		const directus = getDirectus(session)
		const user = await directus.users.me.read()
		if (!user) return { status: 404 }
		return {
			status: 200,
			props: { user },
		}
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation'
	import Button from '@smui/button'
	import { session } from '$app/stores'
	import Paper, { Title, Content } from '@smui/paper'
	import SegmentedButton, { Segment } from '@smui/segmented-button'
	import { Label } from '@smui/common'

	import type { TUser, TTheme } from 'types'
	import { selectTheme } from '$lib/store/theme'

	export let user: TUser

	const directus = getDirectus($session)

	const themes: TTheme[] = ['auto', 'light', 'dark']

	async function logout() {
		await directus.auth.logout()
		goto('/login')
	}

	async function handleChangeTheme(theme: TTheme) {
		selectTheme(theme)
		await directus.users.me.update({ theme })
	}
</script>

<Paper class="m-3">
	<Title>Bonjour {user.username}</Title>
	<Content class="flex flex-col gap-6 mt-4">
		<div class="flex items-center gap-4">
			<span>Thème</span>
			<SegmentedButton
				segments={themes}
				let:segment
				singleSelect
				bind:selected={user.theme}
				on:change={({ detail }) => handleChangeTheme(detail.segmentId)}
			>
				<Segment {segment}>
					<Label>{segment}</Label>
				</Segment>
			</SegmentedButton>
		</div>

		<Button on:click={logout}>
			<Label>Déconexion</Label>
		</Button>
	</Content>
</Paper>
