<script lang="ts" setup></script>

<template>
  <h1 class="title">Đăng nhập vào TikTok</h1>
  <div class="option-list">
    <ButtonBase size="xl" class="btn-option">
      <template #leftIcon>
        <IconBase name="qr" />
      </template>
      Sử dụng mã QR
    </ButtonBase>
    <ButtonBase size="xl" class="btn-option">
      <template #leftIcon>
        <IconBase name="user" />
      </template>
      Số điện thoại / Email / TikTok ID
    </ButtonBase>
    <ButtonBase size="xl" class="btn-option">
      <template #leftIcon>
        <IconBase name="facebook" />
      </template>
      Tiếp tục với Facebook
    </ButtonBase>
    <ButtonBase size="xl" class="btn-option">
      <template #leftIcon>
        <IconBase name="twitter" />
      </template>
      Tiếp tục với Twitter
    </ButtonBase>
    <ButtonBase size="xl" class="btn-option">
      <template #leftIcon>
        <IconBase name="apple" />
      </template>
      Tiếp tục với Apple
    </ButtonBase>
    <ButtonBase size="xl" class="btn-option">
      <template #leftIcon>
        <IconBase name="instagram" />
      </template>
      Tiếp tục với Instagram
    </ButtonBase>
  </div>
</template>

<style lang="scss" scoped>
.title {
  text-align: center;
  margin-bottom: pxToRem(16px);
}

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
