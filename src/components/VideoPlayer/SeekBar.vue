<script lang="ts" setup>
interface SeekBarProps {
  currentTime: number;
  duration: number;
}
const props = defineProps<SeekBarProps>();

interface SeekBarEvents {
  (eventName: 'onSeek', value: number): void;
}
const emit = defineEmits<SeekBarEvents>();

const percent = computed(() => {
  return `${(props.currentTime / props.duration) * 100}%`;
});

const onSeekChangeHandler = (evt: Event) => {
  const target = evt.target as HTMLInputElement;
  const value = Number(target.value);
  emit('onSeek', value);
};
</script>

<template>
  <div :class="$style.wrapper" @click.stop="() => {}">
    <div :class="$style['progress_bar']" :style="{ width: percent }" />
    <div :class="$style['progress_circle']" :style="{ left: percent }" />
    <input type="range" :class="$style.range" name="seek" @change.stop="onSeekChangeHandler" />
  </div>
</template>

<style lang="scss" module>
.wrapper {
  max-width: 90%;
  flex: 1;
  height: pxToRem(12px);
  position: relative;

  &:hover {
    .progress_bar {
      height: 4px;
    }
    .progress_circle {
      opacity: 1;
    }
  }

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

.progress_bar {
  height: 2px;
  background-color: $white;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.progress_circle {
  position: absolute;
  width: pxToRem(12px);
  height: pxToRem(12px);
  background-color: $white;
  border-radius: 50%;
  top: 50%;
  transform: translate(-6px, -50%);
  opacity: 0;
}
</style>
