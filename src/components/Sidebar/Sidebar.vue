<script lang="ts" setup>
import { MENU_LINKS } from '~/configs';
import SuggestedAccounts from '../SuggestedAccounts/SuggestedAccounts.vue';
import Menu from './Menu.vue';
</script>

<template>
  <aside :class="$style.wrapper">
    <div :class="$style.scroll">
      <div :class="$style.inner">
        <Menu :items="MENU_LINKS" />
        <SuggestedAccounts label="Suggested accounts" />
        <SuggestedAccounts label="Following accounts" />
      </div>
    </div>
  </aside>
</template>
<style lang="scss" module>
.wrapper {
  position: relative;
  z-index: 0;
  width: 356px;
  flex: 0 0 356px;
}

.scroll {
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  perspective: 1px;
  transform-style: preserve-3d;
  padding-right: 12px;
  perspective-origin: right top;
  top: 60px;
  bottom: 0;
  width: 356px;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  z-index: 99;
  padding-right: 8px;
}

.inner {
  flex-shrink: 0;
  padding: 20px 0 26px;
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100%;
  padding-left: 8px;
}
</style>
