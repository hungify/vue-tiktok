<script lang="ts" setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import type { User } from '~/models/user';
import AccountItem from './AccountItem.vue';

interface SuggestedListProps {
  label: string;
  labelEmpty?: string;
  items: User[];
}
const props = defineProps<SuggestedListProps>();

const isEmpty = computed(() => {
  return !props.items || props.items.length === 0;
});
</script>

<template>
  <div :class="$style.wrapper">
    <p :class="$style.label">{{ label }}</p>
    <div v-if="!isEmpty">
      <AccountItem v-for="acc in items" :key="acc.nickname" :item="acc" />
      <RouterLink to="#" :class="$style['more-link']">See all</RouterLink>
    </div>
    <p v-else :class="$style['label-empty']">{{ labelEmpty }}</p>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  border-top: 1px solid #e3e3e4;
  padding-bottom: 1rem;
  padding-top: 1rem;
}
.label {
  padding: pxToRem(8px);
  font-size: 1.4rem;
  font-weight: 600;
}
.more-link {
  font-size: 1.4rem;
  font-weight: 600;
  color: $danger;
}
.label-empty {
  color: rgba($text, 0.5);
  font-weight: 400;
  font-size: 1.4rem;
  padding: 0 0.8rem;
}
</style>
