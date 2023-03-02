<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import MainLayout from '~/layouts/MainLayout.vue';
import BlankLayout from '~/layouts/BlankLayout.vue';

const route = useRoute();

const layoutMapper = {
  MainLayout,
  BlankLayout,
};

const currentLayout = computed(() => {
  return layoutMapper[route.meta.layout || 'MainLayout'];
});
</script>

<template>
  <Component :is="currentLayout">
    <RouterView />
  </Component>
</template>
