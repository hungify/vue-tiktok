<script lang="ts" setup>
import { SHORT_CUTS } from '~/constants/shortcuts';
import type { IconName } from '~/interfaces/icon';

interface Shortcut {
  title: string;
  icon: IconName;
}

interface ShortcutProps {
  modelValue: boolean;
}

const props = defineProps<ShortcutProps>();

interface ShortcutEvents {
  (eventName: 'update:modelValue', event: boolean): void;
}
defineEmits<ShortcutEvents>();

const shortcuts = reactive<Shortcut[]>(SHORT_CUTS as Shortcut[]);
const isShowModal = ref(props.modelValue);

watch(
  () => props.modelValue,
  (value) => {
    isShowModal.value = value;
  },
);
</script>

<template>
  <ModalBase
    v-model="isShowModal"
    size="md"
    :headerClass="$style['shortcut-header']"
    :bodyClass="$style['shortcut-body']"
    :footerClass="$style['shortcut-footer']"
    @onClose="$emit('update:modelValue', false)"
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
</template>

<style lang="scss" module>
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
