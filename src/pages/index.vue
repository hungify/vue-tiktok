<script setup lang="ts">
import { playList } from '~/mocks/video';
import type { Posts } from '~/models/video';

const posts = reactive<Posts[]>(playList);
const lastPostRef = ref<HTMLDivElement>();

useIntersectionObserver(lastPostRef, () => {
  // posts?.push(...playList);
});
</script>

<template>
  <template v-if="posts">
    <NewsFeed :posts="posts" />
    <span ref="lastPostRef" class="span"></span>
  </template>
</template>
