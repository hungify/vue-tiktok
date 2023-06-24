import { envVariables } from './src/utils/env';

module.exports = {
  client: {
    service: {
      name: 'my-app',
      // URL to the GraphQL API
      url: `${envVariables.viteBaseApiUrl}/graphql}`,
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.ts'],
  },
};
