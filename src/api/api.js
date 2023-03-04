import axios from 'axios'
const endpoint = 'https://j3uvhhijq0.execute-api.us-east-1.amazonaws.com/api/hye';

export async function post(data, valid) {
	let config = {
		headers: {
			'Content-type': 'application/json',
		}
	}

	const payload = {
		data: data
	};
	if (valid) {
		// payload.data.checkout_time = new Date().toLocaleString();
		payload.data.checkout_time = new `${Date.now()}`;
	} else {
		// payload.data.invalid_checkout_time = new Date().toLocaleString();
		payload.data.invalid_checkout_time = `${Date.now()}`;
	}

	// payload.data.checkout_time = new Date().toLocaleString();
	payload.data.checkout_time = `${Date.now()}`;
	await axios.post(endpoint, payload, config).then(res => {
		console.log('response saved: ', res);
	}).catch(err => {
		console.error('failed to save response: ', err);
	})
}
