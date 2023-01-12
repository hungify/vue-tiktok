import { createApp } from 'vue';
import App from './App.vue';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import router from '~/routes';
import { createPinia } from 'pinia';
import './index.scss';

const app = createApp(App);

app.use(createPinia());

app.config.globalProperties.$log = console.log;
app.mixin({
  inheritAttrs: true,
});
app.use(router);
app.mount('#app');
