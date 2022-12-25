<script lang="ts" setup>
import Header from '~/components/Header.vue';
import Sidebar from '~/components/Sidebar/Sidebar.vue';
</script>

<template>
  <div :class="$style.wrapper">
    <slot name="header">
      <Header />
    </slot>

    <main :class="$style.container">
      <slot name="sidebar">
        <Sidebar />
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
}

.container {
  width: 100vw;
  max-width: $default-layout-width;
  gap: 2rem;
  padding: 0 $default-layout-horizontal-spacer;
  margin-top: $default-layout-header-height;
  display: flex;
}

.content {
  flex: 1 1 auto;
  max-width: 72rem;
  padding: 2.4rem 0;
  position: relative;
}
</style>
