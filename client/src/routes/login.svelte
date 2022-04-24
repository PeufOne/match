<script lang="ts">
	import Paper, { Title, Content } from '@smui/paper'
	import TextField from '@smui/textfield'
	import Icon from '@smui/textfield/icon'
	import Button from '@smui/button'
	import Fa from 'svelte-fa'
	import { faEnvelope } from '@fortawesome/free-regular-svg-icons'

	import directus from '$lib/directus'

	let email = ''
	let password = ''
</script>

<Paper style="margin: 16px;">
	<Title>Connexion</Title>
	<Content>
		<TextField
			style="width: 100%;"
			type="email"
			label="Email"
			bind:value={email}
			input$autocomplete="email"
		>
			<Fa icon={faEnvelope} class="textfield-icon" slot="leadingIcon" />
		</TextField>
		<TextField
			style="width: 100%;"
			type="password"
			input$autocomplete="password"
			label="Mot de passe"
			bind:value={password}
		>
			<Icon class="material-symbols-outlined" slot="leadingIcon">vpn_key</Icon>
		</TextField>

		<br /><br />
		<Button>Inscription</Button>

		<Button variant="raised">Connexion</Button>
	</Content>
</Paper>

<h1 class="text-3xl font-bold underline">Hello world!</h1>
