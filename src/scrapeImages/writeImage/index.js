import { performance } from 'node:perf_hooks';
import { resolve } from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';

const DEFAULT_OUTPUT_PATH = resolve(process.env.PWD, 'output/images');
const outputPath = process.env.OUTPUT_PATH || DEFAULT_OUTPUT_PATH;

export default async (filename, bytes) => {
	const buf = Buffer.from(bytes);
	const outputFilePath = resolve(outputPath, filename);

	performance.mark(`image-write-${filename}-begin`);

	await mkdir(outputPath, { recursive: true });
	await writeFile(outputFilePath, buf);

	performance.mark(`image-write-${filename}-finish`);
	performance.measure(`image-write-${filename}-duration`, `image-write-${filename}-begin`, `image-write-${filename}-finish`);

	return filename;
};
