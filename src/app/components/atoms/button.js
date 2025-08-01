"use client";

import React from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function CustomButton({
  label,
  onClick,
  variant = "primary", // 'primary' | 'secondary'
  fullWidth = false,
  className = "",
  type = "button",
}) {
  const router = useRouter();

  const baseStyle =
    "px-8 py-3 rounded-xl font-bold tracking-wide text-lg transition duration-300";

  const variants = {
    primary: "bg-[#2e8b57] hover:bg-[#267356] text-white",
    secondary: "bg-white text-[#2e8b57] hover:bg-gray-200",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        baseStyle,
        variants[variant],
        fullWidth ? "w-full" : "w-auto",
        className
      )}
    >
      {label}
    </button>
  );
}
