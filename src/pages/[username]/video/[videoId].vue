<script lang="ts" setup>
import VIDEOS from '~/assets/videos';

interface VideoDetailProps {
  src?: string;
  poster?: string;
  loop?: boolean;
}

const props = withDefaults(defineProps<VideoDetailProps>(), {
  src: VIDEOS.video2,
  poster: 'https://files.fullstack.edu.vn/f8-tiktok/videos/1953-64245f4b054b9.jpg',
  loop: false,
});

const router = useRouter();

const videoRef = ref<HTMLVideoElement>();

const { playing, currentTime, duration, volume, muted, buffered } = useMediaControls(videoRef, {
  src: props.src,
});

const endBuffer = computed(() => {
  return buffered.value.length > 0 ? buffered.value[buffered.value.length - 1][1] : 0;
});

const videoStyle = computed(() => {
  return {
    '--poster': props.poster,
  };
});

useEventListener(document, 'visibilitychange', (evt: Event) => {
  const target = evt.target as Document;
  if (target.visibilityState === 'visible') {
    playing.value = true;
  } else {
    playing.value = false;
  }
});

onKeyStroke(['ArrowDown', 'ArrowUp', 'm', ' '], (e) => {
  if (e.key === 'ArrowDown') {
    console.log('down');
  } else if (e.key === 'ArrowUp') {
    console.log('up');
  } else if (e.key === 'm') {
    muted.value = !muted.value;
  } else if (e.key === ' ') {
    playing.value = !playing.value;
  }
});

const handleLoadedData = () => {
  playing.value = true;
};

const handlePlayOrPause = () => {
  if (playing.value) {
    playing.value = false;
  }
};

const handleVolumeChange = (value: number) => {
  volume.value = value / 100;
};

const handleMuted = () => {
  muted.value = !muted.value;
};

const handleBack = () => {
  router.back();
};
</script>

<template>
  <div class="wrapper">
    <div class="left">
      <div class="overlay" />
      <div class="video-wrap">
        <div class="video-inner">
          <div class="video-overlay" @click="handlePlayOrPause">
            <video
              ref="videoRef"
              :loop="loop"
              :muted="muted"
              :poster="poster"
              :style="videoStyle"
              @loadeddata="handleLoadedData"
            />

            <div class="duration" @click.stop="() => {}">
              <Scrubber v-model="currentTime" :max="duration" :secondary="endBuffer" />
            </div>

            <div class="volume-slider">
              <VolumeSlider
                :volume="volume"
                :muted="muted"
                @onMuted="handleMuted"
                @onVolumeChange="handleVolumeChange"
              />
            </div>

            <div class="action-top">
              <div class="action-first">
                <ButtonBase variant="ghost" color="default" class="btn-close" @click="handleBack">
                  <IconBase name="x" width="1.8rem" height="1.8rem" />
                </ButtonBase>
                <ButtonBase variant="ghost" color="default">
                  <IconBase name="tiktok" width="3.5rem" height="3.5rem" />
                </ButtonBase>
              </div>

              <div class="action-last">
                <ButtonBase variant="ghost" color="default" class="btn-report">
                  <IconBase name="flag" width="1.8rem" height="1.8rem" />
                  Report
                </ButtonBase>
              </div>
            </div>

            <div class="action-center">
              <ButtonBase class="action" variant="ghost">
                <IconBase v-if="!playing" name="play" width="70" height="70" color="white" />
              </ButtonBase>
            </div>

            <ButtonBase class="action-previous" variant="ghost">
              <IconBase name="arrow-solid" width="26" height="26" />
            </ButtonBase>
            <ButtonBase class="action-next" variant="ghost">
              <IconBase name="arrow-solid" width="26" height="26" />
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>

    <div class="right">
      <div class="info-user">
        <RouterLink to="#" class="info-user__link">
          <div class="info-user__avatar">
            <img src="https://i.pravatar.cc/300" alt="" />
          </div>
          <div class="info-user__content">
            <span class="info-user__content__title">tu_meme_102</span>
            <div class="info-user__content__description">
              <span> Meme Bình Dương </span>
              <span>2022-12-31</span>
            </div>
          </div>
        </RouterLink>
        <ButtonBase class="btn-follow" variant="outline">Follow</ButtonBase>
      </div>

      <div class="info-video">
        <div class="info-video--content">
          <span>Bắt gặp bạn này lạc vào phòng mình </span>
          <Hashtag title="tiktokawardsvn2022" />
        </div>
        <div class="info-video--music">
          <IconBase name="music" width="12" height="12" />
          <RouterLink to="#" class="info-video--link">
            nhạc nền - 1 Sad dog - nhân nước hoa
          </RouterLink>
        </div>
      </div>

      <div class="info-video-action">
        <div class="info-video-count">
          <ul class="info-video-list">
            <li class="info-video-item">
              <ButtonBase class="action" variant="ghost" color="default">
                <IconBase name="heart" />
              </ButtonBase>
              <strong class="count">123</strong>
            </li>
            <li class="info-video-item">
              <ButtonBase class="action" variant="ghost" color="default">
                <IconBase name="comment" />
              </ButtonBase>
              <strong class="count">321</strong>
            </li>
          </ul>
        </div>

        <div class="info-video-share">
          <ul class="info-video-list">
            <li class="info-video-item">
              <ButtonBase class="action share-action" variant="ghost" color="default">
                <IconBase name="code" />
              </ButtonBase>
            </li>
            <li class="info-video-item share-item">
              <ButtonBase class="action share-action" variant="ghost" color="default">
                <IconBase name="facebook" />
              </ButtonBase>
            </li>
            <li class="info-video-item share-item">
              <ButtonBase class="action share-action" variant="ghost" color="default">
                <IconBase name="instagram" />
              </ButtonBase>
            </li>
            <li class="info-video-item share-item">
              <ButtonBase class="action share-action" variant="ghost" color="default">
                <IconBase name="twitter" />
              </ButtonBase>
            </li>
            <li class="info-video-item share-item">
              <ButtonBase class="action share-action" variant="ghost" color="default">
                <IconBase name="share" />
              </ButtonBase>
            </li>
          </ul>
        </div>
      </div>
      <div class="info-video-link">
        <p>
          https://www.tiktok.com/@nhacona/video/7189266527403691291?is_from_webapp=1&amp;sender_device=pc&amp;web_id=7178477377118291457
        </p>
        <button>Copy link</button>
      </div>

      <div class="list-comment"></div>
      <div class="box-comment"></div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: Blank
  full: true
