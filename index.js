import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import path from 'path'

import Config from './libs/config'
import baseMV from './middlewares/base'
import Router from './routes'

const app = express()

app.use(helmet())
app.use(compression())

app.set('views', path.join(__dirname, 'templates'))
app.set('view engine', 'pug')
app.set('view options', { compileDebug: false, self: true, cache: true })
app.use(express.static(path.join(__dirname, 'public')))

// Base middleware
app.use(baseMV)

// Routing
Router(app)

// Error handling
app.use((err, req, res, next) => {
	console.error('Error:', err.stack)
	res.status(502)
	res.render('./error', { errorMsg: 'Server Error' })
})

app.use((req, res) => {
	res.status(404)
	res.render('./error', { errorMsg: 'Not Found' })
})

app.listen(Config.port, () => {
	console.log(`Listening on port ${Config.port}!`)
})
