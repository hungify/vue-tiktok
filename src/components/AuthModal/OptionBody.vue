<script lang="ts" setup>
import ButtonBase from '~/components/ButtonBase.vue';
import IconBase from '~/components/IconBase.vue';

interface OptionBodyEvents {
  (eventName: 'onSelect', option: 'qr' | 'form'): void;
}

const emits = defineEmits<OptionBodyEvents>();

const handleSelectOption = (option: 'qr' | 'form') => {
  emits('onSelect', option);
};
</script>

<template>
  <div class="option-list">
    <ButtonBase color="default" class="btn-option" @click="handleSelectOption('qr')">
      <template #leftIcon>
        <IconBase name="qr" />
      </template>
      Sử dụng mã QR
    </ButtonBase>
    <ButtonBase color="default" class="btn-option" @click="handleSelectOption('form')">
      <template #leftIcon>
        <IconBase name="user" />
      </template>
      Số điện thoại / Email / TikTok ID
    </ButtonBase>
    <ButtonBase color="default" class="btn-option">
      <template #leftIcon>
        <IconBase name="facebook" />
      </template>
      Tiếp tục với Facebook
    </ButtonBase>
    <ButtonBase color="default" class="btn-option">
      <template #leftIcon>
        <IconBase name="twitter" />
      </template>
      Tiếp tục với Twitter
    </ButtonBase>
    <ButtonBase color="default" class="btn-option">
      <template #leftIcon>
        <IconBase name="apple" />
      </template>
      Tiếp tục với Apple
    </ButtonBase>
    <ButtonBase color="default" class="btn-option">
      <template #leftIcon>
        <IconBase name="instagram" />
      </template>
      Tiếp tục với Instagram
    </ButtonBase>
  </div>
</template>

<style lang="scss" scoped>
.option-list {
  display: flex;
  flex-direction: column;
  gap: pxToRem(22px);
  max-height: pxToRem(600px);
}

.btn-option {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1rem;
  padding: pxToRem(18px);
  border: 1px solid rgba(22, 24, 35, 0.12);
  font-size: pxToRem(26px);
  &:not(:first-child) {
    margin-left: 0;
  }
}
</style>
