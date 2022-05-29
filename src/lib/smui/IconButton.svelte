<script lang="ts">
	import IconButton, { Icon } from '@smui/icon-button'
	import Fab from '@smui/fab'
	import { Svg } from '@smui/common/elements'
	import type { IconDefinition } from '@fortawesome/free-regular-svg-icons'

	export let icon: string | IconDefinition

	export let fab = false
	export let ripple = true
	export let color: 'primary' | 'secondary' | undefined = undefined
	export let toggle = false
	export let displayFlex = true
	export let size: 'normal' | 'mini' | 'button' = 'normal'
	export let href: string | undefined = undefined

	$: d =
		typeof icon === 'string'
			? icon
			: typeof icon.icon[4] === 'string'
			? icon.icon[4]
			: icon.icon[4].join(' ')

	$: viewBox = typeof icon === 'string' ? '0 0 24 24' : `0 0 ${icon.icon[0]} ${icon.icon[1]}`
</script>

{#if fab}
	<Fab {ripple} {color} {toggle} {href} {...$$restProps}>
		<Icon component={Svg} {viewBox}>
			<path fill="currentColor" {d} />
		</Icon>
	</Fab>
{:else}
	<IconButton {ripple} {color} {toggle} {displayFlex} {size} {href} {...$$restProps}>
		<Icon component={Svg} {viewBox}>
			<path fill="currentColor" {d} />
		</Icon>
	</IconButton>
{/if}
