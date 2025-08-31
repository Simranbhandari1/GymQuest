"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/api/auth/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout(); // clear context
    localStorage.removeItem("token"); // remove token
    router.push("/Login?logout=true"); // redirect to login with message
  };

  return (
    <div className="flex min-h-screen font-sans bg-[#e0f2f1]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2e8b57] p-6 shadow-md fixed left-0 h-full text-white">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-full h-10 bg-[#3da879] animate-pulse rounded-md"
              ></div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <NavItem label="Home" href="/Admin" />
            <NavItem label="Users" href="/Admin/users" />
            <NavItem label="Workouts" href="/Admin/Exercise" />
            <NavItem label="Contact" href="/Admin/Contact" />

            {/* ✅ Logout button */}
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 rounded-md border border-white + transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-64">{children}</main>
    </div>
  );
}

function NavItem({ label, href }) {
  return (
    <Link href={href}>
      <button className="w-full text-left px-4 py-2 rounded-md border border-white hover:bg-[#b2dfdb] hover:text-[#004d40] transition-colors duration-200">
        {label}
      </button>
    </Link>
  );
}
