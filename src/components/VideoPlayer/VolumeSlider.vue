<script lang="ts" setup>
interface VolumeSliderProps {
  modelValue: number;
  size?: 'sm' | 'md';
}
const props = withDefaults(defineProps<VolumeSliderProps>(), {
  size: 'sm',
});

interface VolumeSliderEvents {
  (eventName: 'update:modelValue', value: number): void;
}
const emit = defineEmits<VolumeSliderEvents>();

const volume = useVModel(props, 'modelValue', emit);

const onVolumeChangeHandler = (evt: Event) => {
  const target = evt.target as HTMLInputElement;
  const newVolume = Number(target.valueAsNumber / 100);
  volume.value = newVolume;
};

const onMutedHandler = () => {
  volume.value = volume.value ? 0 : 0.5;
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
  const volumeX = volume.value ?? 1;
  const temp = props.size === 'sm' ? 48 : 80;
  return {
    transform: `translateY(${-volumeX * temp}px)`,
  };
});

const trackStyle = computed(() => {
  const volumeX = volume.value ?? 1;
  return {
    transform: `scaleY(${volumeX})`,
  };
});

const volumeContainerClass = computed(() => ({
  'volume-container': true,
  'volume-container--sm': props.size === 'sm',
  'volume-container--md': props.size === 'md',
}));
</script>

<template>
  <div :class="volumeContainerClass">
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
      color="default"
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
  .volume-container--sm & {
    width: 24px;
    height: 74px;
  }
  .volume-container--md & {
    width: 28px;
    height: 110px;
  }
}

.progress {
  background-color: rgba(255, 255, 255, 0.34);
  position: absolute;
  cursor: pointer;
  .volume-container--sm & {
    width: 4px;
    left: 10px;
    top: 8px;
    bottom: 8px;
  }
  .volume-container--md & {
    width: 4px;
    left: 12px;
    top: 8px;
    bottom: 8px;
  }
}

.thumb {
  background-color: rgb(255, 255, 255);
  border-radius: 16px;
  position: absolute;
  cursor: pointer;
  transition: all 0.3s ease 0s;

  .volume-container--sm & {
    width: 12px;
    height: 12px;
    left: 6px;
    bottom: 8px;
  }
  .volume-container--md & {
    width: 16px;
    height: 16px;
    left: 6px;
    bottom: 6px;
  }
}

.track {
  width: 4px;
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
  position: absolute;
  z-index: 1;
  cursor: pointer;
  opacity: 0;
  .volume-container--sm & {
    width: 64px;
    bottom: 38px;
    right: -14px;
  }

  .volume-container--md & {
    width: 96px;
    bottom: 54px;
    right: -28px;
  }
}

.icon-volume {
  color: white;
  text-align: center;
  padding: 8px;
  position: relative;
  border-radius: 50%;
  .volume-container--md & {
    background: rgba(84, 84, 84, 0.5);
    &:hover {
      background-color: rgba(37, 37, 37, 0.6);
    }
  }
}
</style>
