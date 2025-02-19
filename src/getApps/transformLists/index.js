export default (json) => {
	const { apps } = json;

	apps.forEach((app, i) => {
		if (app.accountTypes.length > 0) {
			apps[i].accountTypes = app.accountTypes.join(',');
		} else {
			apps[i].accountTypes = '';
		}

		if (app.attributes) {
			apps[i].attributes = Object.keys(app.attributes).map((attribute) => {
				if (apps[i].attributes[attribute].length > 0) {
					return `${attribute}: ${apps[i].attributes[attribute].join(', ')}`;
				}
			}).join('; ');
		}
	});

	return apps;
};
