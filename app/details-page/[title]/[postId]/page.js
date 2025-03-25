import ArrowRight from "@/app/_components/arrowRight";
import CategoryPill from "@/app/_components/category-pill";
import PostCard from "@/app/_components/PostCard";
import PostMobileViewComponent from "@/app/_components/PostMobileViewComponent";
import { getPostById, getRelatedPosts } from "@/app/_lib/data-service";
import { PostCardSkeleton } from "@/app/_skeletons/PostCardSkeleton";
import { PostMobileViewCardSkeleton } from "@/app/_skeletons/PostMobileViewCardSkeleton";
import { formatPostTime } from "@/app/_utils/helpers";
import Link from "next/link";
import { Suspense } from "react";

async function Page({ params }) {
  const { postId } = params;
  const post = await getPostById(postId);
  const relatedCategoryPosts = await getRelatedPosts(post.categories);

  return (
    <div className="flex-grow bg-light dark:bg-dark">
      <div className="relative flex flex-col">
        <img
          src={post.imageLink}
          alt={post.title}
          className="h-80 w-full object-cover sm:h-96"
        />
        <div className="absolute left-0 top-0 h-full w-full bg-slate-950/60"></div>
        <div className="absolute top-12 w-full cursor-pointer justify-start px-2 text-lg text-slate-50 sm:top-20 sm:px-8 sm:text-xl lg:px-12 lg:text-2xl">
          <Link href={"/"}>
            <img
              alt="white"
              src={"/navigate-back-white.svg"}
              className="active:scale-click h-5 w-10"
            />
          </Link>
        </div>
        <div className="absolute bottom-6 w-full max-w-xl px-4 text-slate-50 sm:bottom-8 sm:max-w-3xl sm:px-8 lg:bottom-12 lg:max-w-5xl lg:px-12">
          <div className="mb-4 flex space-x-2">
            {post.categories.map((category, id) => (
              <CategoryPill key={id} category={category} />
            ))}
          </div>
          <h1 className="mb-4 text-xl font-semibold sm:text-2xl lg:text-3xl">
            {post.title}
          </h1>
          <p className="text-xs font-semibold text-dark-secondary sm:text-sm">
            {post.authorName}
          </p>
          <p className="text-xs text-dark-secondary/80 sm:text-sm">
            {formatPostTime(post.timeOfPost)}
          </p>
        </div>
      </div>
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-y-4 px-4 py-10">
        <div>
          <p className="leading-7 text-light-secondary dark:text-dark-secondary sm:text-lg">
            {post.description}
          </p>
        </div>
      </div>
      <div className="container mx-auto flex flex-col space-y-2 px-4 py-6 dark:text-white">
        <div className="flex justify-between text-2xl font-semibold ">
          <div>Related Blogs</div>
          <div className="flex cursor-pointer items-center text-sm text-gray-400 hover:underline sm:mr-10">
            <Link href="/">
              <div>see more blogs</div>
            </Link>
            <ArrowRight />
          </div>
        </div>
        <div className="block space-y-4 sm:hidden">
          <Suspense
            fallback={
              <>
                {Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <PostMobileViewCardSkeleton key={index} />
                  ))}
              </>
            }
          >
            {relatedCategoryPosts.slice(0, 3).map((post) => (
              <PostMobileViewComponent key={post._id} post={post} />
            ))}
          </Suspense>
        </div>
        <div className="hidden sm:flex sm:flex-wrap sm:p-3">
          <Suspense
            fallback={
              <>
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <PostCardSkeleton key={index} />
                  ))}
              </>
            }
          >
            {relatedCategoryPosts.slice(0, 4).map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Page;
