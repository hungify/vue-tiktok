<script lang="ts" setup>
defineOptions({ inheritAttrs: true });

interface SwitchProps {
  value?: boolean;
  disabled?: boolean;
  color?: 'success' | 'info' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  modelValue?: boolean;
}

const props = withDefaults(defineProps<SwitchProps>(), {
  value: false,
  disabled: false,
  color: 'danger',
  size: 'md',
  id: '',
});

interface SwitchEvents {
  (eventName: 'update:modelValue', value: boolean): void;
  (eventName: 'onChange', value: boolean): void;
}

const emit = defineEmits<SwitchEvents>();

const checked = computed({
  get() {
    return props.modelValue ?? props.value;
  },
  set(value) {
    emit('update:modelValue', value);
    emit('onChange', value);
  },
});

const switchClasses = computed(() => {
  const classes = ['switch', `switch-${props.size}`, `switch-${props.color}`];
  if (checked.value) {
    classes.push('switch-checked');
  }
  return classes;
});
</script>

<template>
  <label :for="id" :class="switchClasses" @click="checked = !checked">
    <input type="checkbox" :checked="checked" :disabled="disabled" class="switch-input" />
    <span class="switch-track">
      <span class="switch-thumb" />
    </span>
  </label>
</template>

<style lang="scss" scoped>
$switchSizes: (
  sm: (
    thumbWidth: $sm-switch-thumb-width,
    thumbHeight: $sm-switch-thumb-height,
    trackWidth: $sm-switch-track-width,
    trackHeight: $sm-switch-track-height,
  ),
  md: (
    thumbWidth: $md-switch-thumb-width,
    thumbHeight: $md-switch-thumb-height,
    trackWidth: $md-switch-track-width,
    trackHeight: $md-switch-track-height,
  ),
  lg: (
    thumbWidth: $lg-switch-thumb-width,
    thumbHeight: $lg-switch-thumb-height,
    trackWidth: $lg-switch-track-width,
    trackHeight: $lg-switch-track-height,
  ),
);

$switchColors: (
  success: (
    track: $danger,
  ),
  info: (
    track: $info,
  ),
  warning: (
    track: $warning,
  ),
  danger: (
    track: $danger,
  ),
);
$gray-300: #e2e8f0;

@each $size, $sizeValue in $switchSizes {
  .switch-#{$size} {
    .switch-track {
      width: map-get($sizeValue, 'trackWidth');
      height: map-get($sizeValue, 'trackHeight');
    }
    .switch-thumb {
      width: map-get($sizeValue, 'thumbWidth');
      height: map-get($sizeValue, 'thumbHeight');
    }
  }
}

@each $colorKey, $colorValue in $switchColors {
  .switch-#{$colorKey} {
    &.switch-checked {
      .switch-track {
        background-color: map-get($colorValue, 'track');
      }
    }
  }
}

.switch {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  line-height: 0;
  &-input {
    border: 0px;
    clip: rect(0px, 0px, 0px, 0px);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0px;
    overflow: hidden;
    white-space: nowrap;
    position: absolute;
  }
  &-checked {
    .switch-thumb {
      transform: translateX(1.5rem);
    }
  }
  &-track {
    display: inline-flex;
    flex-shrink: 0;
    -webkit-box-pack: start;
    justify-content: flex-start;
    cursor: pointer;
    border-radius: 9999px;
    transition: background-color 0.2s ease 0s;
    background-color: $gray-300;
  }
  &-thumb {
    display: inline-flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 9999px;
    transition: transform 0.2s ease 0s;
    transform: translateX(0px);
    background-color: $white;
  }
}
</style>
