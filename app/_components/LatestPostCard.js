"use client";
import Link from "next/link";
import { createSlug, formatPostTime } from "../_utils/helpers";
import CategoryPill from "./category-pill";

export default function LatestPostCard({ post, testId = "latestpostcards" }) {
  const slug = createSlug(post.title);
  return (
    <Link
      href={`/details-page/${slug}/${post._id}`}
      className={`active:scale-click cursor-pointer rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-none dark:bg-dark-card`}
      data-testid={testId}
    >
      <div className="flex">
        <div className="mb-2 flex flex-1 flex-wrap gap-2">
          {post.categories.map((category, index) => (
            <CategoryPill key={`${category}-${index}`} category={category} />
          ))}
        </div>
        <img
          src={"/link.svg"}
          alt={post.title}
          className="h-4 w-4 dark:invert"
        />
      </div>
      <div className="mb-2 line-clamp-1 font-semibold text-light-title dark:text-dark-title">
        {post.title}
      </div>
      <div className="text-xs text-light-info dark:text-dark-info">
        {post.authorName} • {formatPostTime(post.timeOfPost)}
      </div>
    </Link>
  );
}
