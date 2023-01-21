<script lang="ts" setup>
import { reactive, ref } from 'vue';
import ButtonBase from '~/components/ButtonBase.vue';
import IconBase from '~/components/IconBase.vue';
import Tab from '~/components/Tabs/Tab.vue';
import TabList from '~/components/Tabs/TabList.vue';
import TabPanel from '~/components/Tabs/TabPanel.vue';
import TabPanels from '~/components/Tabs/TabPanels.vue';
import Tabs from '~/components/Tabs/Tabs.vue';
import VideoOverlay from '~/components/VideoOverlay.vue';
import type { IconName } from '~/interfaces/icon';
import { videoProfiles } from '~/mocks/profile';
import type { Video } from '~/models/video';

interface VideoTab {
  id: number;
  title: string;
  icon?: IconName;
  videos: Video[];
}

const tabs = reactive<VideoTab[]>([
  {
    id: 1,
    title: 'Video',
    videos: videoProfiles,
  },
  {
    id: 2,
    title: 'Liked',
    icon: 'lock-solid',
    videos: [],
  },
]);

const selectedTab = ref(1);

const currentVideoId = ref('1');

const handlePlay = (id: string) => {
  currentVideoId.value = id;
};
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style['info-inner']">
      <div :class="$style['user-profile']">
        <div :class="$style['user-share-info']">
          <div :class="$style['user-info']">
            <img src="https://i.pravatar.cc/300" alt="avatar" />
            <div>
              <h2 :class="$style['nick-name']">david</h2>
              <h5 :class="$style['full-name']">David Nguyen</h5>
              <div :class="$style['btn-follow-wrap']">
                <ButtonBase expanded size="sm" :class="$style['btn-follow']">Follow</ButtonBase>
              </div>
            </div>
          </div>
          <div :class="$style.action">
            <IconBase name="share" />
            <IconBase name="ellipsis-horizontal" />
          </div>
        </div>
      </div>
      <div :class="$style['count-info']">
        <div :class="$style['count-wrap']">
          <strong :class="$style['count-following']">100</strong>
          <span :class="$style['count-label']">Following</span>
        </div>
        <div :class="$style['count-wrap']">
          <strong :class="$style['count-following']">53.9K</strong>
          <span :class="$style['count-label']">Followers</span>
        </div>
        <div :class="$style['count-wrap']">
          <strong :class="$style['count-following']">996.4K</strong>
          <span :class="$style['count-label']">Likes</span>
        </div>
      </div>
      <h2 :class="$style['user-bio']">no bio yet 💛</h2>
      <div :class="$style['user-media-social']">
        <a href="https://www.facebook.com/phuong.ne.77398">
          <IconBase name="link" />
          <span>www.facebook.com/phuong.ne.77</span>
        </a>
      </div>
    </div>
    <div :class="$style['profile-tabs']">
      <Tabs v-model="selectedTab" :fitted="true" variant="line">
        <TabList>
          <Tab v-for="tab in tabs" :key="tab.id" :icon="tab.icon">
            {{ tab.title }}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel v-for="tab in tabs" :key="tab.id">
            <div v-if="tab.videos[0]" :class="$style['video-list']">
              <template v-for="video in tab.videos" :key="video.id">
                <VideoOverlay
                  :id="video.id"
                  :active="video.id === currentVideoId"
                  :thumbnailUrl="video.thumbnailUrl"
                  :url="video.url"
                  :currentVideoId="currentVideoId"
                  @onPlay="handlePlay"
                  >#hashtag</VideoOverlay
                >
              </template>
            </div>
            <div v-else :class="$style['tab-panel-empty']">
              <IconBase name="lock-outline" width="90" height="90" />
              <strong :class="$style['title']">This user's liked videos are private</strong>
              <p :class="$style['desc']">Videos liked by kienkienthuc369 are currently hidden</p>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  padding-left: 16px;
  padding-right: 16px;
}

.info-inner {
  max-width: 70rem;
}

.user-profile {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.user-share-info {
  display: flex;
  width: 100%;
  img {
    border-radius: 50%;
    flex-shrink: 0;
    height: 116px;
    margin-right: 20px;
    object-fit: cover;
    width: 116px;
  }
}
.user-info {
  display: flex;
  max-width: 50rem;
  width: 100%;
  .nick-name,
  .full-name {
    text-overflow: ellipsis;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
  }
  .nick-name {
    font-family: $font-secondary;
    font-weight: 700;
    line-height: 3.8rem;
    margin-bottom: 0.4rem;
  }
  .full-name {
    font-family: $font-primary;
    font-weight: 600;
    font-size: 1.8rem;
    line-height: 2.5rem;
  }

  .btn-follow-wrap {
    font-family: $font-secondary;
    font-weight: 600;
    line-height: 2.5rem;
    position: relative;
    width: 20rem;
    margin-top: 1.6rem;
  }
  .btn-follow {
    font-size: 1.8rem;
  }
}

.action {
  display: flex;
  width: 60px;
  justify-content: space-between;
}

.count-info {
  display: flex;
  align-items: center;
  margin-top: 2.2rem;
}

.count-wrap {
  font-family: $font-secondary;
  font-size: 1.8rem;
  line-height: 2.5rem;
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-right: 2rem;
  }
}

.count-following {
  color: $text;
}

.count-label {
  color: rgba($text, 0.75);
  font-family: $font-primary;
  font-weight: 400;
  font-size: 1.6rem;
  display: inline-block;
  margin-left: 0.6rem;
}

.user-bio {
  text-align: left;
  color: rgba($text, 1);
  font-family: $font-primary;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.2rem;
  white-space: pre-line;
  margin-top: 1rem;
}

.user-media-social {
  font-family: $font-secondary;
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.2rem;
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  margin-top: 5px;
  a {
    &:hover {
      text-decoration: underline;
    }
  }
}

.profile-tabs {
  margin-top: 2rem;
  min-height: 49rem;
}

.tab-panel-empty {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 10% auto;

  svg {
    fill-opacity: 0.34;
    margin-bottom: 2.4rem;
  }
  .title {
    font-size: 2.4rem;
    line-height: 2.8rem;
    font-family: $font-secondary;
    font-weight: 700;
    color: $text;
    margin-top: 2.4rem;
  }
  .desc {
    font-size: 1.6rem;
    line-height: 2.2rem;
    font-family: $font-primary;
    font-weight: 400;
    color: rgba($text, 0.75);
    margin-top: 0.8rem;
  }
}

.video-list {
  display: grid !important;
  gap: 2.4rem 1.6rem;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
}
</style>
