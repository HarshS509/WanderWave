"use client";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
function BackIcon() {
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  return (
    <>
      <ArrowLeftIcon
        onClick={() => router.back()}
        className={`h-5 w-10 ${
          resolvedTheme === "dark" ? "text-white" : "text-black"
        }`}
      />
    </>
  );
}

export default BackIcon;
