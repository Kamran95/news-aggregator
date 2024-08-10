module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier', // Ensure this is at the end
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto', // Adjust as needed
            },
        ],
        'react/react-in-jsx-scope': 'off', // Adjust based on React version
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-unused-vars': 'error', // Enforce no unused variables
        '@typescript-eslint/no-unused-vars': 'error',
        'no-console': 'warn',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
