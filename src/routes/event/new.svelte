<script lang="ts">
	import Textfield from '@smui/textfield'
	import { faTimes, faArrowLeft, faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons'

	import IconButton from '$lib/smui/IconButton.svelte'

	import PeriodPicker from '$lib/utils/PeriodPicker.svelte'
</script>

<form method="post" class="m-auto p-3 max-w-md">
	<h1>Nouvel évenement</h1>

	<Textfield name="name" label="Nom de mon évenement" value="" class="w-full" />

	<PeriodPicker />

	<div class="flex mt-2 gap-3">
		<IconButton
			href="/event"
			fab
			icon={faTimes}
			title="Retour aux évenements"
			class="mr-3 bg-orange-600 text-white"
		/>
		<div class="flex-1" />
		<!--

			<IconButton fab icon={faArrowLeft} title="retour" />
			<IconButton fab icon={faArrowRight} title="suivant" />
		-->
		<IconButton fab icon={faCheck} title="Valider" color="primary" />
	</div>
</form>
