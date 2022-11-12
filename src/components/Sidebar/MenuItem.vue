<script lang="ts" setup>
import { computed } from 'vue';
import type { IconName } from '~/interfaces/icon';
import IconBase from '../IconBase.vue';
import { RouterLink } from 'vue-router';

interface MenuItemProps {
  title: string;
  to: string;
  icon: IconName;
  active?: boolean;
}
const props = defineProps<MenuItemProps>();

const classes = computed(() => {
  return {
    'menu-item': true,
    'menu-item--active': props.active,
  };
});
</script>

<template>
  <div class="menu-item-wrapper">
    <RouterLink :to="to" :class="classes">
      <IconBase :name="icon" width="32" height="32" />
      <span>
        {{ title }}
      </span>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.menu-item-wrapper {
  .menu-item {
    display: flex;
    align-items: center;
    padding: 8px;
    font-size: 1.8rem;
    font-weight: 700;
    border-radius: 4px;
    color: var(--text-color);
    transition: background-color ease-in-out 200ms;

    &--active {
      color: var(--primary);

      .icon {
        display: none;
      }

      .active-icon {
        display: flex;
      }
    }

    &:hover {
      background-color: rgba(22, 24, 35, 0.03);
    }

    &.router-link-active {
      color: $primary;
    }
  }

  .title {
    margin-left: 10px;
  }

  .icon,
  .active-icon {
    display: flex;
  }

  .active-icon {
    display: none;
  }
}
</style>
