<script setup lang="ts">
import { inject, computed, getCurrentInstance } from 'vue';
import type { TabsContext } from '.';

const tabsContext = inject<TabsContext>('tabs');
const isActive = computed(() => tabsContext?.state.selectedIndex === currentKey.value);
const currentKey = computed(() => getCurrentInstance()?.vnode.key);
</script>

<template>
  <div class="tab-panel" :class="{ active: isActive }">
    <slot />
  </div>
</template>

<style scoped>
.tab-panel {
  padding: 10px;
  width: 100%;
  white-space: initial;
  vertical-align: top;
  display: none;
}
.active {
  display: inline-block;
}
</style>
