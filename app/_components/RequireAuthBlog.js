"use client";
import { useRouter } from "next/navigation";
import useAuthData from "../_hooks/useAuthData";
import { useEffect } from "react";

function RequireAuthBlog({ allowedRole, children }) {
  const { role, token, loading } = useAuthData();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!token || !allowedRole.includes(role))) {
      router.replace("/signin");
    }
  }, [token, role, loading, allowedRole, router]);

  if (loading) {
    // Optionally, return a loading indicator or null
    return <p>Loading...</p>;
  }

  if (token && allowedRole.includes(role)) {
    return <>{children}</>;
  }

  return null;
}

export default RequireAuthBlog;
