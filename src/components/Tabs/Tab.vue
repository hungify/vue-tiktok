<script lang="ts" setup>
import type { IconName } from '~/interfaces/icon';
import type { TabsContext } from '.';

interface TabProps {
  disabled?: boolean;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
}

const props = withDefaults(defineProps<TabProps>(), {
  disabled: false,
  icon: undefined,
  iconPosition: 'left',
});

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
  return isActive.value ? tabsContext?.props.color : 'default';
});

const getSlotName = (iconPosition: string) => {
  return iconPosition + 'Icon';
};
</script>

<template>
  <ButtonBase
    :variant="tabVariant"
    :color="tabColor"
    :class="tabClasses"
    :expanded="tabsContext?.props.fitted"
    titleClass="tab-title"
    @click="handleChangeTab"
  >
    <template v-if="icon" #[getSlotName(iconPosition)]>
      <IconBase v-if="icon" :name="icon" width="18" height="18" />
    </template>
    <slot />
  </ButtonBase>
</template>

<style scoped lang="scss">
.tab {
  margin: 0px !important;
  :deep(.tab-title) {
    flex: 0;
  }
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
