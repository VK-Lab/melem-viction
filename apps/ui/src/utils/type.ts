export const isVideo = (rawUrl?: string): boolean => {
  if (!rawUrl) {
    return false;
  }
  const videos = ['mp4', '3gp', 'ogg'];
  const url = new URL(rawUrl);
  const extension = url.pathname.split('.')[1];

  return videos.includes(extension);
};
