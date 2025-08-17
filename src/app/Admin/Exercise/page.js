"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function AddExercise() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function getYouTubeId(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const youtubeId = getYouTubeId(youtubeUrl);
    if (!youtubeId) {
      setMessage("Please enter a valid YouTube URL");
      setLoading(false);
      return;
    }
    const newExercise = { title, description, thumbnail, youtubeId, steps: [] };

    try {
      const res = await fetch("/api/auth/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExercise),
      });
      if (res.ok) {
        setMessage("Exercise added successfully!");
        setTitle("");
        setDescription("");
        setThumbnail("");
        setYoutubeUrl("");
      } else {
        const errorData = await res.json();
        setMessage(
          `Failed to add exercise: ${errorData.message || res.statusText}`
        );
      }
    } catch {
      setMessage("An error occurred while submitting the form.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#002b23] to-black relative overflow-hidden">
      {/* Floating glowing blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-green-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-teal-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-lg"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-white text-center">
          Add New Exercise
        </h1>

        {message && !loading && (
          <div
            className={`mb-6 p-4 rounded-lg text-sm font-medium ${
              message.includes("successfully")
                ? "bg-green-500/20 text-green-300"
                : "bg-red-500/20 text-red-300"
            }`}
          >
            {message}
          </div>
        )}

        {loading ? (
          // Skeleton Loader
          <div className="space-y-5 animate-pulse">
            <div className="h-10 bg-white/20 rounded-lg"></div>
            <div className="h-24 bg-white/20 rounded-lg"></div>
            <div className="h-10 bg-white/20 rounded-lg"></div>
            <div className="h-10 bg-white/20 rounded-lg"></div>
            <div className="h-12 bg-green-500/40 rounded-lg"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block mb-1 font-semibold text-white">Title *</label>
              <input
                type="text"
                placeholder="Enter exercise title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg outline-none placeholder-gray-300"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-semibold text-white">Description</label>
              <textarea
                placeholder="Describe the exercise"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg outline-none placeholder-gray-300 resize-none"
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block mb-1 font-semibold text-white">
                Thumbnail Public ID
              </label>
              <input
                type="text"
                placeholder="Cloudinary public ID"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg outline-none placeholder-gray-300"
              />
            </div>

            {/* YouTube URL */}
            <div>
              <label className="block mb-1 font-semibold text-white">
                YouTube Video URL
              </label>
              <input
                type="url"
                placeholder="Enter YouTube link"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg outline-none placeholder-gray-300"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-green-500/80 text-white font-bold py-3 rounded-lg text-lg shadow-md hover:bg-green-500 transition"
            >
              Submit Exercise
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
