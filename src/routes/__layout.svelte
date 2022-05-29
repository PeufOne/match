<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import { getDirectus } from '$lib/directus'

	export const load: Load = async ({ url, session }) => {
		const directus = getDirectus(session)
		const loginPath = '/login'

		if (!directus.auth.token && url.pathname !== loginPath)
			return {
				status: 303,
				redirect: loginPath,
				body: { user: null },
			}

		if (url.pathname !== loginPath) {
			const user = await directus.users.me.read()
			return {
				status: 200,
				props: { user },
			}
		}

		return {}
	}
</script>

<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar'
	import { A } from '@smui/common/elements'
	import { faUser } from '@fortawesome/free-regular-svg-icons'
	import { onMount } from 'svelte'

	import '../app.css'
	import type { TUser } from 'types'
	import IconButton from '$lib/smui/IconButton.svelte'
	import { selectTheme } from '$lib/store/theme'

	export let user: TUser | null

	onMount(() => {
		if (!user) return
		selectTheme(user.theme)
	})
</script>

<TopAppBar>
	<Row>
		<Section>
			<Title component={A} href="/" style="color: inherit; text-decoration: none;">Match</Title>
		</Section>

		<Section align="end">
			{user?.username || ''}
			<IconButton icon={faUser} href="/account" />
		</Section>
	</Row>
</TopAppBar>

<main class="h-screen mdc-top-app-bar--fixed-adjust">
	<slot />
</main>
