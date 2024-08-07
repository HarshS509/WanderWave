import axiosInstance from "../_utils/axiosInstance";

export async function getPostById(postId) {
  const res = await axiosInstance.get(`/api/posts/${postId}`);
  const { data } = res;
  return data;
}

export async function getRelatedPosts(categories) {
  const res = await axiosInstance.get(`/api/posts/related-posts-by-category`, {
    params: { categories },
  });
  const { data } = res;
  return data;
}
