/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	rules: {
		"indent": ['error', 2]
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
		},
	],
	root: true,
};
