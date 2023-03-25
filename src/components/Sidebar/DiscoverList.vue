<script lang="ts" setup>
import { HashTags } from '~/mocks/hashtag';
</script>

<template>
  <div :class="$style.wrapper">
    <p :class="$style.title">Discover</p>
    <div :class="$style['discover-list']">
      <Hashtag
        v-for="tag in HashTags"
        :key="tag.id"
        :type="tag.type"
        :title="tag.label"
        variant="button"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  border-top: 1px solid #e3e3e4;
  padding-bottom: 1rem;
  padding-top: 1rem;
}
.title {
  padding: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
}
.discover-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
</style>
