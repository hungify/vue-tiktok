<script setup lang="ts"></script>

<template>
  <div class="tab-list">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.tab-list {
  display: flex;
  justify-content: var(--tab-list-align);
  flex-direction: var(--tab-list-orientation);
}
.tabs--enclosed {
  .tab-list {
    border: 1px solid;
    border-color: inherit;
  }
}

.tabs--line {
  .tab-list {
    border-bottom: 1px solid;
    border-color: inherit;
  }
}
</style>
