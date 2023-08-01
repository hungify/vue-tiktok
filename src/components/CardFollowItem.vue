<script setup lang="ts">
import { useElementHover } from '@vueuse/core';

interface CardFollowerProps {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  avatar: string;
  tick: boolean;
  isFollowed: boolean;
  popularVideo: {
    id: string;
    thumbnailUrl: string;
    url: string;
  };

  active: boolean;
  currentVideoId: string;
}
const props = defineProps<CardFollowerProps>();

interface CardFollowerEvents {
  (event: 'onPlay', videoId: string): void;
  (event: 'onFollow', userId: string): void;
  (event: 'onUnFollow', userId: string): void;
}
const emit = defineEmits<CardFollowerEvents>();

const videoRef = ref<HTMLVideoElement | null>(null);
const cardVideoRef = ref<HTMLDivElement | null>(null);
const isHovered = useElementHover(cardVideoRef);

watch(isHovered, (value) => {
  emit('onPlay', value ? props.popularVideo.id : props.currentVideoId);
});

const fullName = computed(() => `${props.firstName} ${props.lastName}`);

watch(
  () => props.active,
  (value) => {
    if (value) {
      void videoRef.value?.play();
    } else {
      videoRef.value?.load();
    }
  },
);

const handleFollowOrUnFollow = () => {
  if (props.isFollowed) {
    emit('onUnFollow', props.id);
  } else {
    emit('onFollow', props.id);
  }
};
</script>

<template>
  <VideoOverlay
    :id="popularVideo.id"
    :active="active"
    :thumbnailUrl="popularVideo.thumbnailUrl"
    :url="popularVideo.url"
    :currentVideoId="currentVideoId"
    @onPlay="(id) => $emit('onPlay', id)"
  >
    <div class="info">
      <img :src="avatar" alt="avatar" class="avatar" />
      <h5 class="title">{{ fullName }}</h5>
      <h6 class="desc">
        <span>{{ nickname }}</span>
        <div v-if="tick" class="icon-wrap">
          <IconBase name="check" width="12" height="12" />
        </div>
      </h6>
      <div>
        <ButtonBase class="btn-follow" @click="handleFollowOrUnFollow">{{
          isFollowed ? 'Unfollow' : 'Follow'
        }}</ButtonBase>
      </div>
    </div>
  </VideoOverlay>
</template>

<style lang="scss" scoped>
.info {
  position: absolute;
  background: transparent;
  bottom: 0px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  padding: 30px 12px 20px;
  text-align: center;
  color: $white;

  .avatar {
    border-radius: 50%;
    height: 48px;
    margin-bottom: 14px;
    object-fit: cover;
    width: 48px;
  }

  .title {
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    width: 100%;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .desc {
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-bottom: 8px;

    .icon-wrap {
      margin-left: 4px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        color: $info;
      }
    }
  }
}

.btn-follow {
  min-width: 16rem;
  min-height: 3.6rem;
  padding: 6px 8px;
  text-align: center;
}
</style>
