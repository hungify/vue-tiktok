<script lang="ts" setup>
import { computed, useCssModule } from 'vue';
import ButtonBase from '~/components/ButtonBase.vue';
import IconBase from '~/components/IconBase.vue';
import type { IconName } from '~/interfaces/icon';

interface MenuItemProps {
  to?: string;
  leftIcon: IconName;
  title: string;
  separated?: boolean;
}
const props = defineProps<MenuItemProps>();
interface MenuItemEvents {
  (eventName: 'onClick'): void;
}
defineEmits<MenuItemEvents>();

const $style = useCssModule();

const buttonClasses = computed(() => {
  return [$style['menu-item'], props.separated ? $style['menu-item--separated'] : ''];
});
</script>

<template>
  <div :class="$style.wrapper">
    <ButtonBase :to="to" :class="buttonClasses" @click="$emit('onClick')">
      <template #leftIcon>
        <IconBase :name="leftIcon" />
      </template>
      {{ title }}
    </ButtonBase>
  </div>
</template>

<style lang="scss" module>
.menu-item {
  width: 100%;
  justify-content: flex-start;
  border-radius: 0;
  padding: 11px 16px;
  line-height: 1.8rem;
  font-weight: 600;

  &.separate {
    border-top: 1px solid rgba(22, 24, 35, 0.12);
  }

  &:hover {
    background-color: rgba(22, 24, 35, 0.03);
  }
}
</style>
