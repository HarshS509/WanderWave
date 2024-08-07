"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Sun from "@/app/_assets/svg/sun.svg";
import Moon from "@/app/_assets/svg/moon.svg";

function ThemeButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isDarkTheme = theme === "dark";

  return (
    <div>
      <button
        name="theme"
        className={`${
          isDarkTheme ? "bg-dark-theme-background" : "bg-light-theme-background"
        } flex h-8 w-16 cursor-pointer items-center justify-start rounded-full px-1 py-1`}
        onClick={toggleTheme}
      >
        <div
          className={`${
            isDarkTheme
              ? "translate-x-8 bg-dark-theme-foreground"
              : "translate-x-0 bg-light-theme-foreground"
          } h-6 w-6 rounded-full bg-black px-1 py-1 duration-300`}
        >
          <Image
            src={isDarkTheme ? Moon : Sun}
            alt="theme-toggler"
            width={16}
            height={16}
          />
        </div>
      </button>
    </div>
  );
}

export default ThemeButton;
