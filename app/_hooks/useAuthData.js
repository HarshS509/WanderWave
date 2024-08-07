import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import userState from "../_utils/user-state";
import axiosInstance from "../_utils/axiosInstance";

const useAuthData = () => {
  const location = usePathname();
  const user = userState.getUser();

  const [data, setData] = useState({
    _id: user?._id || "",
    role: user?.role || "",
    token: "",
    loading: true,
  });

  useEffect(() => {
    setData({
      ...data,
      token: "",
    });
  }, [user?._id]);

  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await axiosInstance.get(`/api/auth/check/${data._id}`);
        setData({
          ...data,
          token: res.data?.data,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching token:", error);
        setData({
          ...data,
          token: "",
          loading: false,
        });
      }
    }
    fetchToken();
  }, [location]);

  return data;
};

export default useAuthData;
