import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import pluginTailwindcss from 'eslint-plugin-tailwindcss';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended, pluginTailwindcss.configs.recommended, prettierConfig],
        files: ['./src/**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2022,
            globals: globals.browser,
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            tailwindcss: pluginTailwindcss,
            prettier: prettierPlugin,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'prettier/prettier': [
                'error',
                {
                    useTabs: false,
                    printWidth: 100,
                    tabWidth: 2,
                    singleQuote: true,
                    trailingComma: 'all',
                    bracketSameLine: false,
                    endOfLine: 'auto',
                },
            ],
            'tailwindcss/classnames-order': [
                'error',
                {
                    officialSorting: true,
                    prependCustom: false,
                    callees: ['classnames', 'clsx', 'cn'],
                    config: 'tailwind.config.js',
                },
            ],
            'tailwindcss/enforces-negative-arbitrary-values': 'error',
            'tailwindcss/migration-from-tailwind-2': 'error',
        },
    },
);
