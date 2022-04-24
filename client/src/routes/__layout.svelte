<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import directus from '$lib/directus'

	export const load: Load = async ({ url }) => {
		const token = directus.auth.token
		const loginPath = '/login'

		if (!token && url.pathname !== loginPath)
			return {
				status: 300,
				redirect: loginPath,
			}

		return {}
	}
</script>

<script lang="ts">
	import '../app.css'

	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar'
	import { mdiAccount } from '@mdi/js'
	import { A } from '@smui/common/elements'

	import IconButton from '$lib/smui/IconButton.svelte'
</script>

<TopAppBar>
	<Row>
		<Section>
			<Title component={A} href="/">Match</Title>
		</Section>

		<Section align="end">
			<IconButton icon={mdiAccount} href="/account" />
		</Section>
	</Row>
</TopAppBar>

<main class="mdc-top-app-bar--fixed-adjust">
	<slot />
</main>

<style global>
	body {
		font-family: roboto, Helvetica, Geneva, Tahoma, sans-serif;
	}

	a,
	a:hover,
	a:visited,
	a:active {
		color: inherit;
		text-decoration: none;
	}

	main {
		overflow-x: hidden;
	}
	pre {
		overflow-x: auto;
	}
</style>
