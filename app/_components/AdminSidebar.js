"use client";

import { useRouter } from "next/navigation";
import BarIcons from "./BarIcons";
import CloseIcon from "./CloseIcon";
import UserIcon from "./UserIcon";
import BlogIcon from "./BlogIcon";
import Link from "next/link";
import { useState } from "react";

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const router = useRouter();
  const NavLink = ({ href, children }) => {
    const isActive = router.pathname === href;
    return (
      <Link
        href={href}
        className={`flex items-center gap-3 rounded-xl bg-light px-3 py-[10px] text-sm font-medium text-light-title dark:bg-dark dark:text-dark-title ${
          isActive
            ? "!dark:text-dark-title !bg-black !text-dark-title dark:!bg-dark-card"
            : ""
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <>
      <button
        className=" p-4  text-light-title dark:text-dark-title sm:hidden "
        onClick={() => {
          setIsSidebarOpen(!isSidebarOpen);
        }}
      >
        <BarIcons />
      </button>
      <div
        className={`absolute z-10 h-full w-64 origin-left rounded-b-xl rounded-r-xl border border-[#D9D9D9] bg-light transition-transform dark:border-gray-700 dark:bg-dark ${
          isSidebarOpen ? "scale-x-100" : "scale-x-0"
        } sm:relative sm:h-auto sm:scale-x-100`}
      >
        <button
          className=" p-4  text-light-title dark:text-dark-title sm:hidden "
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        >
          <CloseIcon />
        </button>
        <div className="border-b border-[#D9D9D9] bg-light  px-6 py-3 dark:border-gray-700 dark:bg-dark sm:p-6 ">
          <h1
            onClick={() => router.push("/")}
            className="cursor-pointer text-xl font-medium text-light-title dark:text-dark-title"
          >
            WanderWave
          </h1>
        </div>
        <div className="flex flex-col gap-2 p-6">
          <NavLink href="/admin/users">
            <UserIcon /> Users
          </NavLink>
          <NavLink href="/admin/blogs">
            <BlogIcon /> Blogs
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
