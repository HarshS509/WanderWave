"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import useAuthData from "../_hooks/useAuthData";

const AuthRedirect = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { token, loading } = useAuthData();
  const redirectedRef = useRef(false);

  useEffect(() => {
    // Only perform redirects when loading is complete
    if (!loading) {
      // If user is authenticated and trying to access auth pages
      if (token && (pathname === "/signin" || pathname === "/signup")) {
        if (!redirectedRef.current) {
          redirectedRef.current = true;
          router.replace("/");
        }
      } else {
        // Reset the redirect flag when not redirecting
        redirectedRef.current = false;
      }
    }
  }, [token, pathname, router, loading]);

  return <>{children}</>;
};

export default AuthRedirect;
