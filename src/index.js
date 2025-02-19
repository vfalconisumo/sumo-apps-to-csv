import 'dotenv/config';
import './perf/index.js';
import getApps from './getApps/index.js';
import writeCsv from './writeCsv/index.js';
import scrapeImages from './scrapeImages/index.js';

getApps()
	.then((json) => writeCsv(json))
	.then((records) => scrapeImages(records));
