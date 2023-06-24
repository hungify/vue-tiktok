import generatedRoutes from '~pages';
import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter, createWebHistory } from 'vue-router';
import type { App } from 'vue';
import { locationsScrollToTop } from '~/configs/router';
import { envVariables } from '~/utils/env';

export const setupRouter = (app: App) => {
  const routes = setupLayouts(generatedRoutes);

  const router = createRouter({
    history: createWebHistory(envVariables.baseUrl),
    routes,
    scrollBehavior: (to, _from, savedPosition) => {
      const shouldScrollToTop = to.name && locationsScrollToTop.includes(to.name);
      if (shouldScrollToTop) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ top: 0, behavior: 'smooth' });
          }, 5000);
        });
      } else if (savedPosition) {
        return savedPosition;
      }
    },
  });

  app.use(router);
};
