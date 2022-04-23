<script lang="ts" context="module">
	import directus from '$lib/directus';
	import {} from '$app/navigation';
	export async function load({ url }) {
		console.log('load');
		const token = directus.auth.token;
		if (!token && url.pathname !== '/login')
			return {
				status: 300,
				redirect: '/login'
			};

		console.log({ token });
		// const res = await directus.users.me.read();
		// console.log({ res });
		return {};
	}
</script>

<script lang="ts">
	import 'normalize.css';
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import { mdiAccount } from '@mdi/js';
	import { A } from '@smui/common/elements';

	import IconButton from '$lib/utils/IconButton.svelte';
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
