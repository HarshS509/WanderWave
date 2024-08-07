import axiosInstance from "../_utils/axiosInstance";
import PostCard from "./PostCard";

async function getPosts() {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await axiosInstance.get("/api/posts");
  return response.data;
}
export default async function PostList() {
  const posts = await getPosts();

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </>
  );
}
