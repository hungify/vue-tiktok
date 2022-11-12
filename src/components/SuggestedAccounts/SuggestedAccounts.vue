<script lang="ts" setup>
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';
import { UserList } from '~/mocks/users';
import type { User } from '~/models/user';
import AccountItem from './AccountItem.vue';

interface SuggestedAccount {
  label: string;
}
defineProps<SuggestedAccount>();
const users = reactive<User[]>(UserList);
</script>

<template>
  <div :class="$style.wrapper">
    <p :class="$style.label">{{ label }}</p>
    <AccountItem v-for="acc in users" :key="acc.nickname" :item="acc" />
    <RouterLink to="#" :class="$style['more-btn']">See all</RouterLink>
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
</style>
