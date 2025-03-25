import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import userState from "../_utils/user-state";
import axiosInstance from "../_utils/axiosInstance";

const useAuthData = () => {
  const location = usePathname();
  const [data, setData] = useState({
    _id: "",
    role: "",
    token: "",
    loading: true,
  });

  // Initialize data from user state and handle logout state properly
  useEffect(() => {
    const user = userState.getUser();

    // Immediately update loading state if no user exists
    if (!user) {
      setData({
        _id: "",
        role: "",
        token: "",
        loading: false,
      });
      return;
    }

    // Otherwise, prepare to fetch token
    setData((prevData) => ({
      ...prevData,
      _id: user._id || "",
      role: user.role || "",
      loading: true,
    }));
  }, [location]);

  useEffect(() => {
    async function fetchToken() {
      if (!data._id) {
        return; // Already handled in the first useEffect
      }

      try {
        const res = await axiosInstance.get(`/api/auth/check/${data._id}`);
        setData((prevData) => ({
          ...prevData,
          token: res.data?.data,
          loading: false,
        }));
      } catch (error) {
        console.error("Error fetching token:", error.message);
        // If token check fails, clear user state to ensure consistent logout
        userState.removeUser();
        setData({
          _id: "",
          role: "",
          token: "",
          loading: false,
        });
      }
    }

    if (data._id && data.loading) {
      fetchToken();
    }
  }, [data._id, data.loading]);

  return data;
};

export default useAuthData;
