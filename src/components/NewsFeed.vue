<script setup lang="ts">
import CardVideoItem from '~/components/CardVideoItem.vue';
import type { Posts } from '~/models/video';

interface NewsFeedProps {
  posts: Posts[];
}

const isModalOpen = sessionStorage.getItem('isModalOpen') === 'true';

const { posts } = defineProps<NewsFeedProps>();

const cardVideoItemRef = ref<InstanceType<typeof CardVideoItem>[]>();

const store = useVideoPlayerStore();

const firstVideoInView = computed(() => {
  return posts.find((item) => item.shouldBePlay);
});

const onIntersecting = (videoId: string, shouldBePlay: boolean) => {
  posts.forEach((item) => {
    if (item.video.id === videoId) {
      item.shouldBePlay = shouldBePlay;
    }
  });
};

onKeyStroke(['ArrowDown', 'ArrowUp', 'm'], (e) => {
  if (isModalOpen) return;
  e.preventDefault();
  if (e.key === 'ArrowDown') {
    const index = posts.findIndex((item) => item.video.id === firstVideoInView.value?.video.id);
    if (index < posts.length - 1) {
      cardVideoItemRef.value?.[index + 1]?.scrollToVideo();
    }
  } else if (e.key === 'ArrowUp') {
    const index = posts.findIndex((item) => item.video.id === firstVideoInView.value?.video.id);
    if (index > 0) {
      cardVideoItemRef.value?.[index - 1]?.scrollToVideo();
    }
  } else if (e.key === 'm') {
    store.setVolume(store.volume ? 0 : 0.5);
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
</script>

<template>
  <div class="new-feed-container">
    <CardVideoItem
      v-for="(item, index) in posts"
      :key="index"
      ref="cardVideoItemRef"
      :video="item.video"
      :user="item.user"
      :active="item.video.id === firstVideoInView?.video.id"
      @onIntersecting="onIntersecting"
    />
  </div>
</template>

<style lang="scss" scoped>
.new-feed-container {
  max-width: 692px;
}
</style>
