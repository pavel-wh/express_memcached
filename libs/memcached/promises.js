import memcached from './index'

export const promiseGet = async (templateKey) => {
	return new Promise((resolve, reject) => {
		memcached.get(templateKey, (err, data) => {
			if (err) {
				reject(err)
			} else {
				resolve(data)
			}
		})
	})
}

export const promiseSet = async (templateKey, data, cacheTime) => {
	return new Promise((resolve, reject) => {
		memcached.set(templateKey, data, cacheTime, (err) => {
			if (err) {
				reject(err)
			} else {
				resolve('OK')
			}
		})
	})
}

export const promiseDel = async (templateKey) => {
	return new Promise((resolve, reject) => {
		memcached.del(templateKey, (err) => {
			if (err) {
				reject(err)
			} else {
				resolve('OK')
			}
		})
	})
}
