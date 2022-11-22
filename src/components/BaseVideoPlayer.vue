<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { Video } from '~/models/video';
import { useVideoPlayerStore } from '~/store/video';
import ButtonBase from './ButtonBase.vue';
import IconBase from './IconBase.vue';
import VolumeSlider from './VolumeSlider.vue';

interface VideoProps {
  video: Video;
}
const props = defineProps<VideoProps>();

const videoRef = ref<HTMLVideoElement>();

const store = useVideoPlayerStore();

watch(
  store,
  (value) => {
    if (videoRef.value) {
      if (value.playing && props.video.id === store.currentVideoId) {
        videoRef.value.play();
      } else {
        videoRef.value.pause();
      }
      if (value.volume > 0) {
        videoRef.value.volume = value.volume / 100;
      }
    }
  },
  {
    deep: true,
  },
);

const handleLikeVideo = () => {
  console.log('like video');
};

const handleCommentVideo = () => {
  console.log('comment video');
};

const handleShareVideo = () => {
  console.log('share video');
};

const handleValueVolumeChange = (value: number) => {
  store.setVolume(value);
};

const handleMuted = () => {
  store.toggleMuted();
};

const onPlayOrPauseHandler = () => {
  store.setCurrentVideoId(props.video.id);
  store.togglePlayOrPause('play');
};

const handlePlay = () => {
  store.setCurrentVideoId(props.video.id);
  store.togglePlayOrPause('play');
};

const handlePause = () => {
  store.togglePlayOrPause('pause');
};

defineExpose({
  onPlay: handlePlay,
  onPause: handlePause,
  video: props.video,
  setCurrentVideoId: store.setCurrentVideoId,
});
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style['player-inner']">
      <div :class="$style['overlay']">
        <video :key="video.id" ref="videoRef" :class="$style['video-player']" :muted="store.muted">
          <source type="video/mp4" :src="video.url" />
        </video>
        <div :class="$style.controls">
          <button
            :class="[$style['play-or-pause'], $style['video-control']]"
            @click="onPlayOrPauseHandler()"
          >
            <template v-if="store.playing && store.currentVideoId === video.id">
              <IconBase name="pause" width="24" height="24" />
            </template>
            <template v-else>
              <IconBase name="play" width="24" height="24" />
            </template>
          </button>
          <button :class="[$style['volume'], $style['video-control']]">
            <VolumeSlider
              :volume="store.volume"
              :muted="store.muted"
              @onVolumeChange="handleValueVolumeChange"
              @onMuted="handleMuted"
            />
          </button>
        </div>
      </div>
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
}

.overlay {
  height: calc(450px + (100vw - 768px) / 1152 * 100);
  transition: opacity 0.3s linear;

  &:hover .controls {
    opacity: 1;
  }
}

.video-player {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}

.controls {
  opacity: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 60px;
  .video-control {
    background-color: transparent;
    border: none;
    color: $white;
    font-size: 2rem;
    top: 0;
    position: absolute;
    cursor: pointer;
  }
}

.play-or-pause {
  left: 12px;
}
.volume {
  right: 12px;
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
