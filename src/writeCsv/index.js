import { performance } from 'node:perf_hooks';
import { resolve } from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import { stringify } from 'csv-stringify/sync'; // eslint-disable-line import/no-unresolved -- https://github.com/import-js/eslint-plugin-import/issues/1810

const DEFAULT_OUTPUT_PATH = resolve(process.env.PWD, './output');
const outputPath = process.env.OUTPUT_PATH || DEFAULT_OUTPUT_PATH;
const columnsList = new Set();

const addColumns = (scrape) => {
	Object.keys(scrape).forEach((column) => {
		columnsList.add(column);
	});
};

const getColumns = () => {
	const columns = [];

	Array.from(columnsList).forEach((column) => {
		columns.push({ key: column });
	});

	return columns;
};

const extractCsv = (apps) => {
	apps.forEach((app) => {
		addColumns(app);
	});

	return stringify(apps, {
		header: true,
		columns: getColumns(),
	});
};

export default async (apps) => {
	const filepath = resolve(outputPath, './apps.csv');
	const csv = extractCsv(apps);

	performance.mark('csv-write-begin');

	await mkdir(outputPath, { recursive: true });
	await writeFile(filepath, csv);

	performance.mark('csv-write-finish');
	performance.measure('csv-write-duration', 'csv-write-begin', 'csv-write-finish');

	return apps;
};
