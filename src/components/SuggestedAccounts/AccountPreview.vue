<script lang="ts" setup>
import { computed } from 'vue';
import type { User } from '~/models/user';
import ButtonBase from '../ButtonBase.vue';
import IconBase from '../IconBase.vue';
import ImageBase from '../ImageBase.vue';

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
      <ImageBase :class="$style.avatar" :src="item.avatar" alt="avatar" />
      <ButtonBase :class="$style['follow-btn']" type="primary" size="lg"> Follow </ButtonBase>
    </div>
    <div :class="$style.body">
      <p :class="$style.nickname">
        <strong>{{ item.nickname }}</strong>
        <IconBase v-if="item.verified" name="check" :class="$style.check" />
      </p>
      <p :class="$style.name">{{ fullName }}</p>
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
  width: pxToRem(480px);
  padding: pxToRem(20px);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.avatar {
  width: pxToRem(44px);
  height: pxToRem(44px);
  border-radius: 50%;
  object-fit: cover;
}

.follow-btn {
  padding: 6px 16px;
}

.body {
  margin-top: 12px;
  color: #161823;
}

.nickname {
  font-size: 1.8rem;
}

.check {
  font-size: 1.4rem;
  color: #20d5ec;
  margin-left: 4px;
}

.name {
  font-size: 1.4rem;
}

.analytics {
  margin-top: pxToRem(10px);
  font-size: 1.8rem;
}

.value ~ .value {
  margin-left: pxToRem(20px);
}

.label {
  color: #161823bf;
}

.value ~ .label {
  margin-left: pxToRem(6px);
}
</style>
