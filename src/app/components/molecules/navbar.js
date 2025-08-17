"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/api/auth/AuthContext";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  // ✅ Hide Navbar completely on admin pages
  if (pathname.startsWith("/Admin")) {
    return null;
  }

  // Base links for all users
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Workouts", href: "/Exercise" },
    { name: "Fitness", href: "/Gemini" },
    { name: "Nutrition", href: "/Meals" },
    { name: "BMI", href: "/BMI" },
    { name: "Contact", href: "/ContactUS" },
  ];

  // ✅ Add "" tab only for the admin user
  const finalNavLinks = [
    ...navLinks,
    ...(user &&
      user.email?.toLowerCase().trim() === ADMIN_EMAIL?.toLowerCase().trim()
      ? [{ name: "Admin Panel", href: "/Admin" }]
      : []),
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    logout();
    router.push("/Login?logout=true");
  };

  if (loading) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-3 bg-gradient-to-r from-gray-900 via-[#1e2f2e] to-black bg-opacity-95 backdrop-blur-md shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between h-[70px] w-full">
        <Link href="/" className="text-xl md:text-2xl font-extrabold text-white">
          Muscle<span className="text-emerald-300">Factory</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 font-semibold text-sm lg:text-base text-white">
          {finalNavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="border border-white rounded-full px-4 py-1.5 hover:bg-white hover:text-black hover:scale-105 transition-all duration-200 shadow-sm"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth/Profile */}
        <div className="hidden md:flex gap-4 items-center">
          {!user ? (
            <Link
              href="/Login"
              className="text-white font-semibold border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black hover:scale-105 transition duration-200 shadow-md hover:shadow-lg text-sm lg:text-base"
            >
              Log In
            </Link>
          ) : (
            <>
              <button
                onClick={() => router.push("/Profile")}
                className="text-white text-2xl hover:text-emerald-400 transition"
                aria-label="Profile"
              >
                <FaUserCircle />
              </button>
              <button
                onClick={handleLogout}
                className="text-white border border-white px-5 py-2 rounded-full hover:bg-red-500 hover:scale-105 transition duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMobileOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[999] bg-gradient-to-br from-black via-[#1e2f2e] to-gray-900 bg-opacity-95 backdrop-blur-md text-white flex flex-col p-6 transition-all duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="text-2xl font-extrabold">
              Muscle<span className="text-emerald-300">Factory</span>
            </Link>
            <button
              className="text-3xl hover:text-red-400 transition"
              onClick={() => setMobileOpen(false)}
            >
              ×
            </button>
          </div>

          <nav className="flex flex-col gap-4 text-base font-medium">
            {finalNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-full px-4 py-2 text-white border border-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-200 ease-in-out shadow"
              >
                {link.name}
              </Link>
            ))}
            {user && (
              <Link
                href="/Profile"
                onClick={() => setMobileOpen(false)}
                className="mt-4 flex items-center gap-2 border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-200"
              >
                <FaUserCircle className="text-lg" />
                Profile
              </Link>
            )}
          </nav>

          {/* Mobile Auth */}
          <div className="mt-8 flex flex-col gap-4 items-center">
            {!user ? (
              <Link
                href="/Login"
                onClick={() => setMobileOpen(false)}
                className="border border-white px-5 py-2 rounded-full w-full text-center hover:bg-white hover:text-black hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Log In
              </Link>
            ) : (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="border border-white px-5 py-2 rounded-full w-full text-center hover:bg-red-500 hover:text-white hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
