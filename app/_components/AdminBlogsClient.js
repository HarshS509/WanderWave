"use client";
import PenIcon from "@/public/PenIcon";
import TrasnIcon from "@/public/Trashicon";
import { formatPostTime } from "../_utils/helpers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import axiosInstance from "../_utils/axiosInstance";

function AdminBlogsClient({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  if (initialPosts === null) {
    toast.error("Something went wrong! Please try again!");
    return null;
  }
  const handleDeletePost = async (postId) => {
    try {
      const response = await axiosInstance.delete("/api/posts/" + postId);
      if (response.status === 200) {
        const updatedPosts = posts.filter((p) => p._id !== postId);
        setPosts(updatedPosts);
        toast.success("Post deleted successfully!");
      } else {
        toast.error("Failed to delete post. Please try again later.");
      }
    } catch (e) {
      toast.error("Something went wrong! Please try again later.");
    }
  };
  return (
    <>
      <div className="w-full p-3 px-5 sm:p-12">
        <h1 className="absolute left-16 top-3 text-2xl font-bold text-light-title dark:text-dark-title  sm:static">
          Blogs
        </h1>
        <div className="mt-2 flex flex-col sm:mt-12">
          {posts?.map((post) => {
            return (
              <div
                key={post?._id}
                className="mb-3 flex flex-row items-center justify-between gap-2 rounded-lg bg-light px-3 py-3 shadow-md dark:bg-dark-card sm:gap-5"
              >
                <img
                  src={post?.imageLink}
                  className=" h-16 w-16 rounded-xl object-cover shadow-lg sm:h-24 sm:w-24"
                  alt=""
                />
                <div className="flex w-12 flex-1 grow flex-col justify-between gap-2">
                  <h4 className="w-full truncate text-base font-semibold text-light-title dark:text-dark-title sm:text-xl">
                    {post?.title}
                  </h4>
                  <p className="hidden w-full truncate text-sm text-light-description dark:text-dark-description sm:inline">
                    {post?.description}
                  </p>
                  <p className="text-sm font-semibold text-[#6941C6] dark:text-dark-secondary">
                    {post?.authorName} • {formatPostTime(post?.timeOfPost)}
                  </p>
                </div>
                <div className="mt-2 flex flex-col gap-2 sm:mt-0 sm:flex-row ">
                  <button className="h-fit rounded-xl border-0 text-base font-semibold text-light-title dark:text-dark-title sm:text-xl">
                    <PenIcon />
                  </button>
                  <button
                    onClick={() => handleDeletePost(post?._id)}
                    className="h-fit rounded-xl border-0 text-base font-semibold text-light-title dark:text-dark-title sm:text-xl "
                  >
                    <TrasnIcon />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AdminBlogsClient;
