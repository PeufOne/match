<script lang="ts">
	import { slide } from 'svelte/transition'
	import { goto } from '$app/navigation'
	import Paper, { Title, Content } from '@smui/paper'
	import TextField from '@smui/textfield'
	import Icon from '@smui/textfield/icon'
	import Button from '@smui/button'
	import type { SnackbarComponentDev } from '@smui/snackbar'
	import Snackbar, { Label } from '@smui/snackbar'
	import CircularProgress from '@smui/circular-progress'
	import Fa from 'svelte-fa'
	import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons'

	import directus from '$lib/directus'

	let first_name = ''
	let email = ''
	let password = ''

	let register = false
	let error = ''
	let snackbar: SnackbarComponentDev
	let isLoading = false

	async function handleLogin() {
		try {
			isLoading = true
			if (register) await directus.users.createOne({ first_name, email, password })
			await directus.auth.login({ email, password })
			await goto('/')
		} catch (e: any) {
			error = e.message
			snackbar.open()
			console.error(e)
		} finally {
			isLoading = false
		}
	}

	function handleKeyup(event: any) {
		if (event.key === 'Enter') handleLogin()
	}
</script>

<Snackbar bind:this={snackbar}>
	<Label>{error}</Label>
</Snackbar>

{#if isLoading}
	<div class="w-full h-full grid place-content-center">
		<CircularProgress class="w-16 h-16" indeterminate />
	</div>
{:else}
	<Paper class="m-3">
		<Title>{register ? 'Nouveau compte' : 'Connexion'}</Title>
		<Content>
			{#if register}
				<TextField
					class="w-full transition-opacity"
					label="Nom d'utilisateur"
					bind:value={first_name}
					on:keyup={handleKeyup}
				>
					<Fa icon={faUser} class="textfield-icon" slot="leadingIcon" />
				</TextField>
			{/if}

			<TextField
				class="w-full"
				type="email"
				label="Email"
				input$autocomplete="email"
				bind:value={email}
				on:keyup={handleKeyup}
			>
				<Fa icon={faEnvelope} class="textfield-icon" slot="leadingIcon" />
			</TextField>
			<TextField
				class="w-full"
				type="password"
				input$autocomplete="password"
				label="Mot de passe"
				bind:value={password}
				on:keyup={handleKeyup}
			>
				<Icon class="material-symbols-outlined" slot="leadingIcon">vpn_key</Icon>
			</TextField>

			<div class="flex pt-6">
				<Button color="secondary" on:click={() => (register = !register)}>
					{register ? 'Connexion' : 'Inscription'}
				</Button>
				<div class="flex-grow" />
				<Button variant="raised" on:click={handleLogin}>Valider</Button>
			</div>
		</Content>
	</Paper>
{/if}
