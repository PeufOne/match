<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	export const load: Load = async (event) => {
		return {
			status: 303,
			redirect: '/event',
		}
	}
</script>

<script lang="ts">
	import Button from '@smui/button'
</script>

<div class="m-3">
	<h2>Hello</h2>
	<Button href="/event">évenements</Button>
</div>
