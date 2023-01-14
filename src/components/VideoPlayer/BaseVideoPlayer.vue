<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue';
import type { Video } from '~/models/video';
import { useVideoPlayerStore } from '~/store/video';
import IconBase from '../IconBase.vue';
import SeekBar from './SeekBar.vue';
import VolumeSlider from './VolumeSlider.vue';

interface VideoProps {
  video: Video;
  isShowControls?: boolean;
}
const props = withDefaults(defineProps<VideoProps>(), {
  isShowControls: true,
});

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

const seekBarTime = computed(() => {
  const currentTimeSeconds =
    Math.floor(store.currentTime / 60) < 10
      ? `0${Math.floor(store.currentTime / 60)}`
      : Math.floor(store.currentTime / 60);
  const currentTimeMinutes =
    Math.floor(store.currentTime % 60) < 10
      ? `0${Math.floor(store.currentTime % 60)}`
      : Math.floor(store.currentTime % 60);

  const durationSeconds =
    Math.floor(store.duration / 60) < 10
      ? `0${Math.floor(store.duration / 60)}`
      : Math.floor(store.duration / 60);
  const durationMinutes =
    Math.floor(store.duration % 60) < 10
      ? `0${Math.floor(store.duration % 60)}`
      : Math.floor(store.duration % 60);
  const currentTime = `${currentTimeSeconds}:${currentTimeMinutes}`;
  const duration = `${durationSeconds}:${durationMinutes}`;

  return `${currentTime} / ${duration}`;
});

const handleValueVolumeChange = (value: number) => {
  store.setVolume(value);
};

const handleMuted = () => {
  store.toggleMuted();
};

const onPlayOrPauseHandler = () => {
  store.setCurrentVideoId(props.video.id);
  store.togglePlayOrPause();
};

const handlePlay = () => {
  handleLoadedMetaData();
  store.setCurrentVideoId(props.video.id);
  store.togglePlayOrPause('play');
};

const handleTimeUpdate = (evt: Event) => {
  const target = evt.target as HTMLVideoElement;
  const currentTime = target.currentTime;
  store.setCurrentTime(currentTime);
};

const handleLoadedMetaData = async () => {
  await nextTick();
  if (videoRef.value && store.currentVideoId === props.video.id) {
    const duration = videoRef.value?.duration;
    store.setDuration(duration);
  }
};

const handleSeekChange = (value: number) => {
  const currentTime = (value / 100) * store.duration;
  store.setCurrentTime(currentTime);
  if (videoRef.value) {
    videoRef.value.currentTime = currentTime;
  }
};

defineExpose({
  onPlay: handlePlay,
  video: props.video,
});
</script>

<template>
  <div :class="$style['player-inner']">
    <div :class="$style['overlay']">
      <video
        :key="video.id"
        ref="videoRef"
        loop
        :class="$style['video-player']"
        :muted="store.muted"
        @timeupdate="handleTimeUpdate"
        @loadedmetadata="handleLoadedMetaData"
      >
        <source type="video/mp4" :src="video.url" />
      </video>
      <div v-if="isShowControls" :class="$style.controls">
        <button :class="[$style['play-or-pause']]" @click="onPlayOrPauseHandler">
          <template v-if="store.playing && store.currentVideoId === video.id">
            <IconBase name="pause" width="24" height="24" />
          </template>
          <template v-else>
            <IconBase name="play" width="24" height="24" />
          </template>
        </button>
        <div :class="[$style['volume']]">
          <VolumeSlider
            :volume="store.volume"
            :muted="store.muted"
            @onVolumeChange="handleValueVolumeChange"
            @onMuted="handleMuted"
          />
        </div>
        <div :class="[$style['duration']]">
          <SeekBar
            :currentTime="store.currentTime"
            :duration="store.duration"
            @onSeek="handleSeekChange"
          />
          <div :class="$style.time">{{ seekBarTime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
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
  border-radius: pxToRem(16px);
}

.controls {
  opacity: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  width: 100%;
  padding: pxToRem(15px) pxToRem(20px);
}

.play-or-pause {
  background-color: transparent;
  cursor: pointer;
  border: none;
  bottom: 38px;
  color: $white;
  font-size: 2rem;
  left: 12px;
  padding: 10px;
  position: absolute;
  transition: all 0.3s ease;
  height: pxToRem(40px);
  width: pxToRem(40px);
}
.volume {
  bottom: 26px;
  position: absolute;
  cursor: pointer;
  right: 12px;
}

.duration {
  bottom: 10%;
  width: 100%;
  display: flex;
  justify-content: unset;
  align-items: center;
  gap: pxToRem(15px);
  transition: all 0.3s ease;

  .time {
    color: $white;
    font-size: 1rem;
  }
}
</style>
