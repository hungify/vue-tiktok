<script lang="ts" setup>
import type { SVGAttributes } from 'vue';
import type { IconName } from '~/interfaces/icon';

interface IconProps extends SVGAttributes {
  name: IconName;
}

const props = defineProps<IconProps>();

const attrs = useAttrs();

const currentIcon = computed(() =>
  defineAsyncComponent(() => import(`~/assets/icons/${props.name}.svg?component`)),
);

const styles = computed(() => ({
  width: attrs.width || '1.5rem',
  height: attrs.height || '1.5rem',
}));
</script>

<template><Component :is="currentIcon" :style="styles" class="icon" /></template>

<style scoped>
.icon {
  display: inline-block;
  fill: currentColor;
  vertical-align: middle;
  flex-shrink: 0;
  user-select: none;
}
</style>
