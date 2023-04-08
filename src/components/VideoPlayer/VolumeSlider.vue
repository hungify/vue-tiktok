<script lang="ts" setup>
interface VolumeSliderProps {
  volume: number;
}
const props = defineProps<VolumeSliderProps>();

interface VolumeSliderEvents {
  (eventName: 'onVolumeChange', volume: number): void;
}
const emit = defineEmits<VolumeSliderEvents>();

const isShowVolumeControl = ref(false);

const onVolumeChangeHandler = (evt: Event) => {
  const target = evt.target as HTMLInputElement;
  const volume = Number(target.valueAsNumber / 100);
  emit('onVolumeChange', volume);
};

const onMutedHandler = () => {
  emit('onVolumeChange', props.volume ? 0 : 0.5);
};

const handleShowControl = () => {
  isShowVolumeControl.value = true;
};

const handleHideControl = () => {
  console.log('hide');
  isShowVolumeControl.value = false;
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
    <div
      v-show="isShowVolumeControl"
      class="volume-inner"
      @mouseenter="handleShowControl"
      @mouseleave="handleHideControl"
    >
      <div class="volume-control">
        <div class="progress" />
        <div class="thumb" :style="thumbStyle" />
        <div class="track" :style="trackStyle" />
      </div>
    </div>
    <div
      class="icon-volume"
      @mouseenter="handleShowControl"
      @mouseleave="handleHideControl"
      @click="onMutedHandler"
    >
      <IconBase v-if="volume" name="volume-full" width="24" height="24" />
      <IconBase v-else name="volume-mute" width="24" height="24" />
    </div>
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
  transition: all 0.2s linear;
  cursor: default;
  background-color: red;
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
}

.input-slider {
  width: 96px;
  position: absolute;
  z-index: 1;
  bottom: 87px;
  right: -28px;
  opacity: 0;
  cursor: pointer;
}

.icon-volume {
  background-color: red;
  color: white;
  text-align: center;
  padding: 4px 8px;
  position: relative;
  &:before {
    content: '';
    z-index: 2;
    width: 40px;
    height: 20px;
    position: absolute;
    top: -20px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
