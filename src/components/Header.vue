<script lang="ts" setup>
import images from '~/assets/images';
import { BASE_MENU, ROUTES_PATH, USER_MENU } from '~/configs';
import ButtonBase from './ButtonBase.vue';
import IconBase from './IconBase.vue';
import ImageBase from './ImageBase.vue';
import PopperMenu from './Popper/PopperMenu/PopperMenu.vue';
import SearchBox from './SearchBox.vue';

interface HeaderEvents {
  (event: 'onShowModal'): void;
}
defineEmits<HeaderEvents>();

const currentUser = {};
const currentItems = !currentUser ? USER_MENU : BASE_MENU;
</script>

<template>
  <header :class="$style.wrapper">
    <div :class="$style.inner">
      <RouterLink :to="ROUTES_PATH.home" :class="$style['logo-link']">
        <img :src="images['logo']" alt="Tiktok" />
      </RouterLink>
      <SearchBox />

      <div :class="$style.actions">
        <ButtonBase color="default" variant="outline" size="md">
          <template #leftIcon>
            <IconBase name="plus" width="16" height="16" />
          </template>
          Upload
        </ButtonBase>
        <ButtonBase @click="$emit('onShowModal')">Log in</ButtonBase>
        <PopperMenu :items="currentItems">
          <template #default="_state">
            <ImageBase
              v-if="!currentUser"
              :class="$style['user-avatar']"
              src="https://files.fullstack.edu.vn/f8-prod/user_avatars/1/623d4b2d95cec.png"
              alt="Nguyen Van A"
            />
            <ButtonBase v-else :class="$style['more-btn']" variant="ghost" color="default">
              <IconBase name="ellipsis-vertical" width="24" height="24" />
            </ButtonBase>
          </template>
        </PopperMenu>
      </div>
    </div>
  </header>
</template>

<style lang="scss" module>
.wrapper {
  $search-border-radius: 92px;
  $search-height: 46px;
  $search-top-spacer: 9px;
  $search-button-width: 52px;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  width: 100%;
  height: $default-layout-header-height;
  box-shadow: 0px 1px 1px rgb(0 0 0 / 12%);
  background-color: $white;
}

.inner {
  height: 100%;
  width: 100%;
  padding: 0 $default-layout-horizontal-spacer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-link {
  display: flex;
}

// Actions
.actions {
  display: flex;
  align-items: center;
}

.more-btn {
  margin-left: 28px;
  padding: 4px 0px 3px 8px !important;
}

.action-btn {
  position: relative;
  display: flex;
  font-size: 2.2rem;
  color: $text;
  background-color: transparent;
  padding: 4px 10px;
  cursor: pointer;
}

.badge {
  position: absolute;
  top: -3px;
  right: 0px;
  padding: 0px 6px;
  height: 2rem;
  line-height: 2rem;
  border-radius: 10px;
  font-size: 1.4rem;
  font-weight: 600;
  color: $white;
  font-family: $font-primary;
  background-color: $danger;
}

.user-avatar {
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 50%;
  margin-left: 14px;
  cursor: pointer;
}
</style>
