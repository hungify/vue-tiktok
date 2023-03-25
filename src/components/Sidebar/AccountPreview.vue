<script lang="ts" setup>
import type { User } from '~/models/user';

interface AccountPreview {
  item: User;
}

const props = defineProps<AccountPreview>();
const fullName = computed(() => {
  return `${props.item.firstName} ${props.item.lastName}`;
});
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.header">
      <RouterLink :to="`@${item.nickname}`">
        <ImageBase :class="$style.avatar" :src="item.avatar" alt="avatar" />
      </RouterLink>
      <ButtonBase :class="$style['follow-btn']" size="sm"> Follow </ButtonBase>
    </div>
    <div :class="$style.body">
      <RouterLink :to="`@${item.nickname}`">
        <p :class="$style.nickname">
          <strong>{{ item.nickname }}</strong>
          <IconBase v-if="item.verified" name="check" :class="$style.check" />
        </p>
      </RouterLink>
      <RouterLink :to="`@${item.nickname}`">
        <p :class="$style.name">{{ fullName }}</p>
      </RouterLink>
      <p :class="$style.analytics">
        <strong :class="$style.value">{{ item.followers }}</strong>
        <span :class="$style.label">Follower</span>
        <strong :class="$style.value">{{ item.likes }}</strong>
        <span :class="$style.label">Likes</span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  min-width: 30rem;
  width: 100%;
  padding: 2rem;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.avatar {
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 50%;
  object-fit: cover;
}

.follow-btn {
  padding: 0.6rem 1.6rem;
}

.body {
  margin-top: 1.2rem;
  color: $text;
}

.nickname {
  font-size: 1.8rem;
}

.check {
  font-size: 1.4rem;
  color: $info;
  margin-left: 4px;
}

.name {
  font-size: 1.4rem;
}

.analytics {
  margin-top: 1rem;
  font-size: 1.8rem;
}

.value ~ .value {
  margin-left: 2rem;
}

.label {
  color: $text;
}

.value ~ .label {
  margin-left: 0.6rem;
}
</style>
