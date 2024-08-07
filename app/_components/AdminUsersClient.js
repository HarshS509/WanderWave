"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../_utils/axiosInstance";

const Role = {
  Admin: "ADMIN",
  User: "USER",
};
function AdminUsersClient({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  if (initialUsers === null) {
    toast.error("Something went wrong! Please try again!101");
    return null;
  }
  const handleClick = async (userId, newRole) => {
    try {
      const response = await axiosInstance.patch("/api/user/" + userId, {
        role: newRole,
      });
      if (response.status === 200) {
        toast.success("Role updated successfully!");
        const updatedUsers = users.map((u) =>
          u._id === userId ? { ...u, role: newRole } : u
        );
        setUsers(updatedUsers);
      } else {
        toast.error("Failed to update role. Please try again later.");
      }
    } catch (e) {
      toast.error("Something went wrong! Please try again later.");
    }
  };

  return (
    <div className="mt-2 sm:mt-12">
      {users?.map((user) => (
        <div
          key={user?._id}
          className="mb-3 flex w-full flex-row items-center justify-between gap-5 rounded-lg border-b border-gray-300 bg-light px-3 py-4 shadow-md dark:border-gray-700 dark:bg-dark-card"
        >
          <div className="flex flex-col gap-[10px]">
            <p className="text-base font-medium text-light-title dark:text-dark-title">
              {user?.fullName}
            </p>
            <p className="text-base font-medium text-light-description dark:text-dark-description">
              {user?.email}
            </p>
          </div>
          {user.role === Role.Admin && (
            <button
              onClick={() => handleClick(user._id, Role.User)}
              className="h-fit rounded-xl border border-black bg-black px-4 py-2 text-sm font-semibold text-white"
            >
              Admin
            </button>
          )}
          {user.role === Role.User && (
            <button
              onClick={() => handleClick(user._id, Role.Admin)}
              className="h-fit rounded-xl border border-black bg-transparent px-4 py-2 text-sm font-semibold text-black dark:text-white"
            >
              User
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminUsersClient;
