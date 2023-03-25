<script setup lang="ts">
import {
  onKeyStroke,
  useEventListener,
  useInfiniteScroll,
  type UseInfiniteScrollOptions,
} from '@vueuse/core';
import CardVideoItem from '~/components/CardVideoItem.vue';
import { playList } from '~/mocks/video';
import type { NewsFeed } from '~/models/video';

const isModalOpen = sessionStorage.getItem('isModalOpen') === 'true';

const newsFeed = reactive<NewsFeed[]>(playList);
const newsFeedRef = ref<HTMLDivElement>();
const cardVideoItemRef = ref<InstanceType<typeof CardVideoItem>[]>();
const infiniteOptions = shallowReactive<UseInfiniteScrollOptions>({
  distance: 2,
});

const store = useVideoPlayerStore();

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

onKeyStroke(['ArrowDown', 'ArrowUp', 'm'], (e) => {
  if (isModalOpen) return;
  e.preventDefault();
  if (e.key === 'ArrowDown') {
    const index = newsFeed.findIndex((item) => item.video.id === firstVideoInView.value?.video.id);
    if (index < newsFeed.length - 1) {
      cardVideoItemRef.value?.[index + 1]?.scrollToVideo();
    }
  } else if (e.key === 'ArrowUp') {
    const index = newsFeed.findIndex((item) => item.video.id === firstVideoInView.value?.video.id);
    if (index > 0) {
      cardVideoItemRef.value?.[index - 1]?.scrollToVideo();
    }
  } else if (e.key === 'm') {
    store.toggleMuted();
  }
});

useEventListener(document, 'visibilitychange', (evt: Event) => {
  const target = evt.target as Document;
  if (target.visibilityState === 'visible') {
    store.togglePlayOrPause('play');
  } else {
    store.togglePlayOrPause('pause');
  }
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
    <CardVideoItem
      v-for="(item, index) in newsFeed"
      :key="index"
      ref="cardVideoItemRef"
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
