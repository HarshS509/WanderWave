"use client";
import { createSlug, formatPostTime } from "../_utils/helpers";
import CategoryPill from "./category-pill";
import Link from "next/link";

export default function FeaturedPostCard({
  post,
  testId = "featuredPostCard",
}) {
  const slug = createSlug(post.title);

  return (
    <Link
      href={`/details-page/${slug}/${post._id}`}
      className={`active:scale-click group flex h-auto cursor-pointer flex-col gap-2 rounded-lg border bg-slate-50 dark:border-none dark:bg-dark-card sm:h-48 sm:flex-row`}
      data-testid={testId}
    >
      <div className="w-full overflow-hidden sm:w-1/3">
        <img
          src={post.imageLink}
          alt={post.title}
          className={`sm:group-hover:scale-hover h-48 w-full rounded-lg object-cover shadow-lg transition-transform ease-in-out sm:h-full`}
        />
      </div>
      <div className="flex h-full w-full flex-col gap-2 p-3 sm:w-2/3">
        <div className="line-clamp-1 text-base font-semibold text-light-title dark:text-dark-title">
          {post.title}
        </div>
        <div className="flex flex-wrap gap-2">
          {post.categories.map((category, index) => (
            <CategoryPill key={`${category}-${index}`} category={category} />
          ))}
        </div>
        <div className="line-clamp-2 sm:line-clamp-3">
          <p className="overflow-ellipsis text-light-description dark:text-dark-description">
            {post.description}
          </p>
        </div>
        <div className="flex flex-1 items-end text-xs text-light-info dark:text-dark-info">
          {post.authorName} • {formatPostTime(post.timeOfPost)}
        </div>
      </div>
    </Link>
  );
}
