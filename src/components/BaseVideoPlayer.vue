<script lang="ts" setup>
import { ref } from 'vue';
import type { Video } from '~/models/video';
import ButtonBase from './ButtonBase.vue';
import IconBase from './IconBase.vue';

interface VideoProps {
  video: Video;
}
// const props = defineProps<VideoProps>();
const props = defineProps<VideoProps>();

// interface VideoEvents {
//   (eventName: 'onPlay', videoId: string): void;
// }
// const emits = defineEmits<VideoEvents>();

const videoRef = ref<HTMLVideoElement | null>(null);

const handleLikeVideo = () => {
  console.log('like video');
};

const handleCommentVideo = () => {
  console.log('comment video');
};

const handleShareVideo = () => {
  console.log('share video');
};

const handlePlayVideo = () => {
  videoRef.value?.play();
  // emits('onPlay', props.video.id);
};

const handlePauseVideo = () => {
  if (
    videoRef.value &&
    videoRef.value?.currentTime > 0 &&
    !videoRef.value?.paused &&
    !videoRef.value?.ended &&
    videoRef.value?.readyState > 2
  ) {
    videoRef.value?.pause();
  }
};

const handleResetVideo = () => {
  if (videoRef.value) {
    videoRef.value.currentTime = 0;
    videoRef.value.pause();
  }
};

defineExpose({
  onPlay: handlePlayVideo,
  onPause: handlePauseVideo,
  onReset: handleResetVideo,
  played: videoRef.value?.played,
  video: props.video,
});
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style['player-inner']">
      <video
        :key="video.id"
        ref="videoRef"
        :class="$style['video-player']"
        controls
        playsInline
        muted
        @play="handlePlayVideo"
        @pause="handlePauseVideo"
        @reset="handleResetVideo"
        @ended="handlePlayVideo"
      >
        <source type="video/mp4" :src="video.url" />
      </video>
    </div>
    <ul :class="$style.actions">
      <li :class="$style['actions-item']">
        <ButtonBase :class="$style.action" @click="handleLikeVideo">
          <IconBase name="heart" />
        </ButtonBase>
        <strong :class="$style.count">{{ video.likesCount }}</strong>
      </li>
      <li :class="$style['actions-item']">
        <ButtonBase :class="$style.action" @click="handleCommentVideo">
          <IconBase name="comment" />
        </ButtonBase>
        <strong :class="$style.count">{{ video.commentsCount }}</strong>
      </li>
      <li :class="$style['actions-item']">
        <ButtonBase :class="$style.action" @click="handleShareVideo">
          <IconBase name="share" />
        </ButtonBase>
        <strong :class="$style.count">{{ video.sharesCount }}</strong>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}
.player-inner {
  position: relative;
  box-sizing: border-box;
  background: #eee center no-repeat;
  background-size: cover;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  margin-right: pxToRem(20px);
  height: pxToRem(700px);
  height: calc(450px + (100vw - 768px) / 1152 * 100);

  .video-player {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .action {
    padding: pxToRem(16px);
    background-color: rgba(22, 24, 35, 0.06);
    border-radius: 50%;
    margin: pxToRem(8px) 0;
  }
  .count {
    color: rgba(22, 24, 35, 0.6);
  }
}
</style>
