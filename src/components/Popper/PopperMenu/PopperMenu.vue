<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { Tippy } from 'vue-tippy';
import ButtonBase from '~/components/ButtonBase.vue';
import IconBase from '~/components/IconBase.vue';
import ModalShortcut from '~/components/ModalShortcut.vue';
import SwitchBase from '~/components/SwitchBase.vue';
import type { BaseMenuItem } from '~/interfaces/layout';
import PopperWrapper from '../PopperWrapper.vue';
import PopperMenuItem from './PopperMenuItem.vue';

interface PopperMenuProps {
  items: BaseMenuItem[];
  hideOnClick?: boolean;
}

const props = withDefaults(defineProps<PopperMenuProps>(), {
  hideOnClick: false,
});

const menuItems = reactive<{ data: BaseMenuItem[] }>({ data: props.items });
const isShowModal = ref(false);

const isSubMenu = computed(() => !menuItems.data?.[0]?.children);

const isDarkMode = ref(false);

const handleReset = () => {};

const handleMenuItemClick = (item: BaseMenuItem, _evt: Event) => {
  if (item?.children) {
    menuItems.data = item.children;
  } else if (item?.to) {
    window.open(item.to, '_blank');
  } else {
    isShowModal.value = true;
  }
};

const handleBack = () => {
  menuItems.data = props.items;
};
</script>

<template>
  <ModalShortcut v-model="isShowModal" />
  <Tippy arrow theme="light" interactive :delay="[0, 400]" :offset="[-80, 16]" @hide="handleReset">
    <template #default>
      <slot />
    </template>

    <template #content>
      <div :class="$style['menu-list']">
        <PopperWrapper :class="$style['menu-popper']">
          <div :class="$style['menu-body']">
            <div v-show="isSubMenu" :class="$style['menu-header']">
              <ButtonBase size="sm" variant="solid" color="default" @click="handleBack">
                <template #leftIcon>
                  <IconBase name="chevron-left" />
                </template>
              </ButtonBase>
              <span :class="$style['menu-title']">Language</span>
            </div>
            <PopperMenuItem
              v-for="(item, index) in menuItems.data"
              :key="index"
              :title="item.title"
              :to="item.to"
              :icon="item.icon"
              @onClick="(event) => handleMenuItemClick(item, event)"
            />
          </div>
          <div v-show="!isSubMenu" :class="$style['menu-item']">
            <ButtonBase size="md" variant="ghost" color="default" :class="$style['btn-menu-item']">
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
    position: sticky;
    top: 0;
    background: $white;
  }
  .menu-title {
    font-size: 1.6rem;
    font-weight: 600;
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

.btn-menu-item {
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 0;
}

.menu-item-switch {
  margin-right: 1.6rem;
}
</style>
