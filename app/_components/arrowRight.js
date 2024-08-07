"use client";

import { useTheme } from "next-themes";

function ArrowRight() {
  const { resolvedTheme } = useTheme();

  return (
    <img
      alt="arrow-right"
      src={
        resolvedTheme === "dark"
          ? "/arrow-right-white.svg"
          : "/arrow-right-black.svg"
      }
      className="active:scale-click h-8 w-8"
    />
  );
}

export default ArrowRight;
