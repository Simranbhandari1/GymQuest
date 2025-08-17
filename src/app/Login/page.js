// app/Login/page.jsx
"use client";

import React, { Suspense } from "react";
import LoginForm from "./LoginForm"; // import the CSR component
import { useAuth } from "@/app/api/auth/AuthContext";
import LiquidChrome from "../components/organisms/LiquidChrome";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <main className="relative bg-gradient-to-b mt-12 from-black via-[#0f3e3b] to-black flex items-center justify-center min-h-screen">
      <div className="absolute inset-0 z-0">
        <LiquidChrome baseColor={[0.1, 0.1, 0.1]} speed={1} amplitude={0.6} interactive />
      </div>

      <div className="absolute inset-0 bg-gradient-to-l from-black via-[#1e4d4a] to-black opacity-80 z-0" />

      <div className="relative z-10 w-full max-w-5xl px-4">
        <div className="flex w-full rounded-xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-xl bg-white/10">
          <Suspense fallback={<p className="text-white">Loading login...</p>}>
            <LoginForm login={login} />
          </Suspense>

          {/* Right-side Lottie animation */}
          <div className="hidden md:flex w-1/2 items-center justify-center bg-transparent">
            <div className="w-[300px] h-[300px]">
              <DotLottieReact
                src="https://lottie.host/9cc135f0-dd0e-4ae0-a41e-0de34ca4c6d4/f9osQ3Wd0B.lottie"
                loop
                autoplay
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
