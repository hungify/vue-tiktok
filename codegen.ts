import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: 'src/graphql/**/*.gql',
  overwrite: true,
  generates: {
    './src/generated/graphql.ts': {
      config: {
        useTypeImports: true,
        withCompositionFunctions: true,
      },
      plugins: ['typescript', 'typescript-operations', 'typescript-vue-apollo'],
    },
  },
};

export default config;
