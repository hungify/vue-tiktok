<script lang="ts" setup>
import { computed, useCssModule } from 'vue';

interface MainLayoutProps {
  full?: boolean;
}
const props = withDefaults(defineProps<MainLayoutProps>(), {
  full: false,
});
const $style = useCssModule();

const layoutClasses = computed(() => {
  return [$style['blank-wrapper'], props.full && $style.full];
});

const containerClasses = computed(() => {
  return [$style['blank-container'], props.full && $style.full];
});
</script>

<template>
  <div :class="layoutClasses">
    <main :class="containerClasses">
      <div :class="$style.content">
        <slot />
      </div>
    </main>
  </div>
</template>

<style lang="scss" module>
.blank-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  &.full {
    max-width: 100%;
  }
}

.blank-container {
  width: 100%;
  display: flex;
  &.full {
    padding: 0 $full-layout-horizontal-spacer;
  }
}

.content {
  flex: 1 1 auto;
  position: relative;
}
</style>
