<script lang="ts" setup>
import images from '~/assets/images';
import { BASE_MENU, ROUTES_PATH, USER_MENU } from '~/configs';
import type { BaseMenuItem } from '~/interfaces/layout';
import { Tippy } from 'vue-tippy';

interface HeaderEvents {
  (event: 'onShowModal'): void;
}
defineEmits<HeaderEvents>();

const router = useRouter();

const currentUser = {};

const menuItems = reactive<{ data: BaseMenuItem[] }>({
  data: !currentUser ? USER_MENU : BASE_MENU,
});

const isShowModal = ref(false);

const isDarkMode = ref(false);

const hasSubMenu = computed(() => !menuItems.data?.[0]?.children);

const handleMenuItemClick = (item: BaseMenuItem) => {
  if (item.to) {
    if (item.to.startsWith('http')) {
      window.open(item.to, '_blank');
    } else {
      void router.push(item.to);
    }
  } else if (item?.children) {
    menuItems.data = item.children;
  } else {
    isShowModal.value = true;
  }
};

const handleBack = () => {
  menuItems.data = !currentUser ? USER_MENU : BASE_MENU;
};
</script>

<template>
  <ModalShortcut v-model="isShowModal" />

  <div class="header-container">
    <RouterLink :to="ROUTES_PATH.home" class="logo-link">
      <img :src="images['logo']" alt="Tiktok" />
    </RouterLink>

    <SearchBox />

    <div class="actions">
      <ButtonBase color="default" variant="outline" size="sm">
        <template #leftIcon>
          <IconBase name="plus" width="16" height="16" />
        </template>
        Upload
      </ButtonBase>
      <ButtonBase size="sm" @click="$emit('onShowModal')">Log in</ButtonBase>

      <Tippy
        arrow
        theme="light"
        interactive
        :delay="[0, 400]"
        :offset="[-80, 16]"
        @hide="handleBack"
      >
        <template #default>
          <ImageBase
            v-if="!currentUser"
            class="user-avatar']"
            src="https://files.fullstack.edu.vn/f8-prod/user_avatars/1/623d4b2d95cec.png"
            alt="Nguyen Van A"
          />
          <ButtonBase v-else class="more-btn" variant="ghost" color="default">
            <IconBase name="ellipsis-vertical" width="24" height="24" />
          </ButtonBase>
        </template>

        <template #content>
          <BoxPopper class="menu-popper">
            <div class="menu-body">
              <div v-show="hasSubMenu" class="menu-header">
                <ButtonBase size="sm" variant="solid" color="default" @click="handleBack">
                  <template #leftIcon>
                    <IconBase name="chevron-left" />
                  </template>
                </ButtonBase>
                <span class="menu-title">Language</span>
              </div>
              <div v-for="(item, index) in menuItems.data" :key="index" class="wrapper">
                <ButtonBase
                  class="menu-item"
                  variant="ghost"
                  color="default"
                  @click="handleMenuItemClick(item)"
                >
                  <template #leftIcon>
                    <IconBase v-if="item.icon" :name="item.icon" />
                  </template>
                  {{ item.title }}
                </ButtonBase>
              </div>
            </div>

            <ButtonBase
              v-show="!hasSubMenu"
              class="menu-item"
              size="md"
              variant="ghost"
              color="default"
              @click.prevent
            >
              <template #leftIcon>
                <IconBase name="moon" />
              </template>

              <span class="menu-item-text"> Dark mode </span>
              <SwitchBase v-model="isDarkMode" size="lg" class="switcher" />
            </ButtonBase>
          </BoxPopper>
        </template>
      </Tippy>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-container {
  height: 100%;
  width: 100%;
  padding: 0 $default-layout-horizontal-spacer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo-link {
    display: flex;
  }

  .actions {
    display: flex;
    align-items: center;
    height: 100%;
    gap: 1rem;

    > button {
      min-width: 7rem;
      min-height: 2.25rem;
      padding: 0;
    }
  }

  .more-btn {
    padding: 0 !important;
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

  .menu-header {
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    background: $white;
  }
}

.menu-popper {
  .menu-title {
    font-size: 1.6rem;
    font-weight: 600;
  }

  .menu-popper {
    width: 24rem;
    padding-bottom: 8px;
  }

  .menu-body {
    overflow-y: auto;
  }

  .menu-item {
    display: flex;
    width: 100%;
    align-items: center;
    text-align: left;
    border-radius: 0;
    font-weight: 600;
    font-size: 1.6rem;
    transition: all 0.2s ease-in-out 0.1ms;
    padding-left: 1rem;
    &:hover {
      background-color: rgba(22, 24, 35, 0.08);
    }
  }

  .menu-item-text {
    margin-right: 0.5rem;
  }

  .switcher {
    margin-left: auto;
  }
}
</style>
