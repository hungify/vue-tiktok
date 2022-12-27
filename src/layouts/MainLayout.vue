<script lang="ts" setup>
import { computed, useCssModule, ref } from 'vue';
import Header from '~/components/Header.vue';
import Sidebar from '~/components/Sidebar/Sidebar.vue';
import { useSessionStorage } from '@vueuse/core';
import AuthModal from '~/components/AuthModal/AuthModal.vue';
interface MainLayoutProps {
  full?: boolean;
}
const props = withDefaults(defineProps<MainLayoutProps>(), {
  full: false,
});
const $style = useCssModule();

const layoutClasses = computed(() => {
  return [$style.wrapper, props.full && $style.full];
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

    <main :class="$style.container">
      <slot name="sidebar">
        <Sidebar @onShowModal="handleShowModal" />
      </slot>

      <div :class="$style.content">
        <slot />
      </div>
    </main>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: $default-layout-width;
  margin: 0 auto;
  &.full {
    max-width: 100%;
  }
}

.container {
  width: 100%;
  gap: 2rem;
  padding: 0 $default-layout-horizontal-spacer;
  margin-top: $default-layout-header-height;
  display: flex;
}

.content {
  flex: 1 1 auto;
  padding: 2.4rem 0;
  position: relative;
}
</style>
