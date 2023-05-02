<script lang="ts" setup>
import images from '~/assets/images';
</script>

<template>
  <div class="login-qr-code-container">
    <div class="login-qr-code-inner">
      <div class="login-qr-code-img">
        <img :src="images.qrCode" alt="qr-code" />
      </div>
      <div class="login-qr-code-step">
        <p>1. Mở ứng dụng TikTok trên thiết bị di động của bạn</p>
        <p>2. Trên Hồ sơ, nhấn vào <IconBase name="user-plus" /></p>
        <p>
          3. Nhấn vào <IconBase name="scan" /> rồi quét mã QR để xác nhận thông tin đăng nhập của
          bạn
        </p>
      </div>
    </div>
    <div class="login-qr-code-guide">
      <img :src="images.loginQrCodeGuide" alt="login-guide" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-qr-code {
  &-container {
    display: flex;
    height: pxToRem(600px);
    justify-content: space-between;
  }
  &-inner {
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: pxToRem(8px);
    flex-shrink: 0;
    width: 180px;
  }
  &-img {
    border: 1px solid #f2f2f2;
    border-radius: 12px;
    padding: 12px;
    width: pxToRem(280px);
    height: pxToRem(280px);
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-guide {
    flex: 1 1 0;
    img {
      height: pxToRem(440px);
    }
  }
  &-step {
    margin-top: pxToRem(26px);
    p {
      font-size: 1.4rem;
    }
  }
}
</style>
