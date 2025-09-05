"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");

  useEffect(() => {
    // ✅ Call your backend to save the purchased plan for this user
    fetch("/api/savePlan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
  }, [plan]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold text-green-400">✅ Payment Successful!</h1>
      <p className="mt-2">You purchased the <span className="font-bold">{plan}</span>.</p>
      <p className="mt-4">You now have access to the workout section 🚀</p>
    </div>
  );
}
