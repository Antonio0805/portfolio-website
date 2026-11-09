const YOUTUBE_ID =
  /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{6,})/i;

export const isYouTubeUrl = (url) =>
  /(?:youtube\.com|youtu\.be)/i.test(url || "");

// The still YouTube already serves for a demo video, used where a project has
// no preview image of its own.
export function youTubeThumb(url) {
  const match = YOUTUBE_ID.exec(url || "");
  return match ? `https://i.ytimg.com/vi/${match[1]}/hqdefault.jpg` : null;
}

export function projectImage(project) {
  return (
    project.previewImage ||
    project.showcaseImages?.[0] ||
    youTubeThumb(project.demo)
  );
}

export function projectId(project) {
  return project.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, "");
}

const PREVIEWS = {
  "/Harta.png": "ev-charge",
  "/tribunal.jpg": "tribunal",
  "/recruit.png": "recruit",
  "/oop.png": "oop",
  "/upb-campus.jpg": "upb-campus",
  "/upb-rectorate.jpg": "upb-rectorate",
};

export function imageSources(src) {
  const name = PREVIEWS[src];
  if (!name) return { src };
  return {
    src: `/previews/${name}-1200.webp`,
    srcSet: `/previews/${name}-640.webp 640w, /previews/${name}-1200.webp 1200w`,
  };
}
