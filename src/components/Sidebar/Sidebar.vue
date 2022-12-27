<script lang="ts" setup>
import { MENU_LINKS } from '~/configs';
import SuggestedList from './SuggestedList.vue';
import Menu from './Menu.vue';
import { UserList } from '~/mocks/users';
import DiscoverList from './DiscoverList.vue';
import ButtonBase from '../ButtonBase.vue';

interface SidebarEvents {
  (event: 'onShowModal'): void;
}
defineEmits<SidebarEvents>();
</script>

<template>
  <aside :class="$style.wrapper">
    <div :class="$style.scroll">
      <div :class="$style.inner">
        <Menu :items="MENU_LINKS" />
        <div :class="$style['action-wrap']">
          <p :class="$style['text-hint']">
            Log in to follow creators, like videos, and view comments.
          </p>
          <ButtonBase
            expanded
            variant="outline"
            :class="$style['btn-login']"
            @click="$emit('onShowModal')"
            >LOGIN</ButtonBase
          >
        </div>

        <SuggestedList label="Suggested accounts" :items="UserList" />
        <SuggestedList
          label="Following accounts"
          :items="[]"
          labelEmpty="Accounts you follow will appear here"
        />
        <DiscoverList />
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
  top: 6rem;
  bottom: 0;
  width: 35rem;
  background: $white;
  position: fixed;
  z-index: 99;
  padding-right: 0.8rem;
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
  padding-left: 0.8rem;
}
.action-wrap {
  position: relative;
  padding: 2rem 0.8rem 2.4rem 0.8rem;
  &::before {
    content: '';
    position: absolute;
    height: 1px;
    left: 8px;
    right: 8px;
    background: rgba($text, 0.12);
    transform: scaleY(0.5);
    top: 0;
  }
}
.text-hint {
  color: rgba($text, 0.5);
  font-size: 1.6rem;
  line-height: 2.2rem;
}
.btn-login {
  margin-top: 2rem;
}
</style>
