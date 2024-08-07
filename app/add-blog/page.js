import { Suspense } from "react";
import Skeleton from "../_skeletons/skeleton";
import AddBlogForm from "../_components/addBlogForm";
import BackIcon from "../_components/BackIcon";

function Page() {
  return (
    <div className="flex-grow cursor-default bg-slate-50 px-6 py-8 dark:bg-dark-card">
      <div className="mb-4 flex justify-center">
        <div className="flex w-[32rem] items-center justify-start space-x-4 sm:w-5/6 lg:w-4/6 ">
          <div className="w-fit cursor-pointer">
            <BackIcon />
          </div>
          <h2 className="cursor-text text-lg font-semibold text-light-primary dark:text-dark-primary sm:text-xl lg:text-2xl">
            Create Blog
          </h2>
        </div>
      </div>
      <div className="flex justify-center">
        <Suspense fallback={<Skeleton />}>
          <AddBlogForm />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
