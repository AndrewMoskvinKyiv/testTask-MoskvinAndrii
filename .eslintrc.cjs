const noUnusedVars = [
  'warn',
  {
    args: 'after-used',
    argsIgnorePattern: '^_',
    destructuredArrayIgnorePattern: '^_',
    ignoreRestSiblings: true,
  },
];

const noConsole = ['warn', { allow: ['info', ' warn', 'error'] }];

module.exports = {
  plugins: ['import', 'only-warn', 'prettier', 'react'],
  overrides: [
    {
      files: ['*.cjs'],
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
      },
      extends: ['plugin:prettier/recommended'],
      rules: {
        'no-console': noConsole,
        'no-unused-vars': noUnusedVars,
        'import/no-duplicates': 'warn',
      },
    },
    {
      files: ['*.ts', 'src/**/*.ts*'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
      ],
      rules: {
        'no-console': noConsole,
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': noUnusedVars,
        'no-restricted-imports': 'off',
        'import/order': [
          'warn',
          {
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
            pathGroups: [
              {
                pattern: '~/**',
                group: 'internal',
                position: 'after',
              },
              {
                pattern: './*.scss',
                group: 'sibling',
                position: 'after',
              },
            ],
          },
        ],
        'import/no-duplicates': 'warn',
        'react/display-name': 'off',
        'react/jsx-key': [
          'warn',
          {
            checkFragmentShorthand: true,
            checkKeyMustBeforeSpread: true,
            warnOnDuplicates: true,
          },
        ],
        'react/jsx-uses-react': 'off',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
};
