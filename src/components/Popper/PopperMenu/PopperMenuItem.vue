<script lang="ts" setup>
import { useRouter } from 'vue-router';
import ButtonBase from '~/components/ButtonBase.vue';
import IconBase from '~/components/IconBase.vue';
import type { IconName } from '~/interfaces/icon';

interface BaseMenuItem {
  title: string;
  to?: string;
  icon?: IconName;
  children?: BaseMenuItem[];
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MenuItemProps extends BaseMenuItem {}

const props = defineProps<MenuItemProps>();

interface MenuItemEvents {
  (eventName: 'onClick', event: Event): void;
}
const emit = defineEmits<MenuItemEvents>();

const router = useRouter();

const handleClick = (event: Event) => {
  if (props.to) {
    router.push(props.to);
  }
  emit('onClick', event);
};
</script>

<template>
  <div class="wrapper">
    <ButtonBase class="menu-item" variant="ghost" color="default" @click="handleClick">
      <template #leftIcon>
        <IconBase v-if="icon" :name="icon" />
      </template>
      {{ title }}
    </ButtonBase>
  </div>
</template>

<style lang="scss" scoped>
.menu-item {
  width: 100%;
  border-radius: 0;
  text-align: left;
  font-weight: 700;

  &:hover {
    background-color: rgba(22, 24, 35, 0.08);
  }
}
</style>
