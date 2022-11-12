<script lang="ts" setup>
import Menu from './Menu.vue';
import { MENU_LINKS } from '~/configs';
import MenuItem from './MenuItem.vue';
import SuggestedAccounts from '../SuggestedAccounts/SuggestedAccounts.vue';
</script>

<template>
  <aside :class="$style.wrapper">
    <Menu>
      <template v-for="item in MENU_LINKS" :key="item.title">
        <MenuItem :title="item.title" :icon="item.icon" :to="item.to" />
      </template>
    </Menu>
    <SuggestedAccounts label="Suggested accounts" />
    <SuggestedAccounts label="Following accounts" />
  </aside>
</template>
<style lang="scss" module>
.wrapper {
  width: 356px;
  padding: 20px 0 26px 8px;
  margin-left: -18px;
}
</style>
