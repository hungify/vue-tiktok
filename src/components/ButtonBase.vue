<script lang="ts" setup>
import { computed, toRefs, useCssModule, useSlots } from 'vue';
import { ObjectKeys } from '~/utils/object';

interface ButtonProps {
  type?: 'primary' | 'secondary' | 'tertiary' | 'unstyled';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'unstyled';
  variant?: 'outline' | 'solid' | 'ghost' | 'link' | 'unstyled';
  rounded?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  href?: string;
  to?: string;
  expanded?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'unstyled',
  size: 'unstyled',
  variant: 'unstyled',
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
      // eslint-disable-next-line vue/no-mutating-props
      delete props[key];
    }
  });
}

let Component = 'button';

if (href?.value) {
  Component = 'a';
} else if (to?.value) {
  Component = 'router-link';
}

const $style = useCssModule();

const classes = computed(() => {
  const { type, size, rounded, disabled, loading } = props;
  return [
    $style['btn'],
    $style[`btn-${type}`],
    $style[`btn-${size}`],
    rounded ? $style['btn-rounded'] : '',
    disabled ? $style['btn-disabled'] : '',
    loading ? $style['btn-loading'] : '',
  ];
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
    <span v-if="slots.leftIcon" :class="$style.icon">
      <slot name="leftIcon" />
    </span>
    <span :class="$style.title">
      <slot />
    </span>

    <span v-if="slots.rightIcon" :class="$style.icon">
      <slot name="rightIcon" />
    </span>
  </component>
</template>

<style lang="scss" module>
$btnColors: (
  primary: (
    default: $primary,
    hover: $primary-dark,
    active: $primary-light,
  ),
  secondary: (
    default: $secondary,
    hover: $secondary-dark,
    active: $secondary-light,
  ),
  tertiary: (
    default: $tertiary,
    hover: $tertiary-dark,
    active: $tertiary-light,
  ),
);

$btnSizes: (
  xs: (
    padding: $xs-btn-padding,
    font-size: $xs-btn-font-size,
  ),
  sm: (
    padding: $sm-btn-padding,
    font-size: $sm-btn-font-size,
  ),
  md: (
    padding: $md-btn-padding,
    font-size: $md-btn-font-size,
  ),
  lg: (
    padding: $lg-btn-padding,
    font-size: $lg-btn-font-size,
  ),
  xl: (
    padding: $xl-btn-padding,
    font-size: $xl-btn-font-size,
  ),
);

$btnBorderRadius: (
  xs: $xs-btn-border-radius,
  sm: $sm-btn-border-radius,
  md: $md-btn-border-radius,
  lg: $lg-btn-border-radius,
  xl: $xl-btn-border-radius,
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

  title {
    margin: 0 0.5rem;
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

@each $type, $colors in $btnColors {
  .btn-#{$type} {
    color: map-get($colors, 'default');
    background-color: transparent;
    border: 1px solid map-get($colors, 'default');

    &:hover {
      color: map-get($colors, 'hover');
      background-color: transparent;
      border: 1px solid map-get($colors, 'hover');
    }

    &:active {
      color: map-get($colors, 'active');
      background-color: transparent;
      border: 1px solid map-get($colors, 'active');
    }
  }
}

@each $size, $styles in $btnSizes {
  .btn-#{$size} {
    padding: map-get($styles, 'padding');
    font-size: map-get($styles, 'font-size');
  }
}

@each $size, $radius in $btnBorderRadius {
  .btn-#{$size} {
    border-radius: $radius;
  }
}
.btn-expanded {
  width: 100%;
}

.btn-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.btn-loading {
  opacity: 0.5;
  pointer-events: none;
}

.btn-unstyled {
  color: $black;
  background-color: transparent;
  border: none;
  padding: 0;
  border-radius: 0;

  &:hover {
    color: inherit;
    background-color: transparent;
    border: none;
  }

  &:active {
    color: inherit;
    background-color: transparent;
    border: none;
  }
}

.btn-solid {
  @each $type, $colors in $btnColors {
    .btn-#{$type} {
      @each $variant, $color in $colors {
        .btn-#{$variant} {
          color: $white;
          background-color: $color;
          border: 1px solid $color;

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
      }
    }
  }
}
</style>
