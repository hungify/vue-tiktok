<script lang="ts" setup>
import { reactive, ref } from 'vue';

import ButtonBase from '~/components/ButtonBase.vue';
import IconBase from '~/components/IconBase.vue';
import Tab from '~/components/Tabs/Tab.vue';
import TabList from '~/components/Tabs/TabList.vue';
import TabPanel from '~/components/Tabs/TabPanel.vue';
import TabPanels from '~/components/Tabs/TabPanels.vue';
import Tabs from '~/components/Tabs/Tabs.vue';
import type { IconName } from '~/interfaces/icon';
interface VideoTab {
  id: number;
  title: string;
  icon?: IconName;
  content: string;
}

const tabs = reactive<VideoTab[]>([
  {
    id: 1,
    title: 'Video',
    content: 'Video content',
  },
  {
    id: 2,
    title: 'Liked',
    icon: 'lock',
    content: 'Video Liked',
  },
]);

const selectedTab = ref(1);
</script>

<template>
  <div :class="$style.wrapper">
    <div>
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
            <span>{{ tab.content }}</span>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  max-width: 692px;
  padding-left: 16px;
  padding-right: 16px;
}

.user-profile {
  display: flex;
  flex-direction: row;
  width: 100%;
  // padding: 20px 0;
  // position: relative;
  // scroll-margin-top: $default-layout-header-height;
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
  width: 460px;
}
</style>
