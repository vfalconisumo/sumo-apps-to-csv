import { performance } from 'node:perf_hooks';
import transformLists from './transformLists/index.js';

const {
	SUMO_API_ACCESS_ID,
	SUMO_API_ACCESS_KEY,
	SUMO_API_URL,
} = process.env;

export default () => {
	const creds = Buffer.from(`${SUMO_API_ACCESS_ID}:${SUMO_API_ACCESS_KEY}`).toString('base64');
	const url = new URL('/api/v2/apps', (SUMO_API_URL || 'https://api.sumologic.com'));
	const headers = new Headers({
		authorization: `Basic ${creds}`,
	});
	const request = new Request(url, { headers });

	performance.mark('api-fetch-begin');

	return fetch(request).then((response) => {
		const msg = `${response.status} ${response.statusText} ${url}`;

		performance.mark('api-fetch-response');
		performance.measure('api-fetch-duration', 'api-fetch-begin', 'api-fetch-response');

		if (!response.ok) {
			console.error(`Network error: ${msg}`);
		}

		console.debug(msg);

		return response.json();
	}).then((json) => transformLists(json));
};
