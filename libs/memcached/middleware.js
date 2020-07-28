import Config from '@/libs/config'
import memcached from './index'

export default (duration) => {
	return (req, res, next) => {
		if (Config.cachePages) {
			if (res.locals.cachedBody) {
				res.send(res.locals.cachedBody)
			} else {
				res.sendAndCache = res.send
				res.send = (body) => {
					memcached.set(res.locals.templateKey, body, duration, (err) => {
						if (err) console.error(err)
						res.sendAndCache(body)
					})
				}
				next()
			}
		} else {
			next()
		}
	}
}
