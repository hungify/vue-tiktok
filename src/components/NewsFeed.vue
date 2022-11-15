<script setup lang="ts">
import { useInfiniteScroll, type UseInfiniteScrollOptions } from '@vueuse/core';
import { reactive, computed, ref, shallowReactive } from 'vue';
import CardVideoPlayer from '~/components/CardVideoItem.vue';
import { playList } from '~/mocks/video';
import type { NewsFeed } from '~/models/video';

const newsFeed = reactive<NewsFeed[]>(playList);
const newsFeedRef = ref<HTMLDivElement>();
const infiniteOptions = shallowReactive<UseInfiniteScrollOptions>({
  distance: 2,
});

const onIntersecting = (videoId: string, shouldBePlay: boolean) => {
  newsFeed.forEach((item) => {
    if (item.video.id === videoId) {
      item.shouldBePlay = shouldBePlay;
    }
  });
};

const firstVideoInView = computed(() => {
  return newsFeed.find((item) => item.shouldBePlay);
});

useInfiniteScroll(
  newsFeedRef,
  () => {
    newsFeed.push(...newsFeed);
  },
  infiniteOptions,
);
</script>

<template>
  <div ref="newsFeedRef" :class="$style.wrapper">
    <CardVideoPlayer
      v-for="(item, index) in newsFeed"
      :key="index"
      :video="item.video"
      :user="item.user"
      :active="item.video.id === firstVideoInView?.video.id"
      @onIntersecting="onIntersecting"
    />
  </div>
</template>

<style lang="scss" module>
.wrapper {
  flex: 1 1 auto;
  overflow-y: auto;
}
</style>
