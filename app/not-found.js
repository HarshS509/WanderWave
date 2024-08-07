import Link from "next/link";
import ThemeButton from "./_components/ThemeButton";
import ParticleComps from "./_components/ParticleComps.js";

export default function NotFound() {
  return (
    <div>
      <div className="relative -mt-2 ">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col bg-white px-4 py-8 text-black dark:bg-dark  dark:text-slate-50 sm:px-16">
          <div className="flex w-full justify-between">
            <div className="flex cursor-text items-center justify-between text-2xl font-semibold">
              WanderWave
            </div>
            <div className="flex justify-between">
              <div className="flex items-center justify-end px-2 py-2 sm:px-20">
                <ThemeButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text:black -mt-12 flex h-screen w-full flex-col items-center justify-center bg-white dark:bg-dark dark:text-dark ">
        <div className=" flex flex-col items-center justify-center bg-white text-black first-letter:text-center dark:bg-dark dark:text-white">
          <h1 className="py-4 text-9xl">404</h1>
          <h2 className="py-4 text-3xl">Page Not Found!</h2>
          <Link href={"/"}>
            <button
              className="mt-3 rounded-lg border-2 border-solid border-sky-500 px-8 py-4
          hover:bg-slate-500/25 active:bg-slate-500/25"
            >
              Go To Home
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full">
        <ParticleComps />
      </div>
    </div>
  );
}
