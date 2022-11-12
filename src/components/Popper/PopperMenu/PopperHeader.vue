<script lang="ts" setup>
import ButtonBase from '~/components/ButtonBase.vue';
import IconBase from '~/components/IconBase.vue';

interface HeaderProps {
  title: string;
}
defineProps<HeaderProps>();

interface HeaderEvents {
  (eventName: 'onBack'): void;
}
defineEmits<HeaderEvents>();
</script>

<template>
  <header class="wrapper">
    <ButtonBase class="back-btn" @click="$emit('onBack')">
      <IconBase name="check" />
    </ButtonBase>
    <h4 class="title">{{ title }}</h4>
  </header>
</template>

<style lang="scss">
.wrapper {
  position: relative;
  flex-shrink: 0;
  height: pxToRem(50px);
  margin-top: -8px;

  .back-btn {
    width: pxToRem(50px);
    height: 100%;
    background-color: transparent;
    cursor: pointer;
  }

  .title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
