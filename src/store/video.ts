import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useVideoPlayerStore = defineStore('video', () => {
  const currentVideoId = ref('');
  const playing = ref(false);
  const currentTime = ref(0);
  const volume = ref(0);

  const togglePlayOrPause = (type?: 'play' | 'pause') => {
    if (type === 'play') {
      playing.value = true;
    } else if (type === 'pause') {
      playing.value = false;
    } else {
      playing.value = !playing.value;
    }
  };

  const toggleMuted = () => {
    volume.value = volume.value === 0 ? 50 : 0;
  };

  const setVolume = (value: number) => {
    volume.value = value;
  };

  const setCurrentTime = (time: number) => {
    currentTime.value = time;
  };

  const setCurrentVideoId = (id: string) => {
    currentVideoId.value = id;
  };

  const muted = computed(() => volume.value === 0);

  return {
    volume,
    muted,
    playing,
    currentTime,
    currentVideoId,

    toggleMuted,
    togglePlayOrPause,
    setVolume,
    setCurrentTime,
    setCurrentVideoId,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVideoPlayerStore, import.meta.hot));
}
