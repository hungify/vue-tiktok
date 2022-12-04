<script lang="ts" setup>
import { computed, toRefs, useSlots } from 'vue';
import { ObjectKeys } from '~/utils/object';

interface ButtonProps {
  color?: 'default' | 'success' | 'info' | 'warning' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'unstyled';
  variant?: 'outline' | 'solid' | 'ghost' | 'link';
  rounded?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
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
  onClick: () => {},
  href: '',
  to: '',
  expanded: false,
});

const { to, href, disabled, onClick } = toRefs(props);
if (href?.value && to?.value) {
  throw new Error('You can only use one of href or to');
}

if (disabled?.value) {
  ObjectKeys(props).forEach((key) => {
    if (key.startsWith('on') && typeof props[key] === 'function') {
      Object.defineProperty(props, key, {
        value: () => {},
        writable: false,
      });
    }
  });
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
    [`btn-${color}`]: color,
    [`btn-${size}`]: size,
    'btn-rounded': rounded,
    'btn-disabled': disabled,
    'btn-loading': loading,
    [`btn-${variant}`]: variant,
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
    @click="onClick"
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
$btnColors: (
  default: (
    default: $default,
    hover: $default-dark,
    active: $default-light,
  ),
  info: (
    default: $info,
    hover: $info-dark,
    active: $info-light,
  ),
  warning: (
    default: $warning,
    hover: $warning-dark,
    active: $warning-light,
  ),
  success: (
    default: $success,
    hover: $success-dark,
    active: $success-light,
  ),
  danger: (
    default: $danger,
    hover: $danger-dark,
    active: $danger-light,
  ),
);

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

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  font-family: $font-family;
  & + & {
    margin-left: 1.2rem;
  }

  .title {
    flex: 1 1 auto;
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

@each $size, $styles in $btnSizes {
  .btn-#{$size} {
    padding: map-get($styles, 'padding');
    font-size: map-get($styles, 'font-size');
    border-radius: map-get($styles, 'border-radius');
  }
}

.btn-rounded {
  border-radius: 9999px;
}

.btn-expanded {
  width: 100%;
}

.btn-disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}

.btn-loading {
  opacity: 0.5;
  pointer-events: none;
}

@each $type, $colors in $btnColors {
  .btn-#{$type} {
    &.btn-ghost {
      color: map-get($colors, 'default');
      background-color: transparent;

      &:hover {
        color: map-get($colors, 'hover');
        background-color: rgba(map-get($colors, 'hover'), 0.1);
      }

      &:active {
        color: map-get($colors, 'active');
        background-color: transparent;
      }
    }

    &.btn-solid {
      color: $white;
      background-color: map-get($colors, 'default');
      border: 1px solid map-get($colors, 'default');

      &:hover {
        color: $white;
        background-color: map-get($colors, 'hover');
        border: 1px solid map-get($colors, 'hover');
      }

      &:active {
        color: $white;
        background-color: map-get($colors, 'active');
        border: 1px solid map-get($colors, 'active');
      }
    }

    &.btn-link {
      color: map-get($colors, 'default');
      background-color: transparent;
      border: none;

      &:hover {
        color: map-get($colors, 'hover');
        background-color: transparent;
        border: none;
        text-decoration: underline;
      }

      &:active {
        color: map-get($colors, 'active');
        background-color: transparent;
        border: none;
        text-decoration: underline;
      }
    }

    &.btn-outline {
      color: map-get($colors, 'default');
      background-color: transparent;
      border: 1px solid map-get($colors, 'default');

      &:hover {
        background-color: rgba(map-get($colors, 'hover'), 0.1);
      }

      &:active {
        background-color: map-get($colors, 'active');
      }
    }
  }
}
</style>
