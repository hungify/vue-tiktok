<script lang="ts" setup>
import type { BaseMenuItemLink } from '~/interfaces/layout';

interface MenuProps {
  items: BaseMenuItemLink[];
}
defineProps<MenuProps>();
</script>

<template>
  <nav :class="$style.wrapper">
    <MenuItemLink
      v-for="item in items"
      :key="item.title"
      :title="item.title"
      :icon="item.icon"
      :to="item.to"
    />
  </nav>
</template>

<style lang="scss" module>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  @media (max-width: 768px) {
    align-items: center;
  }
}
</style>
