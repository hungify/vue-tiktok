<script lang="ts" setup>
import { ref } from 'vue';
import ButtonBase from '../ButtonBase.vue';
import IconBase from '../IconBase.vue';
import ModalBase from '../ModalBase.vue';
import AuthBody from './AuthBody.vue';
import QrBody from './QrBody.vue';

const isOpen = ref(true);
</script>

<template>
  <ButtonBase @click="isOpen = !isOpen">Open Modal</ButtonBase>
  <ModalBase
    v-model="isOpen"
    size="lg"
    scrollBehavior="inside"
    footerClass="auth-footer"
    headerClass="auth-header"
    bodyClass="auth-body"
  >
    <template #header>
      <ButtonBase variant="ghost" color="default" size="xs" rounded class="btn-back">
        <IconBase name="chevron-left" />
      </ButtonBase>
    </template>
    <template #default>
      <h1 class="title">Đăng nhập vào TikTok</h1>
      <!-- <AuthBody /> -->
      <QrBody />
    </template>
    <template #footer>
      <div class="auth-footer-inner">
        Bạn không có tài khoản?
        <span>Đăng ký</span>
      </div>
    </template>
  </ModalBase>
</template>

<style lang="scss" scoped>
.title {
  text-align: center;
  margin-bottom: pxToRem(70px);
  font-size: 3.2rem;
}
.btn-back {
  width: 4rem;
  height: 4rem;
}

:global(.auth-header) {
  padding: pxToRem(44px) 0.5rem !important;
}

:global(.auth-body) {
  padding: 0 pxToRem(80px) !important;
}

:global(.auth-footer) {
  padding: pxToRem(32px) 0 !important;
  border-top: 1px solid rgba(22, 24, 35, 0.12);
}

.auth-footer-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  span {
    color: $danger;
    font-weight: 600;
    margin-left: 4px;
  }
}
</style>
