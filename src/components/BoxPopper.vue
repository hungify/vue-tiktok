<script lang="ts" setup></script>

<template>
  <div class="box-floating">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.box-floating {
  display: flex;
  flex-direction: column;
  max-height: min((100vh - pxToRem(96px)) - pxToRem(60px), pxToRem(734px));
  min-height: pxToRem(100px);
  padding-top: pxToRem(8px);
  border-radius: pxToRem(8px);
  background: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 12%) 0px 2px 12px;
}
</style>
