<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import type { IconName } from '~/interfaces/icon';
import IconBase from '../IconBase.vue';

interface MenuItemProps {
  title: string;
  to: string;
  icon: IconName;
}
defineProps<MenuItemProps>();
</script>

<template>
  <div class="menu-item-wrapper">
    <RouterLink :to="to" class="menu-item">
      <IconBase :name="icon" width="32" height="32" />
      <span class="title">
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
    padding: 8px 0;
    font-size: 1.8rem;
    font-weight: 700;
    border-radius: 4px;
    color: $text;
    transition: background-color ease-in-out 200ms;

    &.router-link-active {
      color: $danger;
    }

    &:hover {
      background-color: rgba(22, 24, 35, 0.03);
    }
  }

  .title {
    margin-left: 10px;
  }
}
</style>
