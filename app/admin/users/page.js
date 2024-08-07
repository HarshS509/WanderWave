import AdminUsersClient from "@/app/_components/AdminUsersClient";
import axiosInstance from "@/app/_utils/axiosInstance";
import { cookies } from "next/headers";

async function getUsers() {
  try {
    const cookieStore = cookies();
    const cookieString = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const response = await axiosInstance.get("/api/user", {
      headers: {
        Cookie: cookieString, // Note the capital "C" in Cookie
      },
    });
    console.log("res is ", response.data.users);
    return response?.data?.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
}

const Page = async () => {
  const users = await getUsers();
  // const response = await axiosInstance.get("/api/user");
  // console.log(users);
  return (
    <div className="w-full p-3 px-5 sm:p-12">
      <h1 className="absolute left-16 top-3 text-2xl font-bold text-light-title dark:text-dark-title sm:static">
        Users1
      </h1>
      <AdminUsersClient initialUsers={users} />
    </div>
  );
};
export default Page;
