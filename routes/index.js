import cache from '@/libs/memcached/middleware'
import baseRoute from './client/index'
import errorRoute from './app/error.js'

export default (app) => {
	app.get('/', cache(60 * 60 * 24 * 7), baseRoute.get)
	app.post('/', baseRoute.post)

	app.get('/error', errorRoute.get)
}
