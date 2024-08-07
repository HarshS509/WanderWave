import Link from "next/link";
import { createSlug, formatPostTime } from "../_utils/helpers";
import CategoryPill from "./category-pill";

export default function PostCard({ post, testId = "postcard" }) {
  const slug = createSlug(post.title);
  return (
    <div
      className={"active:scale-click group w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"}
      data-testid={testId}
    >
      <div
        className={
          "mb-4 cursor-pointer rounded-lg bg-light shadow-md dark:bg-dark-card sm:mr-8 sm:mt-4"
        }
      >
        <Link href={`/details-page/${slug}/${post._id}`}>
          <div className="h-48 w-full overflow-hidden">
            <img
              src={post.imageLink}
              alt={post.title}
              className={
                "sm:group-hover:scale-hover h-full w-full rounded-t-lg object-cover transition-transform ease-in-out"
              }
            />
          </div>
          <div className="p-3">
            <div className="mb-1 text-xs text-light-info dark:text-dark-info">
              {post.authorName} • {formatPostTime(post.timeOfPost)}
            </div>
            <h2 className="mb-2 line-clamp-1 text-base font-semibold text-light-title dark:text-dark-title">
              {post.title}
            </h2>
            <p className="line-clamp-2 text-sm text-light-description dark:text-dark-description">
              {post.description}
            </p>
            <div className="mt-4 flex gap-2">
              {post.categories.slice(0, 3).map((category, index) => (
                <CategoryPill
                  key={`${category}-${index}`}
                  category={category}
                />
              ))}
            </div>
          </div>
        </Link>{" "}
      </div>
    </div>
  );
}
