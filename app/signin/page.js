import Link from "next/link";
import SigninForm from "../_components/signinForm";
import ThemeButton from "../_components/ThemeButton";

function Page() {
  return (
    <div className="flex-grow cursor-default bg-white py-4 dark:bg-dark-card">
      <div className="m-4 mb-4 flex justify-center">
        <div className="flex w-full items-center justify-center">
          <h2 className="w-2/4 pl-2 text-center text-lg font-bold text-black dark:text-dark-primary sm:text-xl md:w-3/4 md:pl-48">
            Sign in to WanderWave
          </h2>
          <div className="flex items-center justify-end px-4 sm:px-20">
            <ThemeButton />
          </div>
        </div>
      </div>
      <div className="m-2 mt-8 flex flex-col items-center justify-center gap-2">
        <SigninForm />
        <div className="mt-2 flex w-5/6 flex-col items-center justify-center gap-4 text-center text-sm font-normal dark:text-dark-primary sm:text-base">
          <p>
            Don&apos;t have an account?
            <Link
              href={"/signup"}
              className="text-blue-600 hover:text-blue-500"
            >
              {" "}
              Sign up now
            </Link>
          </p>

          {/* <span>OR</span> */}
        </div>

        {/* <button
          className="flex w-full items-center justify-center space-x-2 rounded-lg border-2 border-b-4 border-gray-300 p-3 text-center hover:bg-gray-50 dark:border-gray-700 dark:text-dark-primary dark:hover:bg-gray-700 md:w-3/4 lg:w-2/5"
          onClick={handleGoogleLogin}
        >
          <img className="h-4 w-6 pl-1 sm:h-5 sm:w-10" src={AddGoogleIcon} />
          <span className="text-sm sm:text-base">Continue with Google</span>
        </button> */}

        {/* <Link
          to={'/github-auth'}
          className="flex w-full items-center justify-center space-x-2 rounded-lg border-2 border-b-4 border-gray-300 p-3 text-center hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 md:w-3/4 lg:w-2/5"
        >
          <img className="h-4 w-6 sm:h-5 sm:w-10" src={AddGithubIcon} />
          <span className="text-sm dark:text-dark-primary sm:text-base">Continue with Github</span>
        </Link>  */}
      </div>
    </div>
  );
}

export default Page;
