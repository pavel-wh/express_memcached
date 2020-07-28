exports.get = async (req, res, next) => {
	res.locals.page = 'main'
	res.locals.title = 'Memcached'

	await new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve()
		}, 2500)
	})
	res.render('./index')
}

exports.post = async (req, res) => {
	res.send('Hello!')
}
