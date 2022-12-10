<script lang="ts" setup>
import { computed, toRefs, useSlots } from 'vue';

interface ButtonProps {
  color?: 'default' | 'success' | 'info' | 'warning' | 'danger' | 'unstyled';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'outline' | 'solid' | 'ghost' | 'link';
  rounded?: boolean;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  to?: string;
  expanded?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  color: 'danger',
  size: 'md',
  variant: 'solid',
  rounded: false,
  disabled: false,
  loading: false,
  href: '',
  to: '',
  expanded: false,
});

interface ButtonEvents {
  (eventName: 'click', event: MouseEvent): void;
}

const emits = defineEmits<ButtonEvents>();

const { to, href, disabled } = toRefs(props);
if (href?.value && to?.value) {
  throw new Error('You can only use one of href or to');
}

let Component = 'button';

if (href?.value) {
  Component = 'a';
} else if (to?.value) {
  Component = 'router-link';
}

const classes = computed(() => {
  const { color, size, rounded, disabled, loading, variant } = props;
  return {
    btn: true,
    [`btn-${size}`]: size,
    'btn-rounded': rounded,
    'btn-disabled': disabled,
    'btn-loading': loading,
    [`btn-${variant}-${color}`]: color !== 'unstyled',
    'btn-expanded': props.expanded,
  };
});

const slots = useSlots();
</script>

<template>
  <component
    :is="Component"
    :href="href"
    :to="to"
    :class="classes"
    :disabled="disabled"
    @click="emits('click', $event)"
  >
    <span v-if="slots.leftIcon" class="icon">
      <slot name="leftIcon" />
    </span>
    <span class="title">
      <slot />
    </span>

    <span v-if="slots.rightIcon" class="icon">
      <slot name="rightIcon" />
    </span>
  </component>
</template>

<style lang="scss" scoped>
$btnSizes: (
  xs: (
    padding: $xs-btn-padding,
    font-size: $xs-btn-font-size,
    border-radius: $xs-btn-border-radius,
  ),
  sm: (
    padding: $sm-btn-padding,
    font-size: $sm-btn-font-size,
    border-radius: $sm-btn-border-radius,
  ),
  md: (
    padding: $md-btn-padding,
    font-size: $md-btn-font-size,
    border-radius: $md-btn-border-radius,
  ),
  lg: (
    padding: $lg-btn-padding,
    font-size: $lg-btn-font-size,
    border-radius: $lg-btn-border-radius,
  ),
  xl: (
    padding: $xl-btn-padding,
    font-size: $xl-btn-font-size,
    border-radius: $xl-btn-border-radius,
  ),
);

$outlineHoverOpacity: 0.2;
$outlineActiveOpacity: 0.8;

$solidHoverOpacity: 0.8;
$solidActiveOpacity: 1;

$ghostHoverOpacity: 0.1;
$ghostActiveOpacity: 0.2;

$btnVariants: (
  outline: (
    danger: (
      default: $danger,
      hover: rgba($danger-light, $outlineHoverOpacity),
      active: rgba($danger-dark, $outlineActiveOpacity),
    ),
    success: (
      default: $success,
      hover: rgba($success-light, $outlineHoverOpacity),
      active: rgba($success-dark, $outlineActiveOpacity),
    ),
    warning: (
      default: $warning,
      hover: rgba($warning-light, $outlineHoverOpacity),
      active: rgba($warning-dark, $outlineActiveOpacity),
    ),
    info: (
      default: $info,
      hover: rgba($info-light, $outlineHoverOpacity),
      active: rgba($info-dark, $outlineActiveOpacity),
    ),
  ),
  solid: (
    danger: (
      default: $danger,
      hover: rgba($danger, $solidHoverOpacity),
      active: rgba($danger, $solidActiveOpacity),
    ),
    success: (
      default: $success,
      hover: $success-dark,
      active: $success-light,
    ),
    warning: (
      default: $warning,
      hover: $warning-dark,
      active: $warning-light,
    ),
    info: (
      default: $info,
      hover: $info-dark,
      active: $info-light,
    ),
  ),
  ghost: (
    danger: (
      default: $danger,
      hover: rgba($danger, $ghostHoverOpacity),
      active: rgba($danger, $ghostActiveOpacity),
    ),
    success: (
      default: $success,
      hover: rgba($success, $ghostHoverOpacity),
      active: rgba($success, $ghostActiveOpacity),
    ),
    warning: (
      default: $warning,
      hover: rgba($warning, $ghostHoverOpacity),
      active: rgba($warning, $ghostActiveOpacity),
    ),
    info: (
      default: $info,
      hover: rgba($info, $ghostHoverOpacity),
      active: rgba($info, $ghostActiveOpacity),
    ),
  ),
  link: (
    danger: (
      default: $danger,
      active: rgba($danger-dark, 1),
    ),
    success: (
      default: $success,
      active: rgba($success-dark, 1),
    ),
    warning: (
      default: $warning,
      active: rgba($warning-dark, 1),
    ),
    info: (
      default: $info,
      active: rgba($info-dark, 1),
    ),
  ),
);

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  font-family: $font-family;
  background-color: transparent;

  & + & {
    margin-left: 1.2rem;
  }

  .title {
    flex: 1 1 auto;
    text-align: left;
  }
  .icon + .title,
  .title + .icon {
    margin-left: 8px;
  }

  .icon {
    display: inline-block;
    width: 24px;
    text-align: center;
  }
}

.btn-rounded {
  border-radius: 9999px;
}

.btn-expanded {
  width: 100%;
}

.btn-disabled {
  pointer-events: none;
  cursor: not-allowed;
  color: rgba($text, 0.34);
  background-color: rgba($text, 0.06);
}

.btn-loading {
  opacity: 0;
  pointer-events: none;
}

@each $size, $styles in $btnSizes {
  .btn-#{$size} {
    padding: map-get($styles, 'padding');
    font-size: map-get($styles, 'font-size');
    border-radius: map-get($styles, 'border-radius');
  }
}

@each $variant in map-keys($btnVariants) {
  @each $color in map-keys(map-get($btnVariants, $variant)) {
    .btn-#{$variant}-#{$color} {
      @if $variant == 'outline' {
        color: map-get(map-get(map-get($btnVariants, $variant), $color), 'default');
        border: 1px solid map-get(map-get(map-get($btnVariants, $variant), $color), 'default');

        &:hover {
          background-color: map-get(map-get(map-get($btnVariants, $variant), $color), 'hover');
        }

        &:active {
          border-color: map-get(map-get(map-get($btnVariants, $variant), $color), 'active');
        }
      }
      @if $variant == 'solid' {
        color: $white;
        background-color: map-get(map-get(map-get($btnVariants, $variant), $color), 'default');

        &:hover {
          background-color: map-get(map-get(map-get($btnVariants, $variant), $color), 'hover');
        }

        &:active {
          background-color: map-get(map-get(map-get($btnVariants, $variant), $color), 'active');
        }
      }
      @if $variant == 'ghost' {
        color: map-get(map-get(map-get($btnVariants, $variant), $color), 'default');

        &:hover {
          background-color: map-get(map-get(map-get($btnVariants, $variant), $color), 'hover');
        }

        &:active {
          background-color: map-get(map-get(map-get($btnVariants, $variant), $color), 'active');
        }
      }
      @if $variant == 'link' {
        color: map-get(map-get(map-get($btnVariants, $variant), $color), 'default');

        &:hover {
          text-decoration: underline;
        }

        &:active {
          color: map-get(map-get(map-get($btnVariants, $variant), $color), 'active');
        }
      }
    }
  }
}
</style>
