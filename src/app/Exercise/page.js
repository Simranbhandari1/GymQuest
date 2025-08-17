"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; // ✅ Next.js optimized image
import { getCloudinaryUrl } from "@/lib/cloudinary";
import LiquidChrome from "../components/organisms/LiquidChrome";

export default function ExerciseList() {
  const [exercises, setExercises] = useState(null); // null = still loading
  const [selectedExercise, setSelectedExercise] = useState(null);

  // Fetch exercises from API
  useEffect(() => {
    fetch("/api/auth/exercises")
      .then((res) => res.json())
      .then((data) => setExercises(data))
      .catch(() => setExercises([])); // fallback to empty on error
  }, []);

  // Extract YouTube video ID
  function extractYouTubeID(url) {
    if (!url) return null;
    const reg =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/;
    const match = url.match(reg);
    return match ? match[1] : null;
  }

  // Skeleton card (loading state)
  const SkeletonCard = () => (
    <div className="animate-pulse bg-black bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg p-4 w-[340px] h-[360px]">
      <div className="bg-gray-700 bg-opacity-40 rounded h-2/3 mb-4"></div>
      <div className="h-6 bg-gray-700 bg-opacity-40 rounded mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-700 bg-opacity-40 rounded w-5/6"></div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-[#0f3e3b] to-black overflow-hidden">
      {/* Background animation */}
      <LiquidChrome />

      {/* Main Content */}
      <div className="relative max-w-6xl mt-20 mx-auto p-6">
        <div className="grid gap-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center">
          {/* Loading skeletons */}
          {exercises === null &&
            Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)}

          {/* No data */}
          {exercises?.length === 0 && (
            <p className="text-white text-center col-span-full">
              No exercises found.
            </p>
          )}

          {/* Exercise cards */}
          {exercises &&
            exercises.length > 0 &&
            exercises.map((ex) => {
              const imageUrl = getCloudinaryUrl(ex.image || ex.thumbnail || "");
              return (
                <div
                  key={ex._id}
                  onClick={() => setSelectedExercise(ex)}
                  className={`bg-black bg-opacity-30 backdrop-blur-md text-white rounded-lg shadow-lg hover:shadow-xl transition p-4 cursor-pointer w-[340px] h-[360px] ${
                    selectedExercise?._id === ex._id
                      ? "ring-4 ring-purple-500"
                      : ""
                  }`}
                >
                  {/* ✅ Next.js Image instead of <img> */}
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={ex.title || "Exercise image"}
                      width={340}
                      height={220}
                      priority // helps with LCP
                      unoptimized // ✅ Remove if Cloudinary domain added in next.config.js
                      className="w-full h-2/3 object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-2/3 bg-gray-700 rounded flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  <h2 className="text-xl font-bold mt-4">{ex.title}</h2>
                  <p className="text-gray-300">
                    {ex.description?.slice(0, 60)}...
                  </p>
                </div>
              );
            })}
        </div>

        {/* Video Section */}
        {selectedExercise && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-4 text-white">
              {selectedExercise.title} Video
            </h3>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${extractYouTubeID(
                selectedExercise.youtubeUrl
              )}?autoplay=1&mute=1`}
              title={selectedExercise.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy" // ✅ better performance
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}
