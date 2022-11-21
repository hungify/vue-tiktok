import { defineStore, acceptHMRUpdate } from 'pinia';

interface VideoState {
  playing: boolean;
  currentTime: number;
  muted: boolean;
  volume: number;
}

export const useVideo = defineStore('video', () => {
  const state: VideoState = {
    playing: false,
    currentTime: 0,
    muted: false,
    volume: 50,
  };

  const togglePlayingOrPause = (type: 'playing' | 'pause') => {
    state.playing = type === 'playing';
  };

  const setMuted = (muted: boolean) => {
    state.muted = muted;
  };

  const setVolume = (volume: number) => {
    state.volume = volume;
    if (volume === 0) {
      state.muted = true;
    } else {
      state.muted = false;
    }
  };

  const setCurrentTime = (currentTime: number) => {
    state.currentTime = currentTime;
  };

  return {
    ...state,
    togglePlayingOrPause,
    setMuted,
    setVolume,
    setCurrentTime,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVideo, import.meta.hot));
}
