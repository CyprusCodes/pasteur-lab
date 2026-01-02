export const getImagePath = (path: string) => {
  const base = import.meta.env.VITE_S3_BUCKET_ASSET_URL.replace(/\/$/, "");
  console.log(import.meta.env.VITE_S3_BUCKET_ASSET_URL);
  console.log("Base URL:", base);
  const cleanPath = path.replace(/^\//, "");
  return `${base}/${cleanPath}`;
};
