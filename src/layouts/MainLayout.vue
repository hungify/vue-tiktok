<script lang="ts" setup>
import { useSlots } from 'vue';
import Header from '~/components/Header.vue';
import Sidebar from '~/components/Sidebar/Sidebar.vue';

const slots = useSlots();
</script>

<template>
  <div :class="classes.wrapper">
    <slot name="header">
      <Header />
    </slot>

    <main :class="classes.container">
      <slot name="sidebar">
        <Sidebar />
      </slot>
      <div v-if="slots.content" :class="classes.content">
        <slot />
      </div>
    </main>
  </div>
</template>

<style lang="scss" module="classes">
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  width: $default-layout-width;
  max-width: 100%;
  padding: 0 $default-layout-horizontal-spacer;
  margin-top: $default-layout-header-height;
  display: flex;
}

.content {
  flex: 1;
}
</style>
