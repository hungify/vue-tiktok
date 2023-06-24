import { App } from 'vue';
import { createHttpLink, InMemoryCache, ApolloClient } from '@apollo/client/core';
import { envVariables } from '~/utils/env';
import { DefaultApolloClient } from '@vue/apollo-composable';

export const install = (app: App) => {
  const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: `${envVariables.viteBaseApiUrl}/graphql`,
  });

  // Cache implementation
  const cache = new InMemoryCache();

  // Create the apollo client
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
  });

  app.provide(DefaultApolloClient, apolloClient);
};
