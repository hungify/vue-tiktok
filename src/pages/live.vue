<script setup lang="ts"></script>

<template>
  <div class="live-wrapper">
    <div class="live-skeleton">
      <p class="live-views-count loading-skeleton"></p>
      <div class="live-info">
        <div class="live-tag">LIVE</div>
        <p class="live-nickname loading-skeleton"></p>
        <p class="live-desc loading-skeleton"></p>
      </div>
      <div class="live-content loading-skeleton">
        <h2>LIVE</h2>
      </div>
      <div class="live-reaction loading-skeleton">
        <IconBase name="heart" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.live-wrapper {
  height: calc(100vh - 6rem);
  padding: 2.4rem;
  scroll-margin-top: 6rem;
}

.live-skeleton {
  background-color: #f1f1f1;
  border-radius: 0.8rem;
  height: 100%;
  max-height: 800px;
  position: relative;
}

.live-views-count {
  height: 25px;
  position: absolute;
  right: 40px;
  top: 25px;
  width: 50px;
}

.live-info {
  bottom: 0;
  left: 0;
  padding: 24px;
  position: absolute;
  .live-tag {
    background-color: rgba($text, 0.2);
    border-radius: 4px;
    color: $white;
    display: inline-block;
    font-weight: 700;
    padding: 0 4px;
  }
  .live-nickname {
    margin: 10px 0;
    width: 180px;
  }
  .live-desc {
    width: 350px;
  }
}

.live-reaction {
  bottom: 64px;
  height: 350px;
  opacity: 0.5;
  position: absolute;
  right: 8px;
}

.live-content {
  opacity: 0.5;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  height: 420px !important;
  border-radius: 10px !important;
  display: grid;
  place-items: center;

  h2 {
    font-size: 50px;
  }
}

.loading-skeleton {
  animation: LiveLoading_loading-animate__EZ1B2 1.5s linear infinite;
  background-color: rgba($text, 0.06);
  background-image: linear-gradient(90deg, rgba($text, 0), rgba($text, 0.08) 50%, rgba($text, 0));
  background-repeat: no-repeat;
  background-size: 200% 100%;
  border-radius: 100px;
  height: 20px;
}
</style>
