<script lang="ts" setup>
import { computed } from 'vue';
import type { IconName } from '~/interfaces/icon';
import IconBase from './IconBase.vue';

interface HashTagProps {
  title: string;
  type?: 'music' | 'tag';
  variant?: 'link' | 'button';
}
const props = withDefaults(defineProps<HashTagProps>(), {
  variant: 'link',
  type: 'tag',
});

const labelPath = computed(() => props.title.replace(/\s/g, '-'));
</script>

<template>
  <RouterLink :to="`/${type}/${labelPath}`" class="hashtag">
    <strong v-if="variant === 'link'">#{{ title }}</strong>
    <div v-else-if="variant === 'button'" class="hashtag-inner">
      <IconBase :name="type as IconName" width="16" height="16" />
      <strong class="label-name">{{ title }}</strong>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.hashtag {
  display: block;
  width: fit-content;
  max-width: 100%;
  cursor: pointer;

  &:hover strong {
    text-decoration: underline;
  }

  &-inner {
    display: flex;
    align-items: center;
    width: fit-content;
    max-width: 100%;
    margin-bottom: 1rem;
    padding: 4px 10px;
    border: 1px solid rgba($text, 0.2);
    border-radius: 12px;
    background: $white;
    transition: background 200ms ease-in-out 0s;
    margin-right: 0.8rem;
    &:hover {
      background: rgba($text, 0.1);
    }
  }
  .label-name {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: rgba($text, 0.75);
    font-weight: 400;
    font-size: 1.4rem;
    padding-left: 0.6rem;
  }
}
</style>
