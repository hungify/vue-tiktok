<script setup lang="ts">
import { useElementHover } from '@vueuse/core';
import { ref, watch } from 'vue';
import { RouterLink } from 'vue-router';

interface VideoOverlayProps {
  id: string;
  thumbnailUrl: string;
  url: string;

  active: boolean;
  currentVideoId: string;
}
const props = defineProps<VideoOverlayProps>();

interface CardFollowerEvents {
  (event: 'onPlay', videoId: string): void;
}
const emit = defineEmits<CardFollowerEvents>();

const videoRef = ref<HTMLVideoElement | null>(null);
const cardVideoRef = ref<HTMLDivElement | null>(null);
const isHovered = useElementHover(cardVideoRef);

watch(isHovered, (value) => {
  emit('onPlay', value ? props.id : props.currentVideoId);
});

watch(
  () => props.active,
  (value) => {
    if (value) {
      videoRef.value?.play();
    } else {
      videoRef.value?.load();
    }
  },
);
</script>

<template>
  <div ref="cardVideoRef" class="card-follower-container">
    <RouterLink to="#" class="follower-link">
      <div class="follower-inner">
        <div class="overlay">
          <img :src="thumbnailUrl" alt="video" />
          <div v-show="active" class="video-player">
            <video ref="videoRef" :src="url" loop :muted="true" />
          </div>
        </div>
        <slot />
      </div>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.card-follower-container {
  display: flex;
  width: 100%;
  height: 302px;
  border-radius: 8px;
  overflow: hidden;

  .follower-link {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
  }
  .follower-inner {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .overlay {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background-color: rgba(22, 24, 35, 0.06);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .video-player {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      div {
        width: 100%;
        height: 100%;
      }
      video {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
