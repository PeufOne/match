import type { RequestHandler } from '@sveltejs/kit'
import directus from '$lib/directus'

export const post: RequestHandler = async ({ request }) => {
	const { register, ...user } = await request.json()

	console.log('VA TE FAIRE FOUTRE !!!!!!')

	return {
		status: 201,
		body: { errors: [{ message: 'Va te faire foutre' }] },
	}

	try {
		const res = register
			? await directus.users.createOne(user).then(() => directus.auth.login(user))
			: await directus.auth.login(user)

		console.log('YOLO SUCCESS', res)
		return {
			status: 201,
		}
	} catch (error: any) {
		console.log('YOLO ERROR', error.message)
		return {
			status: 400,
			body: { message: error.message },
		}
	}
}

/*
	async function handleLogin() {
		try {
			isLoading = true
			
			await goto('/')
		} catch (e: any) {
			error = e.message
			snackbar.open()
			console.error(e)
		} finally {
			isLoading = false
		}
	}
	*/
