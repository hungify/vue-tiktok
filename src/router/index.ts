import generatedRoutes from '~pages';
import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter } from 'vue-router';
import { createWebHistory } from 'vue-router';
import type { App } from 'vue';
import { locationsScrollToTop } from '~/configs/router';

export const setupRouter = (app: App) => {
  const routes = setupLayouts(generatedRoutes);

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
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
