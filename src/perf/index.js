const obsopts = {
	entryTypes: ['measure'],
};

const roundDuration = (dur) => Math.round((dur * 1000) / 1000);

const observer = new PerformanceObserver((list) => {
	list.getEntries().forEach((entry) => {
		// Process "mark" and "measure" events
		console.info(`${entry.name} in ${roundDuration(entry.duration)}ms`);
	});
});

observer.observe(obsopts);
