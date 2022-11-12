<script lang="ts" setup>
import { computed, type ImgHTMLAttributes, ref } from 'vue';
import images from '~/assets/images';

interface ImageProps extends ImgHTMLAttributes {
  src: string;
  alt: string;
  fallback?: string;
  shape?: 'circle' | 'square' | 'rounded' | 'unstyled';
}
const props = withDefaults(defineProps<ImageProps>(), {
  src: '',
  alt: '',
  fallback: images.noImage,
  shape: 'unstyled',
});

const fallback = ref('');

const handleError = () => {
  fallback.value = props.fallback;
};

const currentSrc = computed(() => {
  return props.src || fallback.value;
});

const classes = computed(() => {
  const { shape } = props;
  return {
    'image-base': true,
    [`image-${shape}`]: true,
  };
});
</script>

<template>
  <img :src="currentSrc" :alt="alt" :class="classes" @error="handleError" />
</template>

<style lang="scss" scoped>
.image {
  &-base {
    overflow: hidden;
  }
  &-circle {
    border-radius: 50%;
  }
  &-square {
    border-radius: 0;
  }
  &-rounded {
    border-radius: 8px;
  }
}
</style>
