import axios from 'axios'
import config from './../config.json'

const Axios = async (url, data = {}, method = 'GET', type = 'application/json;charset=UTF-8', addHeaders = {}) => {
	const headers = {
		'Accept': 'application/json',
		'Content-Type': type,
		...addHeaders,
	}

	try {
		const fetch = await axios({
			method,
			url: url.startsWith('/api')
				? `${url.replace('/api', config.base_uri).replace('{key}', config.public_key)}`
				: url,
			headers,
			data,
		})

		return { success: fetch.data.success, error: fetch.data.error, status: fetch.status, data: fetch.data }
	} catch (error) {
		console.log(error)
		return { success: false, error }
	}
}

export default Axios
