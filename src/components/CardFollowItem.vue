<script setup lang="ts">
import { useElementHover } from '@vueuse/core';
import { ref, watch, computed } from 'vue';
import { RouterLink } from 'vue-router';
import ButtonBase from './ButtonBase.vue';
import IconBase from './IconBase.vue';

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
    thumbUrl: string;
    fileUrl: string;
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
      videoRef.value?.play();
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
  <div ref="cardVideoRef" class="card-follower-container">
    <RouterLink to="#" class="follower-link">
      <div class="follower-inner">
        <div class="overlay">
          <img :src="popularVideo.thumbUrl" alt="video" />
          <div v-show="active" class="video-player">
            <div>
              <video ref="videoRef" :src="popularVideo.fileUrl" loop :muted="true" />
            </div>
          </div>
        </div>
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
      </div>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.card-follower-container {
  display: flex;
  width: 226px;
  height: 302px;
  border-radius: 8px;
  overflow: hidden;

  .follower-link {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(22, 24, 35, 0.06);
  }
  .follower-inner {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background-color: rgba(22, 24, 35, 0.06);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
  }
  .overlay {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background-color: rgba(22, 24, 35, 0.06);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .video-player {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      div {
        width: 100%;
        height: 100%;
      }
      video {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
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
}
</style>
