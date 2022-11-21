<script lang="ts" setup>
import { computed } from 'vue';
import IconBase from './IconBase.vue';

interface VolumeSliderProps {
  volume: number;
  muted: boolean;
}
const props = defineProps<VolumeSliderProps>();

interface VolumeSliderEvents {
  (eventName: 'onVolumeChange', volume: number): void;
  (eventName: 'onMuted', muted: boolean): void;
}
const emit = defineEmits<VolumeSliderEvents>();

const marginLeft = computed(() => {
  return -(props.volume / 100) * 12 + 6;
});

const onVolumeChangeHandler = (evt: Event) => {
  const target = evt.target as HTMLInputElement;
  const volume = Number(target.value);
  emit('onVolumeChange', volume);
};

const onMutedHandler = () => {
  emit('onMuted', !props.muted);
};
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.icon" @click="onMutedHandler">
      <template v-if="muted">
        <IconBase name="volume-mute" width="24" height="24" />
      </template>
      <template v-else>
        <IconBase name="volume-full" width="24" height="24" />
      </template>
    </div>
    <div :class="$style.progress">
      <div
        :class="$style['progress__bar']"
        :style="{
          width: `${volume}%`,
        }"
      />
      <div
        :class="$style['progress__circle']"
        :style="{
          marginLeft: `${marginLeft}px`,
          left: `${props.volume}%`,
        }"
      />
      <input
        defaultValue="100"
        type="range"
        name="volume"
        :value="volume"
        :class="$style.range"
        @change="onVolumeChangeHandler"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  color: $white;
  width: 40px;
  height: 40px;

  &:hover {
    .progress {
      opacity: 1;
      transition: 0.2s;
    }
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
  }

  .progress {
    width: 48px;
    flex: 1;
    height: 2px;
    position: relative;
    transform-origin: top left;
    transform: rotate(-90deg) translate(40px, 20px);
    // opacity: 0;

    &::after {
      content: '';
      width: 100%;
      height: 2px;
      background-color: rgba($color: $white, $alpha: 0.3);
      position: absolute;
      top: 50%;
      left: 0;
      z-index: 1;
      transform: translateY(-50%);
    }

    &::before {
      content: '';
      width: 74px;
      height: 24px;
      border-radius: 32px;
      background-color: rgba($color: #000, $alpha: 0.34);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .range {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 0;
      z-index: 10;
      transform: translateY(-50%);
      cursor: pointer;
      opacity: 0;
    }
  }

  .progress__bar {
    height: 2px;
    background-color: $white;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: 0.2s;
  }

  .progress__circle {
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: $white;
    border-radius: 50%;
    top: 50%;
    transform: translate(-6px, -50%);
    transition: 0.2s;
  }
}
</style>
