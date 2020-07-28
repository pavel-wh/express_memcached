import Config from '@/libs/config'
import { promiseGet } from '@/libs/memcached/promises'

export default async (req, res, next) => {
	if (Config.cachePages) {
		res.locals.templateKey = Config.memcached.templatePrefix + req.originalUrl || req.url
		try {
			res.locals.cachedBody = await promiseGet(res.locals.templateKey)
			if (res.locals.cachedBody) {
				next()
			} else {
				await getVariables()
				next()
			}
		} catch (error) {
			console.error(error.stack)
			await getVariables()
			next()
		}
	} else {
		await getVariables()
		next()
	}
	async function getVariables() {
		await new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve()
			}, 500)
		})

		res.locals.page = ''
		res.locals.title = 'Error page'
		res.locals.fullYear = new Date().getFullYear()
		res.locals.mainMenu = [
			{ page: 'index', url: '/', text: 'Home' },
			{ page: 'error', url: '/error', text: 'Error' },
		]
	}
}
