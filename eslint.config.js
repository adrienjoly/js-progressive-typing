// cf https://typescript-eslint.io/getting-started
// and https://typescript-eslint.io/rules/no-floating-promises/

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: "./tsconfig.json",
            },
        },
        plugins: {
            "@typescript-eslint": tseslint.plugin,
        },
        rules: {
            "@typescript-eslint/no-floating-promises": [
                "error",
                { ignoreVoid: false }
            ]
        }
    }
);
