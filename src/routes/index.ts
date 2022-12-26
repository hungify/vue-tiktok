import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { locationsScrollToTop } from '~/configs/router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: () => import('~/pages/Home.vue'),
    meta: {
      title: 'Home',
      layout: 'MainLayout',
    },
  },
  {
    path: '/following',
    name: 'following',
    component: () => import('~/pages/Following.vue'),
    meta: {
      title: 'Following',
      layout: 'MainLayout',
    },
  },
  {
    path: '/live',
    name: 'live',
    component: () => import('~/pages/Live.vue'),
    meta: {
      title: 'Live',
      layout: 'MainLayout',
      full: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
  routes,
});

export default router;
