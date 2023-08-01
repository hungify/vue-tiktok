import AppVue from './App.vue';
import { type App } from 'vue';
import { setupRouter } from './router';

const bootstrap = async () => {
  const app = createApp(AppVue);

  const plugins = import.meta.glob<{ install: (app: App) => void }>('./plugins/*.ts');
  Object.values(plugins).forEach(async (plugin) => {
    const { install } = await plugin();
    install(app);
  });

  setupRouter(app);
  app.mount('#app');
};

void bootstrap();
