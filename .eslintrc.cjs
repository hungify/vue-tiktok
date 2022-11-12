/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    project: './tsconfig.json',
    extraFileExtensions: ['.vue'],
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    withDefaults: 'readonly',
  },
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // ##########
    // # CUSTOM #
    // ##########
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',
    'arrow-spacing': 'error',
    'no-confusing-arrow': ['error', { allowParens: true, onlyOneSimpleParam: false }],
    // ###########
    // # PLUGINS #
    // ###########

    // # TYPESCRIPT
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
      },
      {
        selector: 'enumMember',
        format: ['PascalCase'],
      },
      {
        selector: 'class',
        format: ['PascalCase'],
      },
    ],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow',
      },
    ],
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'static-field',
          'static-method',
          'field',
          'abstract-method',
          'constructor',
          'method',
        ],
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-extraneous-class': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/ban-types': 'off',

    // # VUE
    'vue/no-multiple-template-root': 'off',
    'vue/multi-word-component-names': 'off',
  },
};
