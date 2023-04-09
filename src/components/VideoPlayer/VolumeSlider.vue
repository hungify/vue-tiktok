<script lang="ts" setup>
interface VolumeSliderProps {
  volume: number;
}
const props = defineProps<VolumeSliderProps>();

interface VolumeSliderEvents {
  (eventName: 'onVolumeChange', volume: number): void;
}
const emit = defineEmits<VolumeSliderEvents>();

const onVolumeChangeHandler = (evt: Event) => {
  const target = evt.target as HTMLInputElement;
  const volume = Number(target.valueAsNumber / 100);
  emit('onVolumeChange', volume);
};

const onMutedHandler = () => {
  emit('onVolumeChange', props.volume ? 0 : 0.5);
};

const isHovering = ref(false);
const volumeSlider = ref<HTMLDivElement>();

const handleMouseEnter = () => {
  isHovering.value = true;
};

const handleMouseLeave = () => {
  isHovering.value = false;
};

const thumbStyle = computed(() => {
  const volume = props.volume ?? 1;
  return {
    transform: `translateY(${-volume * 80}px)`,
  };
});

const trackStyle = computed(() => {
  const volume = props.volume ?? 1;
  return {
    transform: `scaleY(${volume})`,
  };
});
</script>

<template>
  <div class="volume-container">
    <div
      v-show="isHovering"
      ref="volumeSlider"
      class="volume-inner"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <input
        min="0"
        max="100"
        type="range"
        name="volume"
        class="input-slider"
        :value="volume * 100"
        style="transform: rotate(-90deg)"
        @input="onVolumeChangeHandler"
      />
      <div class="volume-control">
        <div class="progress" />
        <div class="thumb" :style="thumbStyle" />
        <div class="track" :style="trackStyle" />
      </div>
    </div>
    <ButtonBase
      class="icon-volume"
      size="sm"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="onMutedHandler"
    >
      <IconBase v-if="volume" name="volume-full" width="24" height="24" />
      <IconBase v-else name="volume-mute" width="24" height="24" />
    </ButtonBase>
  </div>
</template>

<style lang="scss" scoped>
.volume-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.volume-inner {
  position: relative;
  transition: all 0.3s ease 0s;
  cursor: default;
}

.volume-control {
  width: 28px;
  height: 110px;
  margin: 8px 6px;
  display: block;
  position: relative;
  background: rgba(84, 84, 84, 0.5);
  border-radius: 32px;
}

.progress {
  width: 4px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.34);
  position: absolute;
  left: 12px;
  top: 8px;
  bottom: 8px;
  cursor: pointer;
}

.thumb {
  width: 16px;
  height: 16px;
  background-color: rgb(255, 255, 255);
  border-radius: 16px;
  position: absolute;
  left: 6px;
  bottom: 6px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
}

.track {
  width: 4px;
  height: 80px;
  background-color: rgb(255, 255, 255);
  position: absolute;
  left: 12px;
  bottom: 8px;
  cursor: pointer;
  transform: scaleY(0);
  transform-origin: center bottom;
  transition: all 0.3s ease 0s;
}

.input-slider {
  width: 96px;
  position: absolute;
  z-index: 1;
  bottom: 54px;
  right: -28px;
  opacity: 0;
  cursor: pointer;
}

.icon-volume {
  color: white;
  text-align: center;
  padding: 8px;
  position: relative;
  background: none rgba(84, 84, 84, 0.5);
  border-radius: 50%;

  &:hover {
    background-color: rgba(37, 37, 37, 0.6);
  }
}
</style>
