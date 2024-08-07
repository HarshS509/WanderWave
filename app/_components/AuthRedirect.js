"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthData from "../_hooks/useAuthData";

const AuthRedirect = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { token, loading } = useAuthData();

  useEffect(() => {
    if (token && !loading) {
      if (pathname === "/signin" || pathname === "/signup") {
        router.replace("/");
      }
    }
  }, [token, pathname, router, loading]);

  return <>{children}</>;
};

export default AuthRedirect;
