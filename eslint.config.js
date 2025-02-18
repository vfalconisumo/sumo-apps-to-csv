import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname
});

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		languageOptions: { globals: globals.browser },
	},
	...compat.extends('eslint-config-airbnb-base'),
	{
		rules: {
			'no-tabs': 'off',
			'indent': 'off',
		}
	}
];
