<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { Tippy } from 'vue-tippy';
import type { BaseMenu, UserMenu } from '~/interfaces/layout';
import PopperWrapper from '../PopperWrapper.vue';
import MenuItem from './PopperMenuItem.vue';

interface MenuProps {
  items: BaseMenu[] | UserMenu[];
  hideOnClick?: boolean;
  onChange?: () => void;
}

const props = withDefaults(defineProps<MenuProps>(), {
  hideOnClick: false,
  onChange: () => {},
});
const history = reactive([{ data: props.items }]);
const current = computed(() => history[history.length - 1]);

const handleReset = () => {
  history.splice(1);
};
const _handleBack = () => {
  history.splice(history.length - 1);
};
</script>

<template>
  <Tippy
    arrow
    theme="light"
    interactive
    :delay="[0, 400]"
    :offset="[-80, 16]"
    :hide-on-click="hideOnClick"
    @hide="handleReset"
  >
    <template #default>
      <slot />
    </template>

    <template #content>
      <div :class="$style['menu-list']">
        <PopperWrapper :class="$style['menu-popper']">
          <!-- <Header title="current.title" @onBack="handleBack" v-if="history[0]" /> -->
          <div :class="$style['menu-body']">
            <template v-if="current">
              <MenuItem
                v-for="item in current.data"
                :key="item.to"
                :left-icon="item.icon"
                :title="item.title"
                :to="item.to"
              />
            </template>
          </div>
        </PopperWrapper>
      </div>
    </template>
  </Tippy>
</template>

<style lang="scss" module>
.menu-list {
  width: pxToRem(324px);

  .menu-item {
    margin-left: 0;
  }
}

.menu-popper {
  padding-bottom: 8px;
}

.menu-body {
  overflow-y: auto;
}
</style>
