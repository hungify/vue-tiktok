<script setup lang="ts">
import { formatDuration } from '~/utils/format';

interface ScrubberProps {
  min?: number;
  max?: number;
  secondary?: number;
  modelValue: number;
  type?: 'tooltip';
}

const props = withDefaults(defineProps<ScrubberProps>(), {
  min: 0,
  max: 100,
  secondary: 0,
  type: undefined,
});

interface ScrubberEvents {
  (eventName: 'update:modelValue', value: number): void;
}

const emit = defineEmits<ScrubberEvents>();

const scrubberRef = ref();
const scrubbing = ref(false);
const pendingValue = ref(0);

useEventListener('mouseup', () => (scrubbing.value = false));

const currentTime = useVModel(props, 'modelValue', emit);
const { elementX, elementWidth } = useMouseInElement(scrubberRef);

watch([scrubbing, elementX], () => {
  const progress = Math.max(0, Math.min(1, elementX.value / elementWidth.value));
  pendingValue.value = progress * props.max;
  if (scrubbing.value) currentTime.value = pendingValue.value;
});

const position = computed(() => {
  return `${Math.max(0, Math.min(elementX.value, elementWidth.value))}px`;
});
</script>

<template>
  <div ref="scrubberRef" class="scrubber" @mousedown="scrubbing = true">
    <div class="scrubber-inner">
      <div
        class="scrubber-loaded"
        :style="{ transform: `translateX(${(secondary / max) * 100 - 100}%)` }"
      />
      <div
        class="scrubber-current"
        :style="{ transform: `translateX(${(currentTime / max) * 100 - 100}%)` }"
      />
    </div>

    <div
      class="scrubber-content"
      :style="{
        opacity: scrubbing ? 1 : 0,
      }"
    >
      <div v-if="type?.includes('tooltip')" class="scrubber__tooltip" :style="{ left: position }">
        {{ formatDuration(pendingValue) }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scrubber {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 0.25rem;
  cursor: pointer;
  user-select: none;
  background-color: rgba(0, 0, 0, 0.2);
}

.scrubber-inner {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
  border-radius: 0.25rem;
}

.scrubber-loaded {
  height: 100%;
  position: absolute;
  opacity: 0.3;
  left: 0;
  top: 0;
  background-color: $danger;
  width: 100%;
  border-radius: 0.25rem;
}

.scrubber-current {
  height: 100%;
  width: 100%;
  position: relative;
  background-color: $danger;
  border-radius: 0.25rem;
}

.scrubber-content {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 1;
  }
}

.scrubber__tooltip {
  position: absolute;
  transform: translateX(-50%);
  background-color: black;
  border-radius: 0.5rem;
  padding-inline: 0.5rem;
  bottom: 0;
  margin-bottom: 0.5rem;
  padding-block: 0.25rem;
  font-size: 0.75rem;
  color: white;
}
</style>
