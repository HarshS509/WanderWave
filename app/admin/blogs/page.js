import AdminBlogsClient from "@/app/_components/AdminBlogsClient";
import axiosInstance from "@/app/_utils/axiosInstance";

async function getPosts() {
  try {
    const response = await axiosInstance.get("/api/posts");
    return response?.data;
  } catch (error) {
    return null;
  }
}

export default async function AdminBlogs() {
  const initialPosts = await getPosts();

  return <AdminBlogsClient initialPosts={initialPosts} />;
}
