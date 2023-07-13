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

    <main>
      <RouterView />
    </main>

    <slot name="sidebar">
      <aside>
        <Sidebar @onShowModal="handleShowModal" />
      </aside>
    </slot>

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
  grid-gap: 1rem;
  grid-template-areas:
    'header header'
    'aside main'
    'footer footer';
  > * {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  header {
    grid-area: header;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 10;
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
    position: relative;
  }

  aside {
    grid-area: aside;
    position: sticky;
    top: 0;
    align-self: start;
    z-index: 0;
  }
}
</style>
