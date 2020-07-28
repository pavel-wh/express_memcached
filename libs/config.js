let config = new Object()

config.port = 4200

config.cachePages = true

config.memcached = {
	uri: '127.0.0.1:11211',
	options: {
		timeout: 300,
		maxTimeout: 900,
		minTimeout: 10,
		failures: 2,
	},
	templatePrefix: '__template__',
}

export default config
