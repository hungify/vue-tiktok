<script lang="ts" setup>
import {
  useIntersectionObserver,
  useWindowSize,
  type UseIntersectionObserverOptions,
} from '@vueuse/core';
import { Tippy } from 'vue-tippy';
import type { User } from '~/models/user';
import type { Video } from '~/models/video';
import PopperWrapper from './Popper/PopperWrapper.vue';
import AccountPreview from './Sidebar/AccountPreview.vue';
import BaseVideoPlayer from './VideoPlayer/BaseVideoPlayer.vue';

interface CardVideoItemProps {
  video: Video;
  user: User;
  active: boolean;
}
const props = defineProps<CardVideoItemProps>();

interface CardVideoItemEvents {
  (event: 'onIntersecting', videoId: string, shouldBePlay: boolean): void;
}
const emits = defineEmits<CardVideoItemEvents>();

const currentVideoRef = ref<InstanceType<typeof BaseVideoPlayer>>();
const cardVideoRef = ref<HTMLElement>();
const isVideoInView = ref(false);
const { width } = useWindowSize();
const router = useRouter();

const fullName = computed(() => `${props.user.firstName} ${props.user.lastName}`);

const options = computed(() => {
  const baseOptions: UseIntersectionObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6,
  };
  if (width.value >= 1920) {
    Object.assign(baseOptions, {
      threshold: 0.7,
    });
  } else if (width.value >= 2550) {
    Object.assign(baseOptions, {
      threshold: 0.8,
    });
  }
  return baseOptions;
});

const { stop } = useIntersectionObserver(
  currentVideoRef,
  (entries) => {
    if (entries[0]) {
      const { isIntersecting } = entries[0];
      isVideoInView.value = isIntersecting;
    }
  },
  options.value,
);

watch(isVideoInView, (value) => {
  emits('onIntersecting', props.video.id, value);
});

watch(
  () => props.active,
  (value) => {
    if (value && currentVideoRef.value?.id === props.video.id) {
      currentVideoRef.value?.onPlay();
    }
  },
);

const scrollToVideo = () => {
  if (cardVideoRef.value) {
    cardVideoRef.value.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
};

const handleLikeVideo = () => {
  console.log('like video');
};

const handleCommentVideo = () => {
  console.log('comment video');
};

const handleShareVideo = () => {
  console.log('share video');
};

defineExpose({
  scrollToVideo,
});

onBeforeUnmount(() => {
  stop();
});

const handleGotoDetail = () => {
  void router.push(`/@${props.user.nickname}/video/${props.video.id}`);
};
</script>

<template>
  <div ref="cardVideoRef" class="card-video">
    <div>
      <Tippy
        arrow
        theme="light"
        placement="bottom"
        interactive
        :delay="[0, 400]"
        :offset="[140, 0]"
      >
        <template #default>
          <div class="user-avatar">
            <ImageBase
              :src="user.avatar"
              :alt="user.nickname"
              class="avatar"
              fallback="https://avatars.dicebear.com/api/adventurer/your-custom-seed.svg"
            />
          </div>
        </template>
        <template #content>
          <PopperWrapper>
            <AccountPreview :item="user" />
          </PopperWrapper>
        </template>
      </Tippy>
    </div>

    <div class="content">
      <div class="info">
        <div class="user-info">
          <RouterLink :to="`@${user.nickname}`">
            <strong class="full-name">{{ fullName }}</strong>
            <span class="nickname">{{ user.nickname }}</span>
          </RouterLink>
        </div>
        <div class="action">
          <ButtonBase class="btn-follow']" size="sm" variant="outline"> Follow </ButtonBase>
        </div>
        <div class="video-info">
          <span class="desc">
            {{ video.description }}
          </span>
          <div class="hashtag-list">
            <Hashtag v-for="tag in video.hashtags" :key="tag" :title="tag" />
          </div>
        </div>
        <div class="song-info">
          <IconBase name="music" width="12" heigh="12" />
          <RouterLink to="/music" class="song-name">
            <span>
              {{ video.song }}
            </span>
          </RouterLink>
        </div>
      </div>

      <div class="video-and-actions">
        <div @click="handleGotoDetail">
          <BaseVideoPlayer :id="video.id" ref="currentVideoRef" :url="video.url" />
        </div>
        <ul class="actions">
          <li class="actions-item">
            <ButtonBase class="action" variant="ghost" color="default" @click="handleLikeVideo">
              <IconBase name="heart" />
            </ButtonBase>
            <strong class="count">{{ video.likesCount }}</strong>
          </li>
          <li class="actions-item">
            <ButtonBase class="action" variant="ghost" color="default" @click="handleCommentVideo">
              <IconBase name="comment" />
            </ButtonBase>
            <strong class="count">{{ video.commentsCount }}</strong>
          </li>
          <li class="actions-item">
            <ButtonBase class="action" variant="ghost" color="default" @click="handleShareVideo">
              <IconBase name="share" />
            </ButtonBase>
            <strong class="count">{{ video.sharesCount }}</strong>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-video {
  display: flex;
  justify-content: space-between;
  position: relative;
  gap: 0.5rem;
  padding: 1.5rem 0;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    transform: scaleY(0.5);
    background: rgba(22, 24, 35, 0.2);
  }
}

.user-avatar {
  height: 3.5rem;
  width: 3.5rem;
}
.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.content {
  width: 100%;
}

.info {
  margin-left: 12px;
  flex: 1 1 pxToRem(724px);
  margin-bottom: pxToRem(12px);

  .user-info {
    cursor: pointer;
    &:hover .full-name {
      text-decoration: underline;
    }
    .nickname {
      margin-left: 8px;
    }
  }
  .hashtag-list {
    display: flex;
    max-width: 35rem;
    gap: 0.8rem;
  }
  .action {
    position: absolute;
    right: 12px;
    .btn-follow {
      min-height: 28px;
      min-width: 88px;
      padding: 0 1.2rem;
      font-size: 1.6rem;
    }
  }

  .video-info {
    .desc {
      display: block;
    }
  }
  .song-info {
    cursor: pointer;
    &:hover .song-name {
      text-decoration: underline;
    }
    .song-name {
      margin-left: 8px;
    }
  }
}

.video-and-actions {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}
.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .action {
    padding: pxToRem(16px);
    background-color: rgba(22, 24, 35, 0.06);
    border-radius: 50%;
    margin: pxToRem(8px) 0;
  }
  .count {
    color: rgba(22, 24, 35, 0.6);
  }
}
</style>
