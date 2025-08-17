"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutPopup({ onClose }) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the token or localStorage
    localStorage.removeItem("token");
    router.push("/logout");
    onClose(); // close popup after redirect
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl text-center space-y-4">
        <h2 className="text-lg font-semibold">Are you sure you want to log out?</h2>
        <div className="flex justify-center gap-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Stay Logged In
          </button>
        </div>
      </div>
    </div>
  );
}
