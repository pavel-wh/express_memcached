exports.get = (req, res, next) => {
	res.locals.page = 'error'
	try {
		const page = {}
		const pageLength = page.length
		res.send(`<h1>${pageLength}</h1>`)
	} catch (error) {
		next(error)
	}
}
