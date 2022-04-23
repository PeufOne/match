<script lang="ts">
	import IconButton, { Icon } from '@smui/icon-button';
	import { Svg } from '@smui/common/elements';

	export let icon: string;

	export let ripple = true;
	export let color: 'primary' | 'secondary' | undefined = undefined;
	export let toggle = false;
	export let displayFlex = true;
	export let size: 'normal' | 'mini' | 'button' = 'normal';
	export let href: string | undefined = undefined;
</script>

<IconButton {ripple} {color} {toggle} {displayFlex} {size} {href} {...$$restProps}>
	<Icon component={Svg} viewBox="0 0 24 24">
		<path fill="currentColor" d={icon} />
	</Icon>
</IconButton>
