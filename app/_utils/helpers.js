export function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}
export function formatPostTime(time) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(time).toLocaleDateString("en-US", options);
}
