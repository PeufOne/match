import type { TTheme } from 'types'

export function selectTheme(theme: TTheme) {
	const styleSheets = Array.from(document.styleSheets)
	const styleSheetLight = styleSheets.find((sheet) => sheet.href?.endsWith('/smui.css'))
	const styleSheetDark = styleSheets.find((sheet) => sheet.href?.endsWith('/smui-dark.css'))

	if (!styleSheetLight || !styleSheetDark) return

	styleSheetLight.disabled = false
	styleSheetDark.disabled = false

	if (theme === 'auto') {
		styleSheetLight.media.mediaText = '(prefers-color-scheme: light)'
		styleSheetDark.media.mediaText = 'screen and (prefers-color-scheme: dark)'
		return
	}

	if (theme === 'light') {
		styleSheetLight.media.mediaText = ''
		styleSheetDark.disabled = true
		return
	}

	styleSheetDark.media.mediaText = ''
	styleSheetLight.disabled = true
	return
}
