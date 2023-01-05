<script lang="ts" setup>
import { computed, getCurrentInstance, inject } from 'vue';
import type { TabsContext } from '.';
import ButtonBase from '../ButtonBase.vue';

interface TabProps {
  disabled?: boolean;
}

const props = defineProps<TabProps>();

const tabsContext = inject<TabsContext>('tabs');

const currentKey = computed(() => getCurrentInstance()?.vnode.key);

const isActive = computed(
  () => !props.disabled && tabsContext?.state.selectedIndex === currentKey.value,
);

const handleChangeTab = () => {
  if (!props.disabled) {
    tabsContext?.onTabChange(currentKey?.value as string);
  }
};

const tabClasses = computed(() => {
  return {
    tab: true,
    ['tab--active']: isActive.value,
    ['tab--disabled']: props.disabled,
  };
});

const tabVariant = computed(() => {
  return tabsContext?.props.variant === 'soft-rounded' ? 'outline' : 'ghost';
});

const tabColor = computed(() => {
  return tabsContext?.props.color;
});
</script>

<template>
  <ButtonBase :variant="tabVariant" :color="tabColor" :class="tabClasses" @click="handleChangeTab">
    <slot />
  </ButtonBase>
</template>

<style scoped lang="scss">
.tab {
  margin: 0px !important;
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.tabs--enclosed {
  .tab {
    border: 1px solid;
    border-color: transparent;
    &--active {
      border-color: inherit;
      border-bottom-color: $white;
      margin-bottom: -1px !important;
    }
  }
}

.tabs--line {
  .tab {
    position: relative;
    &--active {
      &::after {
        position: absolute;
        bottom: -1px;
        left: 0;
        content: '';
        width: 100%;
        height: 2px;
        background-color: $danger;
      }
    }
  }
}
</style>
