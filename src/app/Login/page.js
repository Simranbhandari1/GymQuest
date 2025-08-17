"use client";

import dynamic from "next/dynamic";

// Dynamically import LoginComponent so it's client-only
const LoginComponent = dynamic(() => import("./LoginComponent"), { ssr: false });

export default function LoginPage() {
  return <LoginComponent />;
}
