<script lang="ts">
	import { goto } from '$app/navigation'
	import { session } from '$app/stores'
	import Button from '@smui/button'

	import { getDirectus } from '$lib/directus'

	async function logout() {
		const directus = getDirectus($session)
		await directus.auth.logout()
		goto('/login')
	}
</script>

<h3>User Account</h3>

<Button on:click={logout}>Déconexion</Button>
