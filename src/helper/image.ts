export const getImageUrl = (path: string | null | undefined, size: string = "w500"): string => {
  if (!path) return "https://placehold.co/400x600";
  return `${import.meta.env.VITE_IMAGE_BASE_URL}${size}${path}`;
};
