<script lang="ts" setup>
import { computed, ref } from 'vue';
import ButtonBase from './ButtonBase.vue';
import IconBase from './IconBase.vue';
// import { useTippy } from 'vue-tippy';

const btn = ref(null);

const searchValue = ref('');
const searchResults = ref([]);
const loading = ref(false);
const showResults = ref(false);

const handleClear = () => {
  searchValue.value = '';
};

const showClearAction = computed(() => {
  return !!searchValue.value && !loading.value;
});

// if (btn.value) {
//   useTippy(btn.value, {
//     content: 'Cool!',
//     allowHTML: true,
//     interactive: true,
//     placement: 'bottom-end',
//     trigger: 'click',
//     theme: 'light',
//     animation: 'shift-away',
//     inertia: true,
//     hideOnClick: false,
//   });
// }
</script>
<template>
  <div class="wrapper">
    <div class="search">
      <input
        ref="inputRef"
        v-model="searchValue"
        placeholder="Search accounts and videos"
        :spellCheck="false"
      />
      <ButtonBase v-if="showClearAction" class-name="clear-btn" @click="handleClear">
        <IconBase name="x" width="16" height="16" />
      </ButtonBase>

      <IconBase v-if="loading" name="check" width="24" height="24" />
      <ButtonBase class="search-btn" @mousedown="(evt) => evt.preventDefault()">
        <IconBase name="search" width="24" height="24" />
      </ButtonBase>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  $search-width: pxToRem(500px);
  .search,
  .search-result {
    width: $search-width;
  }

  .search {
    position: relative;
    height: $search-height;
    padding-left: 16px;
    display: flex;
    background-color: rgba(22, 24, 35, 0.06);
    border-radius: $search-border-radius;
    border: 1.5px solid transparent;

    input {
      flex: 1;
      height: 100%;
      padding-right: 40px;
      color: $black;
      font-size: 1.6rem;
      caret-color: $primary;
      background-color: transparent;
      font-family: $font-family;
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
    color: rgba(22, 24, 35, 0.5);
  }

  .clear-btn,
  .loading {
    position: absolute;
    right: calc(#{$search-button-width} + 16px);
    top: 50%;
    transform: translateY(-50%);
    color: rgba(22, 24, 35, 0.34);
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
    padding: pxToRem(10px);
    color: rgba(22, 24, 35, 0.34);

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
