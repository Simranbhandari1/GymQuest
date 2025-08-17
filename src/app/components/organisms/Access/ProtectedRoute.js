"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = localStorage.getItem("user");

    // Allow access only to "/" or if user exists
    if (!user && pathname !== "/") {
      router.push("/Login"); // redirect to login
    }
  }, [pathname, router]); // ✅ include router here

  return children;
}
