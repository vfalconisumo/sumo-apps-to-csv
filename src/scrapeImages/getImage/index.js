import { performance } from 'node:perf_hooks';

export default (strUrl) => {
	const url = new URL(strUrl);
	const request = new Request(url);

	performance.mark('image-fetch-begin');

	return fetch(request)
		.then((response) => {
			const msg = `${response.status} ${response.statusText} ${url}`;

			performance.mark('image-fetch-response');
			performance.measure('image-fetch-duration', 'image-fetch-begin', 'image-fetch-response');

			if (!response.ok) {
				console.error(`Network error: ${msg}`);
				return false;
			}

			console.debug(msg);

			return response.bytes();
		});
};
