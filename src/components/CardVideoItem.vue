<script lang="ts" setup>
import {
  useIntersectionObserver,
  useWindowSize,
  type UseIntersectionObserverOptions,
} from '@vueuse/core';
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { Tippy } from 'vue-tippy';
import type { User } from '~/models/user';
import type { Video } from '~/models/video';
import ButtonBase from './ButtonBase.vue';
import Hashtag from './Hashtag.vue';
import IconBase from './IconBase.vue';
import ImageBase from './ImageBase.vue';
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
</script>

<template>
  <div ref="cardVideoRef" :class="$style.wrapper">
    <RouterLink :to="`/@${user.nickname}`">
      <Tippy
        arrow
        theme="light"
        placement="bottom"
        interactive
        :delay="[0, 400]"
        :offset="[140, 0]"
      >
        <template #default>
          <div :class="$style['user-avatar']">
            <ImageBase
              :src="user.avatar"
              :alt="user.nickname"
              :class="$style.avatar"
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
    </RouterLink>
    <div :class="$style.content">
      <div :class="$style.info">
        <div :class="$style['user-info']">
          <RouterLink :to="`/@${user.nickname}`">
            <strong :class="$style['full-name']">{{ fullName }}</strong>
            <span :class="$style.nickname">{{ user.nickname }}</span>
          </RouterLink>
        </div>
        <div :class="$style.action">
          <ButtonBase :class="$style['btn-follow']" size="sm" variant="outline">
            Follow
          </ButtonBase>
        </div>
        <div :class="$style['video-info']">
          <span :class="$style.desc">
            {{ video.description }}
          </span>
          <div :class="$style['hashtag-list']">
            <Hashtag v-for="tag in video.hashtags" :key="tag" :title="tag" />
          </div>
        </div>
        <div :class="$style['song-info']">
          <IconBase name="music" width="12" heigh="12" />
          <RouterLink to="/music" :class="$style['song-name']">
            <span>
              {{ video.song }}
            </span>
          </RouterLink>
        </div>
      </div>

      <div :class="$style['video-and-actions']">
        <BaseVideoPlayer :id="video.id" ref="currentVideoRef" :url="video.url" />
        <ul :class="$style.actions">
          <li :class="$style['actions-item']">
            <ButtonBase
              :class="$style.action"
              variant="ghost"
              color="default"
              @click="handleLikeVideo"
            >
              <IconBase name="heart" />
            </ButtonBase>
            <strong :class="$style.count">{{ video.likesCount }}</strong>
          </li>
          <li :class="$style['actions-item']">
            <ButtonBase
              :class="$style.action"
              variant="ghost"
              color="default"
              @click="handleCommentVideo"
            >
              <IconBase name="comment" />
            </ButtonBase>
            <strong :class="$style.count">{{ video.commentsCount }}</strong>
          </li>
          <li :class="$style['actions-item']">
            <ButtonBase
              :class="$style.action"
              variant="ghost"
              color="default"
              @click="handleShareVideo"
            >
              <IconBase name="share" />
            </ButtonBase>
            <strong :class="$style.count">{{ video.sharesCount }}</strong>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  display: flex;
  position: relative;
  padding: pxToRem(30px) 0;
  &:first-child {
    padding-top: 0;
  }
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

.info {
  margin-left: 12px;
  width: pxToRem(724px);
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
