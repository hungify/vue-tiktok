<script lang="ts" setup>
import { computed } from 'vue';
import { Tippy } from 'vue-tippy';
import type { User } from '~/models/user';
import IconBase from '../IconBase.vue';
import ImageBase from '../ImageBase.vue';
import PopperWrapper from '../Popper/PopperWrapper.vue';
import AccountPreview from './AccountPreview.vue';

interface AccountItem {
  item: User;
}

const props = defineProps<AccountItem>();

const fullName = computed(() => {
  return `${props.item.firstName} ${props.item.lastName}`;
});
</script>

<template>
  <Tippy
    tag="div"
    interactive
    placement="bottom"
    :delay="[300, 0]"
    :offset="[-10, 0]"
    theme="light"
    arrow
  >
    <template #default>
      <div :class="$style['account-item']">
        <ImageBase :class="$style.avatar" :src="item.avatar" alt="avatar" />
        <div :class="$style['item-info']">
          <p :class="$style.nickname">
            <strong>{{ item.nickname }}</strong>
            <IconBase v-if="item.verified" name="check" :class="$style.check" />
          </p>
          <p :class="$style.name">{{ fullName }}</p>
        </div>
      </div>
    </template>
    <template #content>
      <div tabIndex="-1">
        <PopperWrapper>
          <AccountPreview :item="item" />
        </PopperWrapper>
      </div>
    </template>
  </Tippy>
</template>

<style lang="scss" module>
.account-item {
  display: flex;
  padding: pxToRem(8px) 0;
  cursor: pointer;
}

.avatar {
  width: pxToRem(32px);
  height: pxToRem(32px);
  border-radius: 50%;
  object-fit: cover;
}

.item-info {
  flex: 1;
  margin-left: 12px;
}

.nickname {
  margin-top: 0;
  font-size: 1.6rem;
  color: $text;
  line-height: 1;
}

.check {
  margin-left: 4px;
  font-size: 1.4rem;
  color: $info;
}

.name {
  font-size: 1.2rem;
  opacity: $text;
}
</style>
