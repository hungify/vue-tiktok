<script lang="ts" setup>
import { useTippy } from 'vue-tippy';
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
  min-width: $search-width;
  padding: 0.3rem 0;

  @media (max-width: 768px) {
    display: none;
  }

  .search,
  .search-result {
    width: 100%;
  }

  .search {
    position: relative;
    padding-left: 1.6rem;
    display: flex;
    align-items: center;
    background-color: rgba(22, 24, 35, 0.06);
    border-radius: $search-border-radius;

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
