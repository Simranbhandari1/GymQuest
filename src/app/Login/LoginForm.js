// app/Login/LoginForm.jsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

const ADMIN_EMAIL = "admin@gmail.com";

export default function LoginForm({ login }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({ email: "", password: "" });

  // Reset form on logout
  useEffect(() => {
    if (searchParams.get("logout") === "true") {
      setFormData({ email: "", password: "" });
      toast.success("👋 Logged out successfully");
    }
  }, [searchParams]);

  const validateEmail = useCallback(
    (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("❌ Email and password are required");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("❌ Invalid email format");
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "❌ Invalid credentials");
        return;
      }

      toast.success("✅ Login successful");

      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }

      login(data.user);

      if (data.user.email === ADMIN_EMAIL) {
        router.push("/Admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      toast.error("❌ Server error");
    }
  };

  // Google login script initialization
  useEffect(() => {
    if (typeof window === "undefined") return;

    const scriptId = "google-client-script-login";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.id = scriptId;
    script.onload = () => {
      if (window.google && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleGoogleCredentialResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-btn"),
          { theme: "outline", size: "large", width: "100%" }
        );
        window.google.accounts.id.prompt();
      }
    };
    document.body.appendChild(script);
  }, [handleGoogleCredentialResponse]);

  // Google login handler
  const handleGoogleCredentialResponse = useCallback(
    async (googleResponse) => {
      try {
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential: googleResponse.credential }),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.error || "❌ Google login failed");
          return;
        }

        toast.success("✅ Google login successful");

        if (typeof window !== "undefined") {
          localStorage.setItem("token", data.token);
        }

        login(data.user);

        if (data.user.email === ADMIN_EMAIL) {
          router.push("/Admin");
        } else {
          router.push("/");
        }
      } catch (err) {
        toast.error("❌ Something went wrong");
      }
    },
    [login, router]
  );

  return (
    <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
      <h2 className="text-3xl font-bold text-white text-center mb-2">Login</h2>
      <p className="text-center text-gray-300 mb-6">
        Welcome back to your fitness journey
      </p>

      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-3 border text-sm text-white border-white/30 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10"
        type="email"
        required
      />

      <input
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full p-3 border text-sm text-white border-white/30 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/10"
        type="password"
        required
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded text-sm font-medium transition duration-200 shadow"
      >
        Login
      </button>

      <div className="text-center text-gray-300 text-sm my-6">or</div>

      <div id="google-signin-btn" className="w-full flex justify-center mb-4" />
    </div>
  );
}
