"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  FiGrid,
  FiMessageCircle,
  FiUserCheck,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", icon: <FiGrid />, path: "/admin" },
    { name: "Reviews", icon: <FiMessageCircle />, path: "/admin/reviews" },
    { name: "Requests", icon: <FiUserCheck />, path: "/admin/requests" },
    { name: "Coach", icon: <FiUser />, path: "/admin/coach" },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col justify-between">
      <div>
        <div className="p-6 text-xl font-bold text-blue-600">🎯 Admin Panel</div>

        <nav className="flex flex-col">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => router.push(item.path)}
              className={`flex items-center gap-3 px-6 py-3 text-left hover:bg-blue-100 
              ${
                pathname === item.path
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="px-6 py-4 border-t flex items-center gap-3">
        <Image
          src="/admin-avatar.png"
          alt="Admin Avatar"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div>
          <div className="text-sm font-medium">Elise Beverley</div>
          <div className="text-xs text-gray-500">Admin</div>
        </div>
        <button
          onClick={() => router.push("/logout")}
          className="ml-auto text-gray-400 hover:text-red-500"
        >
          <FiLogOut size={18} />
        </button>
      </div>
    </div>
  );
}
