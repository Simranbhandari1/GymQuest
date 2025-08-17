export function extractYouTubeID(url) {
  if (!url) return null;
  const reg = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/;
  const match = url.match(reg);
  return match ? match[1] : null;
}
