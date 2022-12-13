<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { Tippy } from 'vue-tippy';
import ButtonBase from '~/components/ButtonBase.vue';
import IconBase from '~/components/IconBase.vue';
import ModalBase from '~/components/ModalBase.vue';
import SwitchBase from '~/components/SwitchBase.vue';
import { SHORT_CUTS } from '~/constants/shortcuts';
import type { IconName } from '~/interfaces/icon';
import type { BaseMenu, MenuItemLangue } from '~/interfaces/layout';
import PopperWrapper from '../PopperWrapper.vue';
import MenuItem from './PopperMenuItem.vue';

type Menu = BaseMenu[] | MenuItemLangue;

interface Shortcut {
  title: string;
  icon: IconName;
}

interface PopperMenuProps {
  items: BaseMenu[];
  hideOnClick?: boolean;
}

const props = withDefaults(defineProps<PopperMenuProps>(), {
  hideOnClick: false,
});

const menuItems = reactive<{ data: Menu }>({ data: props.items });
const isShowModal = ref(false);
const shortcuts = reactive<Shortcut[]>(SHORT_CUTS as Shortcut[]);

const currentMenuList = computed(() => {
  if (Array.isArray(menuItems.data)) {
    return menuItems.data;
  } else {
    return menuItems.data.languages;
  }
});

const titleSubMenu = computed(() => !Array.isArray(menuItems.data) && menuItems.data.title);

const isDarkMode = ref(false);

const handleReset = () => {};

const handleChange = (item: BaseMenu, _evt: Event) => {
  if (item.icon === 'earth-asia') {
    menuItems.data = item;
  } else if (item.icon === 'question' && item?.to) {
    window.open(item.to, '_blank');
  } else if (item.icon === 'keyboard') {
    isShowModal.value = true;
  }
};

const handleBack = () => {
  menuItems.data = props.items;
};
</script>

<template>
  <ModalBase
    v-model="isShowModal"
    size="md"
    :headerClass="$style['shortcut-header']"
    :bodyClass="$style['shortcut-body']"
    :footerClass="$style['shortcut-footer']"
  >
    <template #default>
      <h1 :class="$style.title">Keyboard shortcuts</h1>
      <ul :class="$style['shortcut-list']">
        <li v-for="shortcut in shortcuts" :key="shortcut.icon" :class="$style['shortcut-item']">
          {{ shortcut.title }}
          <IconBase :name="shortcut.icon" />
        </li>
      </ul>
    </template>
  </ModalBase>

  <Tippy
    arrow
    theme="light"
    interactive
    :delay="[0, 4000000]"
    :offset="[-80, 16]"
    @hide="handleReset"
  >
    <template #default>
      <slot />
    </template>

    <template #content>
      <div :class="$style['menu-list']">
        <PopperWrapper :class="$style['menu-popper']">
          <div :class="$style['menu-body']">
            <div v-show="titleSubMenu" :class="$style['menu-header']">
              <ButtonBase size="sm" variant="solid" color="default" @click="handleBack">
                <template #leftIcon>
                  <IconBase name="chevron-left" />
                </template>
              </ButtonBase>
              <span :class="$style['menu-title']">{{ titleSubMenu }}</span>
            </div>
            <MenuItem
              v-for="(item, index) in currentMenuList"
              :key="index"
              v-bind="item"
              @onClick="(event) => handleChange(item, event)"
            />
          </div>
          <div v-show="!titleSubMenu" :class="$style['menu-item']">
            <ButtonBase size="md" variant="ghost" color="default">
              Dark mode
              <template #leftIcon>
                <IconBase name="moon" />
              </template>
            </ButtonBase>
            <div :class="$style['menu-item-switch']">
              <SwitchBase id="switcher" v-model="isDarkMode" size="lg" />
            </div>
          </div>
        </PopperWrapper>
      </div>
    </template>
  </Tippy>
</template>

<style lang="scss" module>
.menu-list {
  width: 24rem;
  .menu-header {
    display: flex;
    align-items: center;
  }

  .menu-title {
    font-size: 1.5rem;
    font-weight: 600;
    flex: 1 1 auto;
  }
}

.menu-popper {
  padding-bottom: 8px;
}

.menu-body {
  overflow-y: auto;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0;
  font-weight: 500;
  transition: all 0.2s ease-in-out 0.1ms;
  &:hover {
    background-color: rgba(22, 24, 35, 0.08);
  }
}

.menu-item-switch {
  margin-right: 1.6rem;
}
.shortcut {
  &-header {
    padding: 0 !important;
    padding-top: 1rem !important;
    padding-right: 1rem !important;
  }

  &-body {
    height: 28rem !important;
    padding: 3.2rem !important;
    padding-top: 0 !important;
    .title {
      text-align: center;
    }
  }

  &-footer {
    display: none !important;
  }

  &-list {
    margin-top: 1.6rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid rgba(22, 24, 35, 0.12);
  }

  &-item {
    font-weight: 400;
    font-size: 1.5rem;
    width: 100%;
    padding: 1.5rem 0;
    text-align: left;
    color: rgb(22, 24, 35);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(22, 24, 35, 0.12);
  }
}
</style>
