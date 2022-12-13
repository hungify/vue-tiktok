<script lang="ts" setup>
import { computed, useCssModule } from 'vue';
import ButtonBase from '~/components/ButtonBase.vue';
import IconBase from '~/components/IconBase.vue';
import type { IconName } from '~/interfaces/icon';

interface MenuItemProps {
  title: string;
  to?: string | '';
  icon?: IconName | '';
}
withDefaults(defineProps<MenuItemProps>(), {
  to: '',
  icon: '',
});

interface MenuItemEvents {
  (eventName: 'onClick', event: Event): void;
}
defineEmits<MenuItemEvents>();

const $style = useCssModule();

const buttonClasses = computed(() => {
  return [$style['menu-item']];
});
</script>

<template>
  <div :class="$style.wrapper">
    <ButtonBase
      :class="buttonClasses"
      variant="ghost"
      color="default"
      v-bind="to ? { to } : {}"
      @click="$emit('onClick', $event)"
    >
      <template #leftIcon>
        <IconBase v-if="icon" :name="icon" />
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
  padding: 1rem 1.6rem;
  line-height: 1.8rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out 0.1ms;

  &:hover {
    background-color: rgba(22, 24, 35, 0.08);
  }
}
</style>
