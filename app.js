import express from 'express'
import Memcached from 'memcached'

import Config from '@config'

const PORT = 2400
const memcached = new Memcached(Config.memcached)

const app = express()

// Caching middleware
const cache = (duration) => {
	return (req, res, next) => {
		const templateKey = '__template__' + req.originalUrl || req.url
		memcached.get(templateKey, (err, cachedBody) => {
			if (cachedBody) {
				res.send(cachedBody)
			} else {
				if (err) console.error(err)
				res.sendResponse = res.send
				res.send = (body) => {
					memcached.set(templateKey, body, duration, (err) => {
						if (err) console.error(err)
						res.sendResponse(body)
					})
				}
				next()
			}
		})
	}
}

// Routing
app.get('/', cache(10), (req, res) => {
	setTimeout(() => {
		res.send('<h1>Hello</h1>')
	}, 2000) //Sloooow processing
})

app.use((req, res) => {
	res.status(404)
	res.send('<h1>404</h1>')
})

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}!`)
})
