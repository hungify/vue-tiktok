import type { BaseRouteMeta } from '~/interfaces/layout';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $log: typeof console.log;
  }
}

declare module '*.vue' {
  import { defineComponent } from 'vue';
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_BASE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'vue-router' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface RouteMeta extends BaseRouteMeta {}
}

export {}; // Important!
