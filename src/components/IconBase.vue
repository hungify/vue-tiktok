<script lang="ts" setup>
import { computed, defineAsyncComponent, type SVGAttributes, useAttrs, useCssModule } from 'vue';
import type { IconName } from '~/interfaces/icon';

interface IconProps extends SVGAttributes {
  name: IconName;
  color?: string;
}

const props = withDefaults(defineProps<IconProps>(), {
  color: 'currentColor',
});

const currentIcon = computed(() =>
  defineAsyncComponent({
    loader: () => import(`~/assets/icons/${props.name}.svg`),
    delay: 200,
    timeout: 3000,
    suspensible: true,
  }),
);
const attrs = useAttrs();
const $style = useCssModule();
const styles = computed(() => {
  return {
    color: props.color,
    width: attrs.width || '2rem',
    height: attrs.height || '2rem',
  };
});

const classes = computed(() => {
  return [$style['icon'], attrs.class];
});
</script>

<template>
  <component :is="currentIcon" :class="classes" :style="styles" v-bind="attrs" />
</template>

<style lang="scss" module>
.icon {
  display: inline-block;
  fill: currentColor;
  vertical-align: middle;
  flex-shrink: 0;
  user-select: none;
}
</style>
