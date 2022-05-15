<script lang="ts">
	import { onMount } from 'svelte'
	import { slide, fly } from 'svelte/transition'
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
	import { session } from '$app/stores'

	import { getDirectus } from '$lib/directus'

	let user = {
		email: '',
		password: '',
		first_name: '',
	}
	let register = false

	let errorMessage = ''
	let isLoading = false

	let snackbar: SnackbarComponentDev
	let isInit = false

	onMount(() => (isInit = true))

	async function handleLogin() {
		try {
			isLoading = true
			const directus = getDirectus($session)
			if (register) await directus.users.createOne(user)
			await directus.auth.login(user)

			await goto('/')
		} catch (error: any) {
			errorMessage = error.message
			snackbar.open()
		} finally {
			isLoading = false
		}
	}
</script>

<Snackbar bind:this={snackbar}>
	<Label>{errorMessage}</Label>
</Snackbar>

{#if isLoading}
	<div class="w-full h-full grid place-content-center">
		<CircularProgress class="w-16 h-16" indeterminate />
	</div>
{:else if isInit}
	<div in:fly|local={{ x: 0, y: 40 }}>
		<Paper class="m-3">
			<Title>
				{#if register}
					<div in:fly|local={{ x: 20 }}>Nouveau compte</div>
				{:else}
					<div in:fly|local={{ x: 20 }}>Connexion</div>
				{/if}
			</Title>
			<Content>
				<form on:submit|preventDefault={handleLogin} rel="asd djsasdaj sasdkj">
					<div>
						{#if register}
							<div transition:slide|local>
								<TextField
									bind:value={user.first_name}
									class="w-full transition-opacity"
									label="Nom d'utilisateur"
								>
									<Fa icon={faUser} class="textfield-icon" slot="leadingIcon" />
								</TextField>
							</div>
						{/if}
						<TextField
							bind:value={user.email}
							class="w-full"
							type="email"
							label="Email"
							input$autocomplete="email"
						>
							<Fa icon={faEnvelope} class="textfield-icon" slot="leadingIcon" />
						</TextField>
						<TextField
							bind:value={user.password}
							class="w-full"
							type="password"
							input$autocomplete="password"
							label="Mot de passe"
						>
							<Icon class="material-symbols-outlined" slot="leadingIcon">vpn_key</Icon>
						</TextField>

						<div class="flex pt-6">
							<Button type="button" color="secondary" on:click={() => (register = !register)}>
								{register ? 'Connexion' : 'Inscription'}
							</Button>
							<div class="flex-grow" />
							<Button type="submit" variant="raised">Valider</Button>
						</div>
					</div>
				</form>
			</Content>
		</Paper>
	</div>
{/if}
