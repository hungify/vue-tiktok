<script lang="ts" setup>
import { computed, provide, reactive } from 'vue';
import type {
  NumberOrString,
  TabsAlign,
  TabsContext,
  TabsOrientation,
  TabsVariant,
  TabsColor,
} from '.';

export interface TabsProps {
  modelValue: NumberOrString;
  align?: TabsAlign;
  orientation?: TabsOrientation;
  variant?: TabsVariant;
  color?: TabsColor;
}
const props = withDefaults(defineProps<TabsProps>(), {
  align: 'start',
  orientation: 'horizontal',
  variant: 'enclosed',
  color: 'danger',
});

interface TabsEvents {
  (event: 'update:modelValue', value: NumberOrString): void;
}
const emit = defineEmits<TabsEvents>();

const state = reactive({
  selectedIndex: computed(() => props.modelValue),
});

const onTabChange = (tab: NumberOrString) => {
  emit('update:modelValue', tab);
};

provide<TabsContext>('tabs', {
  state,
  onTabChange,
  props,
});

const tabsCssVariables = computed(() => {
  const { align, orientation } = props;
  return {
    '--tabs-display': props.orientation === 'vertical' ? 'flex' : 'block',
    '--tab-list-align': align?.includes('start' || 'end') ? `flex-${align}` : 'center',
    '--tab-list-orientation': orientation === 'vertical' ? 'column' : 'row',
  };
});

const tabsClasses = computed(() => {
  return {
    [`tabs--${props.variant}`]: !!props.variant,
  };
});
</script>

<template>
  <div class="tabs" :style="tabsCssVariables" :class="tabsClasses">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.tabs {
  display: var(--tabs-display);
  &--enclosed {
    border-color: #e2e8f0;
  }
  &--line {
    border-color: #e2e8f0;
  }
}
</style>
