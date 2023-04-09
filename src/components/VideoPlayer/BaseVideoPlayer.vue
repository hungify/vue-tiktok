<script lang="ts" setup>
import { useVideoPlayerStore } from '~/stores/video';
import SeekBar from './SeekBar.vue';
import VolumeSlider from './VolumeSlider.vue';
import { formatDuration } from '~/utils/format';

interface VideoProps {
  id: string;
  url: string;
  isShowControls?: boolean;
  loop?: boolean;
  muted?: boolean;
}

const props = withDefaults(defineProps<VideoProps>(), {
  isShowControls: true,
  loop: true,
  muted: false,
});

const videoRef = ref<HTMLVideoElement>();

const store = useVideoPlayerStore();

watch(
  store,
  (value) => {
    if (videoRef.value) {
      if (value.playing && props.id === store.currentVideoId) {
        videoRef.value.play();
      } else {
        videoRef.value.pause();
      }
      if (value.volume > 0) {
        videoRef.value.volume = value.volume;
      }
    }
  },
  {
    deep: true,
  },
);

const seekBarTime = computed(() => {
  const currentTime = formatDuration(store.currentTime);
  const duration = formatDuration(store.duration);
  return `${currentTime} / ${duration}`;
});

const handleLoadedMetaData = async () => {
  await nextTick();
  if (videoRef.value && store.currentVideoId === props.id) {
    const duration = videoRef.value?.duration;
    store.setDuration(duration);
  }
};

const onPlayOrPauseHandler = () => {
  store.setCurrentVideoId(props.id);
  store.togglePlayOrPause();
};

const handlePlay = () => {
  handleLoadedMetaData();
  store.setCurrentVideoId(props.id);
  store.togglePlayOrPause('play');
};

const handleTimeUpdate = (evt: Event) => {
  const target = evt.target as HTMLVideoElement;
  const currentTime = target.currentTime;
  store.setCurrentTime(currentTime);
};

const handleSeekChange = (value: number) => {
  const currentTime = value * store.duration;
  store.setCurrentTime(currentTime);
  if (videoRef.value) {
    videoRef.value.currentTime = currentTime;
  }
};

defineExpose({
  onPlay: handlePlay,
  id: props.id,
});
</script>

<template>
  <div :class="$style['player-inner']">
    <div :class="$style['overlay']">
      <video
        :key="id"
        ref="videoRef"
        :class="$style['video-player']"
        :muted="muted || store.muted"
        v-bind="$attrs"
        @timeupdate="handleTimeUpdate"
        @loadedmetadata="handleLoadedMetaData"
      >
        <source type="video/mp4" :src="url" />
      </video>
      <div v-if="isShowControls" :class="$style.controls">
        <button :class="[$style['play-or-pause']]" @click.stop="onPlayOrPauseHandler">
          <template v-if="store.playing && store.currentVideoId === id">
            <IconBase name="pause" width="24" height="24" />
          </template>
          <template v-else>
            <IconBase name="play" width="24" height="24" />
          </template>
        </button>
        <div :class="[$style['volume']]" @click.stop="() => {}">
          <VolumeSlider v-model="store.volume" />
        </div>
        <div :class="[$style['duration']]" @click.stop="() => {}">
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
