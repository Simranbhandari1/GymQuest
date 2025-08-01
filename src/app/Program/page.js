"use client";
import ProtectedRoute from "../components/organisms/Access/ProtectedRoute";

export default function Programs() {
  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Welcome to the Programs Page</h1>
        {/* Add your page content here */}
      </div>
    </ProtectedRoute>
  );
}
