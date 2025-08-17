// lib/cloudinary.js
export function getCloudinaryUrl(publicId, extension = "png", options = "") {
  const cloudName = "dl8dr4kef"; // your Cloudinary cloud name
  if (!publicId) return ""; // return empty string if no id
  return `https://res.cloudinary.com/${cloudName}/image/upload/${options}/${publicId}.${extension}`;
}
