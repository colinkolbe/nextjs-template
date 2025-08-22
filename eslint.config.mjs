import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default defineConfig([
    globalIgnores([".next/**/*"], "Ignore Build Directory"),
	{
		extends: compat.extends("next"),
		plugins: {
			"simple-import-sort": simpleImportSort,
		},
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
		},
		rules: {
			"simple-import-sort/imports": "warn",
			"simple-import-sort/exports": "warn",
			quotes: ["warn", "double"],
			semi: ["warn", "always"],
			"no-multi-spaces": ["error"],
			"no-unused-vars": [
				1,
				{
					args: "none",
				},
			],
		},
	},
	{
		files: ["**/*.tsx", "**/*.ts", "**/*.jsx", "**/*.js"],
		ignores: ["**/.next/**"],
	},
	eslintConfigPrettier,
]);
