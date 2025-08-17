"use client";

import { useEffect, useState } from "react";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch("/api/auth/Contact");
        if (!res.ok) throw new Error("Failed to fetch contacts");

        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setContacts(json.data);
        } else {
          setError("Invalid data format");
          setContacts([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchContacts();
  }, []);

  // Skeleton Loader UI
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-[#2e8b57]">
          All User Messages
        </h1>
        <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse flex space-x-4 border-b border-gray-200 py-3"
            >
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              </div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              </div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error)
    return (
      <p className="text-red-600 text-center text-lg font-semibold">
        Error: {error}
      </p>
    );
  if (contacts.length === 0)
    return (
      <p className="text-gray-500 text-center text-lg font-medium">
        No messages found.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#2e8b57]">
        All User Messages
      </h1>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#2e8b57] text-white sticky top-0">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Message</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(({ _id, name, email, subject, message }) => (
                <tr
                  key={_id}
                  className="odd:bg-gray-50 even:bg-white hover:bg-[#e0f2f1] transition"
                >
                  <td className="py-3 px-4 border-b border-gray-200 font-medium">
                    {name}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {email}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        subject?.toLowerCase() === "feedback"
                          ? "bg-blue-100 text-blue-800"
                          : subject?.toLowerCase() === "issue"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {subject || "General"}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 whitespace-pre-wrap">
                    {message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
