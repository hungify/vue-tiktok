<script lang="ts" setup>
interface HashTagProps {
  text: string;
}
defineProps<HashTagProps>();
</script>

<template>
  <RouterLink :to="`/tag/${text}`" :class="$style.hashtag">
    <strong>#{{ text }}</strong>
  </RouterLink>
</template>

<style module lang="scss">
.hashtag {
  font-family: $font-family;
  display: inline-block;
  color: $black;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  & + & {
    margin-left: 8px;
  }
}
</style>
