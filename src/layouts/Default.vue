<script lang="ts" setup>
import { useSessionStorage } from '@vueuse/core';

interface MainLayoutProps {
  full?: boolean;
}
const props = withDefaults(defineProps<MainLayoutProps>(), {
  full: false,
});
const $style = useCssModule();

const layoutClasses = computed(() => {
  return [$style['main-layout-wrapper'], props.full && $style.full];
});

const containerClasses = computed(() => {
  return [$style['main-layout-container'], props.full && $style.full];
});

const isOpen = ref(false);
useSessionStorage('isModalOpen', isOpen);
const handleShowModal = () => {
  isOpen.value = true;
};
</script>

<template>
  <AuthModal v-model="isOpen" />
  <div :class="layoutClasses">
    <slot name="header">
      <Header @onShowModal="handleShowModal" />
    </slot>

    <main :class="containerClasses">
      <slot name="sidebar">
        <Sidebar @onShowModal="handleShowModal" />
      </slot>

      <div :class="$style.content">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style lang="scss" module>
.main-layout-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: $default-layout-width;
  margin: 0 auto;
  &.full {
    max-width: 100%;
  }
}

.main-layout-container {
  width: 100%;
  gap: 2rem;
  padding: 0 $default-layout-horizontal-spacer;
  display: flex;
  &.full {
    padding: 0 $full-layout-horizontal-spacer;
  }
}

.content {
  flex: 1 1 auto;
  padding: 2.4rem 0;
  position: relative;
}
</style>
