const YOUTUBE_ID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{6,})/i;

export const isYouTubeUrl = (url) => /(?:youtube\.com|youtu\.be)/i.test(url || "");

// The still YouTube already serves for a demo video, used where a project has
// no preview image of its own.
export function youTubeThumb(url) {
  const match = YOUTUBE_ID.exec(url || "");
  return match ? `https://i.ytimg.com/vi/${match[1]}/hqdefault.jpg` : null;
}

export function projectImage(project) {
  return project.previewImage || project.showcaseImages?.[0] || youTubeThumb(project.demo);
}
