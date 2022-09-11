module.exports = {
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:effector/recommended',
    'plugin:effector/scope',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: [
    'simple-import-sort',
    'effector',
  ],
  rules: {
    'max-len': ['warn', { code: 120, ignoreComments: true, ignoreTemplateLiterals: true }],
    semi: [
      'error',
      'never',
    ],
    'arrow-parens': [
      'error',
      'as-needed',
    ],
    'no-multiple-empty-lines': [
      'warn',
      {
        max: 1,
        maxBOF: 0,
      },
    ],
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // Style imports
          ['^.+\\.(s?css|less)$'],
          // react related packages, other packages
          ['^react', '(\\w-/)*'],
          // Side effect imports, Alias, Relative
          ['^@pages'],
          ['^@components'],
          [
            '^\\u0000',
            '^@assets',
            '^@store',
            '^@router',
            '^@',
            '^\\.',
          ],
        ],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'no-useless-constructor': 'off',
    'no-shadow': 'off',
    'function-call-argument-newline': ['error', 'consistent'],
    'function-paren-newline': ['error', 'multiline-arguments'],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: 'multiline-block-like', next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      {
        blankLine: 'always',
        prev: '*',
        next: [
          'return',
          'throw',
          'try',
          'while',
          'do',
          'if',
          'switch',
          'function',
          'for',
          'multiline-const',
        ],
      },
      { blankLine: 'always', prev: 'multiline-const', next: '*' },
    ],
    'no-underscore-dangle': [
      'error',
      {
        allowAfterThis: true,
        allow: [
          '_id',
        ],
      },
    ],
  },
}
