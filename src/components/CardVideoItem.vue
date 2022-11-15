<script lang="ts" setup>
import {
  useIntersectionObserver,
  useWindowSize,
  type UseIntersectionObserverOptions,
} from '@vueuse/core';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Tippy } from 'vue-tippy';
import type { User } from '~/models/user';
import type { Video } from '~/models/video';
import BaseVideoPlayer from './BaseVideoPlayer.vue';
import ButtonBase from './ButtonBase.vue';
import Hashtag from './Hashtag.vue';
import IconBase from './IconBase.vue';
import ImageBase from './ImageBase.vue';
import PopperWrapper from './Popper/PopperWrapper.vue';
import AccountPreview from './SuggestedAccounts/AccountPreview.vue';

interface CardPlayerProps {
  video: Video;
  user: User;
  active: boolean;
}
const props = defineProps<CardPlayerProps>();

interface EventProps {
  (event: 'onIntersecting', videoId: string, shouldBePlay: boolean): void;
}

const emit = defineEmits<EventProps>();

const currentVideoRef = ref<InstanceType<typeof BaseVideoPlayer>>();
const fullName = computed(() => `${props.user.firstName} ${props.user.lastName}`);
const isVideoVisible = ref(false);

const { width } = useWindowSize();
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
      isVideoVisible.value = isIntersecting;
    }
  },
  options.value,
);

watch(isVideoVisible, (value) => {
  emit('onIntersecting', props.video.id, value);
});

onBeforeUnmount(() => {
  stop();
});

watch(
  () => props.active,
  (value) => {
    if (value) {
      currentVideoRef.value?.onPlay();
    } else {
      currentVideoRef.value?.onPause();
    }
  },
);
</script>

<template>
  <div :class="$style.wrapper">
    <RouterLink :to="`/@/${user.nickname}`">
      <Tippy arrow theme="light" placement="bottom" interactive :delay="[0, 400]" :offset="[80, 0]">
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
          <RouterLink :to="user.nickname">
            <strong :class="$style['full-name']">{{ fullName }}</strong>
            <span :class="$style.nickname">{{ user.nickname }}</span>
          </RouterLink>
        </div>
        <div :class="$style.action">
          <ButtonBase size="sm" type="primary" variant="solid"> Follow </ButtonBase>
        </div>
        <div :class="$style['video-info']">
          <span :class="$style.desc">
            {{ video.description }}
          </span>
          <Hashtag v-for="tag in video.hashtags" :key="tag" :text="tag" />
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
      <BaseVideoPlayer ref="currentVideoRef" :video="video" />
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
  .action {
    position: absolute;
    right: 12px;
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
</style>
