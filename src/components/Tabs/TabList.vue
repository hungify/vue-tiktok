<script setup lang="ts">
import type { TabsContext } from '.';

const tabsContext = inject<TabsContext>('tabs');

const WIDTH = 346;

const activeSlider = computed(() => {
  const selectedIndex = tabsContext?.state?.selectedIndex; // 1, 2, ...
  if (Number(selectedIndex) > 1) {
    return {
      '--translate-x': `${(Number(selectedIndex) - 1) * WIDTH}px`,
      '--width': `${WIDTH}px`,
    };
  } else {
    return {
      '--width': `${WIDTH}px`,
    };
  }
});
</script>

<template>
  <div class="tab-list">
    <slot />
    <div class="active-line" :style="activeSlider" />
  </div>
</template>

<style scoped lang="scss">
.tab-list {
  display: flex;
  justify-content: var(--tab-list-align);
  flex-direction: var(--tab-list-orientation);
  position: relative;

  .active-line {
    background-color: red;
    bottom: 0;
    height: 3px;
    left: 0;
    position: absolute;
    transition: all 0.3s ease;
    width: var(--width);
    transform: translateX(var(--translate-x));
  }
}
.tabs--enclosed {
  .tab-list {
    border: 1px solid;
    border-color: inherit;
  }
}

.tabs--line {
  .tab-list {
    border-bottom: 1px solid;
    border-color: inherit;
  }
}
</style>
