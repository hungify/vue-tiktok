<script lang="ts" setup>
const route = useRoute();

const containerClasses = computed(() => {
  return {
    'layout-blank': true,
    'layout-full': !!route.meta.full,
  };
});
</script>

<template>
  <main :class="containerClasses">
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
.layout-blank {
  width: 100%;
  display: flex;
}

.layout-full {
  flex: 1 1 auto;
  height: 100vh;
}
</style>
