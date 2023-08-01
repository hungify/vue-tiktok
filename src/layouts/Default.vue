<script lang="ts" setup>
import { useSessionStorage } from '@vueuse/core';

const isOpen = ref(false);
useSessionStorage('isModalOpen', isOpen);

const handleShowModal = () => {
  isOpen.value = true;
};
</script>

<template>
  <AuthModal v-model="isOpen" />
  <div class="layout-container">
    <slot name="header">
      <header>
        <Header @onShowModal="handleShowModal" />
      </header>
    </slot>

    <slot name="sidebar">
      <aside>
        <Sidebar @onShowModal="handleShowModal" />
      </aside>
    </slot>

    <main>
      <RouterView />
    </main>

    <slot name="footer">
      <footer>
        <Footer />
      </footer>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  display: grid;
  grid-template-columns: $default-layout-sidebar-width 1fr;
  grid-gap: $default-layout-spacing;
  grid-template-areas:
    'header header'
    'aside main'
    'footer footer';

  @media (max-width: 768px) {
    grid-template-columns: calc(#{$default-layout-sidebar-width} / 6) 1fr;
    grid-gap: 0;
    aside {
      border-right: 1px solid rgba(22, 24, 35, 0.12);
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.06);
    }
  }

  & > * {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  header {
    grid-area: header;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 5;
    background-color: $white;
    width: 100%;
    min-height: $default-layout-header-height;
    box-shadow: 0px 1px 1px rgb(0 0 0 / 12%);
  }

  footer {
    grid-area: footer;
  }

  main {
    grid-area: main;
  }

  aside {
    grid-area: aside;
    position: sticky;
    top: calc(#{$default-layout-header-height} + #{$default-layout-spacing});
    align-self: start;
    height: 100vh;
  }
}
</style>
