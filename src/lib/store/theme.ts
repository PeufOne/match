import { browser } from '$app/env'
import { writable } from 'svelte/store'
import type { TTheme } from 'types'

export const theme = writable<TTheme>('auto')
export const darkMode = writable(false)

function isDarkTheme(newTheme: TTheme): boolean {
	if (newTheme === 'auto') {
		if (!browser) return false
		return window.matchMedia('(prefers-color-scheme: dark)').matches
	}
	return newTheme === 'dark'
}

export function selectTheme(newTheme: TTheme) {
	theme.set(newTheme)
	darkMode.set(isDarkTheme(newTheme))

	const styleSheets = Array.from(document.styleSheets)
	const styleSheetLight = styleSheets.find((sheet) => sheet.href?.endsWith('/smui.css'))
	const styleSheetDark = styleSheets.find((sheet) => sheet.href?.endsWith('/smui-dark.css'))

	if (!styleSheetLight || !styleSheetDark) return

	styleSheetLight.disabled = false
	styleSheetDark.disabled = false

	if (newTheme === 'auto') {
		styleSheetLight.media.mediaText = '(prefers-color-scheme: light)'
		styleSheetDark.media.mediaText = 'screen and (prefers-color-scheme: dark)'
		return
	}

	if (newTheme === 'light') {
		styleSheetLight.media.mediaText = ''
		styleSheetDark.disabled = true
		return
	}

	styleSheetDark.media.mediaText = ''
	styleSheetLight.disabled = true
	return
}