</route>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: 2fr 1fr;
}

.left,
.right {
  position: relative;
  width: 100%;
  height: 100%;
}

.left {
  max-width: 100%;
  background: rgb(0, 0, 0);
  position: relative;
  overflow: hidden;
  padding: 0px 80px;

  .overlay {
    position: absolute;
    width: 10%;
    height: 10%;
    filter: blur(2px);
    left: 50%;
    top: 50%;
    transform: scale(11);
    opacity: 0.3;
    background: center center / cover no-repeat;
    background-image: url('--poster');
  }

  .video-wrap {
    position: absolute;
    left: 0px;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .video-inner {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background-color: rgba($text, 0.06);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      .duration {
        opacity: 1;
      }
    }
  }

  .btn-close {
    padding: 1.2rem;
    border-radius: 50%;
    background-color: rgba(84, 84, 84, 0.5);
    color: white;
  }

  .video-overlay {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;

    video {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .duration {
      width: calc(100% - 160px);
      height: 8px;
      padding-inline: 16px;
      position: absolute;
      transition: opacity 0.3s ease 0s;
      bottom: 28px;
      display: flex;
      align-items: center;
      gap: 10px;
      left: 50%;
      transform: translateX(-50%);
      max-width: 56.25vh;
      opacity: 1;
      .time {
        color: #fff;
        font-size: 1rem;
      }
    }

    .scrubber__tooltip {
      position: absolute;
      transform: translateX(-50%);
      background-color: black;
      border-radius: 0.5rem;
      padding-inline: 0.5rem;
      bottom: 0;
      margin-bottom: 0.5rem;
      padding-block: 0.25rem;
      font-size: 0.75rem;
      color: white;
    }

    .volume-slider {
      position: absolute;
      z-index: 1;
      bottom: 1.25rem;
      right: 1.25rem;
    }

    .action-top {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-top: 1.2rem;
      .action-first {
        margin-left: 2rem;
      }
      .action-last {
        margin-right: 2rem;
        .btn-report {
          background-color: rgba(84, 84, 84, 0.5);
          color: white;
          border-radius: 6.25rem;
        }
      }
    }

    .action-center {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .action-previous {
      position: absolute;
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      background: rgba(84, 84, 84, 0.5);
      border-radius: 50%;
      transform: rotate(-90deg);
      top: calc(50% - 48px);
      right: 20px;
      color: white;
    }

    .action-next {
      position: absolute;
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      background: rgba(84, 84, 84, 0.5);
      border-radius: 50%;
      transform: rotate(90deg);
      top: calc(50% + 8px);
      right: 20px;
      color: white;
    }
  }
}

.right {
  padding: 3.2rem;
  width: 54rem;
}

.info-user {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1.4rem;
  &__link {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1 1 auto;
  }
  &__avatar {
    margin-right: 1.2rem;
    width: 40px;
    height: 40px;
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    margin-right: 1.2rem;
    &__title {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      flex: 1 1 auto;
      margin-right: 12px;
      font-weight: 600;
      font-family: $font-secondary;
    }

    &__description {
      display: flex;
      flex-direction: row;
      align-items: center;
      span {
        font-size: 1.4rem;
        &:first-child {
          margin-right: 0.8rem;
        }
      }
    }
  }
  .btn-follow {
    min-height: 2.8rem;
    min-width: 8.8rem;
    padding: 0 1.2rem;
    font-size: 1.6rem;
  }
}

.info-video {
  margin-bottom: 1.4rem;
  &--content {
    display: flex;
    span::after {
      content: ' ';
      white-space: pre;
    }
  }
  &--music {
    font-weight: $font-primary;
  }
  &--link {
    margin-left: 0.8rem;
    font-weight: 600;
  }
}

.info-video-action {
  margin-bottom: 1.4rem;
  padding: 1.4rem 0;
  display: flex;
  justify-content: space-between;
}

.info-video {
  &-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style-type: none;
  }
  &-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    &:first-child {
      margin-right: 1.4rem;
    }
    strong {
      margin-left: 0.8rem;
    }
    .action {
      padding: 0.8rem;
      border-radius: 50%;
      &:not(.share-action) {
        background-color: rgba($text, 0.06);
      }
    }
    .count {
      font-size: 1.4rem;
      font-weight: 600;
    }
  }
  &-link {
    color: rgba($text, 0.75);
    font-size: 1.4rem;
    line-height: 2rem;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    border: 1px solid rgba($text, 0.12);
    border-radius: 0.8rem;
    overflow: hidden;
    p {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      flex: 1 1 auto;
      padding: 7px 0px 5px 12px;
      background-color: rgba($text, 0.06);
    }
    button {
      border: none;
      background: none rgba($text, 0.06);
      outline: none;
      color: $text;
      font-weight: 700;
      flex: 0 0 auto;
      cursor: pointer;
      padding: 0.7rem 1rem;
      &:hover {
        background-color: rgba($text, 0.03);
      }
    }
  }
}
</style>
