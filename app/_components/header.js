"use client";
import LogInIcon from "@/app/_assets/svg/login-icon.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useAuthData from "../_hooks/useAuthData";
import Loader from "../_skeletons/Loader";
import axiosInstance from "../_utils/axiosInstance";
import userState from "../_utils/user-state";
import Hero from "./Hero";
import ThemeButton from "./ThemeButton";

function Header() {
  const { token, loading } = useAuthData();
  // console.log(token);
  const router = useRouter();
  const user = userState.getUser();
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
      userState.removeUser();
      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error.response?.data?.message || "An error occurred");
      toast.error("Signout failed");
    }
  };

  return (
    <div className="relative -mt-2 h-[460px] bg-[url('/wanderlustbg.webp')] bg-cover bg-fixed bg-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col px-8 py-8 text-slate-50 sm:px-16">
        <div className="flex w-full justify-between">
          <div className="flex cursor-text items-center justify-between gap-2 text-2xl font-semibold">
            <Link href={"/"}>
              <img src={"/svgviewer-png-output.png"} className="h-10 w-10" />
            </Link>
            <Link href={"/"} style={{ textDecoration: "none" }}>
              WanderWave
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-end px-4 sm:px-20">
              <ThemeButton />
            </div>
            <div>
              {loading ? (
                <Loader />
              ) : user ? (
                <div className="flex gap-2">
                  {user?.role === "admin" && (
                    <button
                      className="active:scale-click hidden rounded border border-slate-50 px-4 py-2 hover:bg-slate-500/25 md:inline-block"
                      onClick={() => {
                        router.push("/admin/blogs");
                      }}
                    >
                      Dashboard
                    </button>
                  )}

                  <button
                    className="active:scale-click hidden rounded border border-slate-50 px-4 py-2 hover:bg-slate-500/25 md:inline-block"
                    onClick={() => {
                      router.push("/add-blog");
                    }}
                  >
                    Create post
                  </button>
                  <button
                    className="active:scale-click hidden rounded border border-slate-50 px-4 py-2 hover:bg-slate-500/25 md:inline-block"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                  <button
                    className="px-2 py-2 hover:bg-slate-500/25 md:hidden"
                    onClick={() => {
                      router.push("/add-blog");
                    }}
                  >
                    <img
                      className="h-10 w-10"
                      src={"/add-icon-white.svg"}
                      alt="Add Icon"
                    />
                  </button>
                  <button
                    className="py-2 hover:bg-slate-500/25 md:hidden md:px-2"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    <img
                      className="h-9 w-9"
                      src={"/logout-icon.svg"}
                      alt="Logout Icon"
                    />
                  </button>
                </div>
              ) : (
                <div className="flex">
                  {" "}
                  <button
                    className="active:scale-click hidden rounded border border-slate-50 px-4 py-2 hover:bg-slate-500/25 md:inline-block"
                    onClick={() => {
                      router.push("/signin");
                    }}
                  >
                    Login
                  </button>
                  <button
                    className="py-2 hover:bg-slate-500/25 md:hidden md:px-2"
                    onClick={() => {
                      router.push("/signin");
                    }}
                  >
                    <img className="h-9 w-9" src={LogInIcon} alt="Login Icon" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <Hero />
      </div>
    </div>
  );
}

export default Header;
