import { extname } from 'node:path';
import { kebabCase } from 'change-case';
import getImage from './getImage/index.js';
import writeImage from './writeImage/index.js';

export default (records) => {
	const imageRequests = records.map((record) => {
		const {
			icon,
			name,
		} = record;
		const filename = `icon-${kebabCase(name)}${extname(icon)}`;

		return getImage(icon)
			.then((bytes) => writeImage(filename, bytes));
	});

	return Promise.all(imageRequests);
};
