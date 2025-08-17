"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image"; // ✅ Import Next.js Image
import confetti from "canvas-confetti";
import { getCloudinaryUrl } from "@/lib/cloudinary";

export default function ExerciseDetail() {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/auth/exercises/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setExercise(data))
      .catch(() => setExercise(null));
  }, [id]);

  if (!exercise) {
    return (
      <div className="text-center p-8 text-white text-lg">
        Loading exercise...
      </div>
    );
  }

  const youtubeID = extractYouTubeID(exercise.youtubeUrl);

  const handleDone = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
    alert("🎉 Congratulations! You completed the workout! 🎉");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-[#0f3e3b] to-black text-white">
      <div className="max-w-3xl mx-auto p-6 flex flex-col">
        <h1 className="text-3xl font-bold mb-6 text-center">{exercise.title}</h1>

        {youtubeID ? (
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${youtubeID}?autoplay=1&mute=1`}
            title={exercise.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="mb-6 rounded-lg shadow-lg border border-gray-700"
          />
        ) : (
          <p className="text-center italic text-gray-300">No video available</p>
        )}

        <div className="flex flex-col space-y-8 mb-6">
          {exercise.steps?.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-black bg-opacity-30 backdrop-blur-md p-4 rounded-lg shadow-lg"
            >
              {step.image && (
                <Image
                  src={getCloudinaryUrl(step.image)}
                  alt={`Step ${idx + 1}`}
                  width={256} // ✅ required by Next.js Image
                  height={256}
                  className="object-contain mb-3 rounded"
                />
              )}
              <p className="text-lg font-medium text-center">
                {step.instruction}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={handleDone}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition self-center"
        >
          Done ✅
        </button>
      </div>
    </div>
  );
}

function extractYouTubeID(url) {
  if (!url) return null;
  const reg =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
  return url.match(reg)?.[1] || null;
}
