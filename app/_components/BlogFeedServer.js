// app/components/BlogFeedServer.js
import axios from "axios";

async function getFeaturedPosts() {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_PATH + "/api/posts/featured"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
}

async function getLatestPosts() {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_PATH + "/api/posts/latest"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    return [];
  }
}

export default async function BlogFeedServer() {
  const featuredPosts = await getFeaturedPosts();
  const latestPosts = await getLatestPosts();

  return { featuredPosts, latestPosts };
}
