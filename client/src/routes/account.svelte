<script lang="ts" context="module">
	import directus from '$lib/directus';

	let data: any;

	export async function load() {
		data = await directus
			.items('team')
			.readByQuery({ meta: 'total_count', fields: ['name', '*.*'] });
		return {};
	}
</script>

<script lang="ts">
	import Button from '@smui/button';

	async function logout() {
		await directus.auth.logout();
	}
</script>

<h3>User Account</h3>

<Button on:click={logout}>Déconexion</Button>

<pre>{JSON.stringify(data, null, 2)}</pre>
