<script lang="ts">
	import { goto } from '$app/navigation'

	import directus from '$lib/directus'
	import Button from '@smui/button'

	async function logout() {
		await directus.auth.logout()
		goto('/login')
	}
</script>

<h3>User Account</h3>

<Button on:click={logout}>Déconexion</Button>
