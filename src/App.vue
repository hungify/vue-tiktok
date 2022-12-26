<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import MainLayout from './layouts/MainLayout.vue';
const route = useRoute();
</script>

<template>
  <MainLayout :full="route.meta.full">
    <RouterView />
  </MainLayout>
</template>

<style lang="scss" module></style>
