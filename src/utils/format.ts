export const formatDuration = (seconds: number) => {
  return new Date(1000 * seconds || 0).toISOString().slice(14, 19);
};
