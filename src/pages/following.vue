<script setup lang="ts">
import { followingList } from '~/mocks/following';

const currentVideoId = ref('1');

const handlePlay = (id: string) => {
  currentVideoId.value = id;
};
</script>

<template>
  <div class="following-list">
    <CardFollowItem
      v-for="item in followingList"
      :id="item.id"
      :key="item.id"
      :firstName="item.firstName"
      :lastName="item.lastName"
      :nickname="item.nickname"
      :avatar="item.avatar"
      :tick="item.tick"
      :isFollowed="item.isFollowed"
      :popularVideo="item.popularVideo"
      :active="currentVideoId === item.popularVideo.id"
      :currentVideoId="currentVideoId"
      @onPlay="handlePlay"
    />
  </div>
</template>

<style lang="scss" scoped>
.following-list {
  width: 100%;
  display: grid;
  gap: 2.4rem 1.6rem;
  grid-template-columns: repeat(3, 25rem);
  justify-content: center;
}
</style>
