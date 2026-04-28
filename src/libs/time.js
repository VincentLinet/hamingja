export const format = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;

  if (minutes > 0) return `${minutes}m ${rest}s`;
  return `${rest}s`;
};

export const sleep = (ms = 300) => new Promise((r) => setTimeout(r, ms));
