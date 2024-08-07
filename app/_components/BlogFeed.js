// app/blog-feed.js

import BlogFeedClient from "./BlogFeedClient";
import BlogFeedServer from "./BlogFeedServer";

export default async function BlogFeed() {
  const { featuredPosts, latestPosts } = await BlogFeedServer();

  return (
    <BlogFeedClient
      initialFeaturedPosts={featuredPosts}
      initialLatestPosts={latestPosts}
    />
  );
}
