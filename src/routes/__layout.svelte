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
			}
		return {}
	}
</script>

<script lang="ts">
	import '../app.css'

	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar'
	import { A } from '@smui/common/elements'
	import { faUser } from '@fortawesome/free-regular-svg-icons'

	import IconButton from '$lib/smui/IconButton.svelte'
	import { session } from '$app/stores'
</script>

<TopAppBar>
	<Row>
		<Section>
			<Title component={A} href="/" style="color: inherit; text-decoration: none;">Match</Title>
		</Section>

		<Section align="end">
			<IconButton icon={faUser} href="/account" />
		</Section>
	</Row>
</TopAppBar>

<main class="h-screen mdc-top-app-bar--fixed-adjust">
	<slot />
</main>
