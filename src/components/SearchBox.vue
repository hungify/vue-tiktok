<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import ButtonBase from './ButtonBase.vue';
import IconBase from './IconBase.vue';
import { useTippy } from 'vue-tippy';
import PopperWrapper from './Popper/PopperWrapper.vue';
import AccountItem from './Sidebar/AccountItem.vue';
import type { User } from '~/models/user';
import { useDebounceFn } from '@vueuse/shared';

const searchBoxRef = ref<HTMLDivElement>();
const resultRef = ref<HTMLDivElement>();

const searchValue = ref('');
const searchResults = reactive<User[]>([]);
const loading = ref(false);
const showResults = ref(false);

const handleClear = () => {
  searchValue.value = '';
};

const handleSearchValueChange = useDebounceFn((evt: Event) => {
  searchValue.value = (evt.target as HTMLInputElement).value;
}, 1000);

const showClearAction = computed(() => {
  return !!searchValue.value && !loading.value;
});

useTippy(searchBoxRef, {
  content: resultRef,
  allowHTML: true,
  theme: 'light',
  hideOnClick: true,
});
</script>
<template>
  <div :class="$style.wrapper">
    <div ref="searchBoxRef" :class="$style.search">
      <input
        :value="searchValue"
        placeholder="Search accounts and videos"
        :spellCheck="false"
        @input="handleSearchValueChange"
      />
      <ButtonBase
        v-if="showClearAction"
        variant="ghost"
        color="default"
        :class="$style['clear-btn']"
        @click="handleClear"
      >
        <IconBase name="x-circle" width="16" height="16" />
      </ButtonBase>

      <IconBase v-if="loading" name="check" width="24" height="24" />
      <div>
        <ButtonBase
          variant="ghost"
          color="default"
          :class="$style['search-btn']"
          @mousedown="(evt) => evt.preventDefault()"
        >
          <IconBase name="search" width="24" height="24" />
        </ButtonBase>
      </div>
    </div>
    <div v-show="showResults && searchResults[0]" :class="$style['result-search']">
      <PopperWrapper>
        <h4 :class="$style['search-title']">Accounts</h4>
        <AccountItem
          v-for="item in searchResults"
          :key="item.nickname"
          data="{result}"
          :item="item"
        />
      </PopperWrapper>
    </div>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  $search-width: 40rem;
  .search,
  .search-result {
    width: $search-width;
  }

  .search {
    position: relative;
    height: $search-height;
    padding-left: 1.6rem;
    display: flex;
    background-color: rgba(22, 24, 35, 0.06);
    border-radius: $search-border-radius;
    border: 1.5px solid transparent;

    input {
      flex: 1 1 auto;
      height: 100%;
      color: $black;
      font-size: 1.6rem;
      caret-color: $danger;
      background-color: transparent;
      font-family: $font-primary;
    }

    input:not(:placeholder-shown) ~ .search-btn {
      color: rgba(22, 24, 35, 0.75);
    }

    &::after {
      content: '';
      position: absolute;
      top: $search-top-spacer;
      right: $search-button-width;
      width: 1px;
      height: calc(#{$search-height} - #{$search-top-spacer} * 2);
      background-color: rgba(22, 24, 35, 0.12);
    }

    &:focus-within {
      border-color: rgba(22, 24, 35, 0.2);
    }
  }

  .search-title {
    padding: 5px 12px;
    font-size: 1.4rem;
    font-weight: 600;
    color: rgba($text, 0.5);
  }

  .clear-btn,
  .loading {
    position: absolute;
    right: $search-button-width;
    top: 50%;
    padding-left: 1rem;
    padding-right: 1rem;
    transform: translateY(-50%);
    color: rgba($text, 0.34);
  }

  .loading {
    animation: spinner 0.8s linear infinite;
  }

  @keyframes spinner {
    from {
      transform: translateY(-50%) rotate(0);
    }
    to {
      transform: translateY(-50%) rotate(360deg);
    }
  }

  .search-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: $search-button-width;
    height: 100%;
    border-top-right-radius: $search-border-radius;
    border-bottom-right-radius: $search-border-radius;
    font-size: 1.8rem;
    padding: 1rem;
    color: rgba($text, 0.34);

    &:hover {
      cursor: pointer;
      background-color: rgba(22, 24, 35, 0.03);
    }

    &:active {
      background-color: rgba(22, 24, 35, 0.06);
    }
  }
}
</style>
