"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import LiquidChrome from "../components/organisms/LiquidChrome";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/Profile", {
          cache: "no-store",
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
          setUser(data.user || data);
          setName(data.name || "");
          setEmail(data.email || "");
          if (data.image) {
            setPreview(data.image);
          }
        } else {
          router.push("/Login");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/Login");
      }
    };

    fetchUser();
  }, [router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (password) formData.append("password", password);
    if (profilePic) formData.append("profilePic", profilePic);

    try {
      const res = await fetch("/api/auth/Profile", {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Profile updated!");
        setUser(data.user);
        setPassword("");
        if (data.user?.image) {
          setPreview(data.user.image);
        }
        router.refresh();
      } else {
        toast.error(data.error || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    } else {
      toast.error("Please select a valid image file.");
    }
  };

  if (!user) return <p className="p-4 text-white">Loading...</p>;

  return (
    <main className="relative bg-gradient-to-b mt-12 from-black via-[#0f3e3b] to-black min-h-screen flex items-center justify-center">
      {/* 🔮 Chrome Effect Background */}
      <div className="absolute inset-0 z-0">
        <LiquidChrome baseColor={[0.1, 0.1, 0.1]} speed={1} amplitude={0.6} interactive />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-black via-[#1e4d4a] to-black opacity-80 z-0" />

      {/* 🧍 Profile Card */}
      <div className="relative z-10 w-full max-w-5xl px-6 py-16">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10 min-h-[500px]">
          
          {/* 👤 Profile Picture */}
          <div className="w-full md:w-1/3 flex flex-col items-center text-center">
            <div className="relative w-40 h-40 mb-4">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                  No Image
                </div>
              )}
              <label
                htmlFor="file-upload"
                className="absolute bottom-0 right-0 bg-white border p-1 rounded-full shadow cursor-pointer"
                title="Change photo"
              >
                📷
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <p className="font-semibold text-white text-lg mt-2">{name || "Your Name"}</p>
            {/* <p className="text-emerald-300 text-sm">{user?.email}</p> */}
            {/* <p className="text-xs text-gray-400 mt-1">Joined recently</p> */}
          </div>

          {/* 📝 Edit Form */}
          <form onSubmit={handleUpdate} className="w-full md:w-2/3 space-y-6">
            <h2 className="text-white text-xl font-bold">Edit Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-white font-medium mb-1">
                  New Password (optional)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="Enter new password"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                className="px-4 py-2 border rounded text-white border-white hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
