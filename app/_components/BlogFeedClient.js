"use client";

import { useState } from "react";
import axios from "axios";

import FeaturedPostCard from "./FeaturedPostCard";
import LatestPostCard from "./LatestPostCard";
import { FeaturedPostCardSkeleton } from "../_skeletons/FeaturedPostCard";
import { LatestPostCardSkeleton } from "../_skeletons/LatestPostCard";
import CategoryPill from "./category-pill";
import { categories } from "../_utils/category-colors";

export default function BlogFeedClient({
  initialFeaturedPosts,
  initialLatestPosts,
}) {
  const [selectedCategory, setSelectedCategory] = useState("featured");
  const [posts, setPosts] = useState(initialFeaturedPosts);
  const [latestPosts, setLatestPosts] = useState(initialLatestPosts);
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    setLoading(true);
    try {
      const endpoint =
        category === "featured"
          ? "/api/posts/featured"
          : `/api/posts/categories/${category}`;
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_PATH + endpoint
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto my-6">
      <div className="-mx-4 flex flex-wrap">
        <div className="w-full p-4 sm:w-2/3">
          <div className="-mb-1 cursor-text text-base tracking-wide text-slate-500 dark:text-dark-tertiary">
            What&apos;s hot?
          </div>
          <h1 className="mb-2 cursor-text text-xl font-semibold dark:text-dark-primary">
            {selectedCategory === "featured"
              ? "Featured Posts"
              : `Posts related to "${selectedCategory}"`}
          </h1>
          <div className="flex flex-col gap-6">
            {loading
              ? Array(5)
                  .fill(0)
                  .map((_, index) => <FeaturedPostCardSkeleton key={index} />)
              : posts
                  .slice(0, 5)
                  .map((post, index) => (
                    <FeaturedPostCard key={index} post={post} />
                  ))}
          </div>
        </div>
        <div className="w-full p-4 sm:w-1/3">
          <div className="mb-6">
            <div className="-mb-1 cursor-text text-base tracking-wide text-light-tertiary dark:text-dark-tertiary">
              Discover by topic
            </div>
            <h2 className="mb-2 cursor-text text-xl font-semibold dark:text-dark-primary">
              Categories
            </h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  name="category"
                  key={category}
                  aria-label={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                >
                  <CategoryPill
                    category={category}
                    selected={selectedCategory === category}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="-mb-1 cursor-text text-base tracking-wide text-slate-500 dark:text-dark-tertiary">
              What&apos;s new?
            </div>
            <h2 className="mb-2 cursor-text text-xl font-semibold dark:text-dark-primary">
              Latest Posts
            </h2>
            <div className="flex flex-col gap-4">
              {latestPosts.length === 0
                ? Array(5)
                    .fill(0)
                    .map((_, index) => <LatestPostCardSkeleton key={index} />)
                : latestPosts
                    .slice(0, 5)
                    .map((post, index) => (
                      <LatestPostCard key={index} post={post} />
                    ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
