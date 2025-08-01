"use client";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/admin/users?email=admin@example.com"); // replace with real admin
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        alert("Access denied");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Users</h1>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Signup Date</th>
            <th className="border p-2">Last Login</th>
            <th className="border p-2">Blocked?</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx} className="text-center">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{new Date(user.createdAt).toLocaleDateString()}</td>
              <td className="border p-2">{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "N/A"}</td>
              <td className="border p-2">{user.isBlocked ? "Yes" : "No"}</td>
              <td className="border p-2">{user.role || "User"}</td>
              <td className="border p-2">
                <button className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
