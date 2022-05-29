<script lang="ts">
	import { onMount } from 'svelte'
	import Textfield from '@smui/textfield'
	import { darkMode } from '$lib/store/theme'

	import { easepick, RangePlugin, AmpPlugin, TimePlugin } from '@easepick/bundle'
	import easepickCSS from '$lib/style/easepick.css?url'

	import type { Core } from '@easepick/core'

	export let start: string = ''
	export let end: string = ''

	let picker: Core
	let element: HTMLInputElement

	onMount(() => {
		picker = new easepick.create({
			element,
			css: [easepickCSS],
			lang: navigator.language,
			inline: true,
			plugins: [RangePlugin, AmpPlugin, TimePlugin],
			RangePlugin: {
				strict: false,
			},
			AmpPlugin: {
				darkMode: $darkMode,
			},
			TimePlugin: {
				stepMinutes: 10,
			},
		})
		return () => picker.destroy()
	})
</script>

<input bind:this={element} class="invisible h-0" />
