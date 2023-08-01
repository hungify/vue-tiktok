<script lang="ts" setup>
import { MENU_LINKS } from '~/configs';
import { UserList } from '~/mocks/users';

interface SidebarEvents {
  (event: 'onShowModal'): void;
}
defineEmits<SidebarEvents>();
</script>

<template>
  <div :class="$style.scroll">
    <div :class="$style.inner">
      <Menu :items="MENU_LINKS" />
      <div :class="$style['action-wrap']">
        <div :class="$style['action-inner']">
          <p :class="$style['text-hint']">
            Log in to follow creators, like videos, and view comments.
          </p>
          <ButtonBase
            expanded
            variant="outline"
            :class="$style['btn-login']"
            @click="$emit('onShowModal')"
          >
            LOGIN
          </ButtonBase>
          <SuggestedList label="Suggested accounts" :items="UserList" />
          <SuggestedList
            label="Following accounts"
            :items="[]"
            labelEmpty="Accounts you follow will appear here"
          />
          <DiscoverList />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.scroll {
  height: 100%;
  width: 100%;

  @media (min-width: 769px) {
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior-y: contain;
    perspective: 1px;
    transform-style: preserve-3d;
    perspective-origin: right top;
    top: 6rem;
    bottom: 0;
    background: $white;
    position: fixed;
    width: inherit;
  }
}

.inner {
  height: 100%;
}

.action-inner {
  @media (max-width: 768px) {
    display: none;
  }
}
.action-inner {
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
