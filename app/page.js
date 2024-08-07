import { Suspense } from "react";
import BlogFeed from "./_components/BlogFeed";
import Header from "./_components/header";
import { PostCardSkeleton } from "./_skeletons/PostCardSkeleton";
import PostList from "./_components/PostList";

export default function Home() {
  return (
    <div className="w-full cursor-default bg-light dark:bg-dark">
      <Header />
      <div className="mx-4 sm:mx-8 lg:mx-16">
        <BlogFeed />
        <h1 className="cursor-text pb-4 text-xl font-semibold dark:text-dark-primary sm:pb-0">
          All Posts
        </h1>
        <div className="flex flex-wrap">
          <Suspense
            fallback={
              <>
                {Array(8)
                  .fill(0)
                  .map((_, index) => (
                    <PostCardSkeleton key={index} />
                  ))}
              </>
            }
          >
            <PostList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
