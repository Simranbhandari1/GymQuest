import React, { useState, useEffect, useRef } from "react";
import ExerciseVideoUI from "./ExerciseVideoUI"; // Adjust the path if needed

export default function DynamicExerciseSelector({ exercises }) {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (selectedExercise) {
      setSecondsLeft(selectedExercise.duration || 30); // default 30 seconds if not given

      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [selectedExercise]);

  return (
    <div>
      <h2>Select an Exercise</h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {exercises.map((ex) => (
          <div
            key={ex.id}
            onClick={() => setSelectedExercise(ex)}
            style={{
              cursor: "pointer",
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "8px",
              minWidth: "150px",
              textAlign: "center",
              background: selectedExercise?.id === ex.id ? "#e0e0e0" : "white",
            }}
          >
            {ex.name}
          </div>
        ))}
      </div>

      {selectedExercise && (
        <div style={{ marginTop: "2rem" }}>
          <h3>{selectedExercise.name} Video</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${selectedExercise.youtubeId}`}
            title={selectedExercise.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div style={{ marginTop: "1rem", fontSize: "1.5rem" }}>
            Timer: {secondsLeft}s
          </div>

          {/* ExerciseVideoUI below the video */}
          <ExerciseVideoUI
            key={selectedExercise.id} // resets UI on new selection
            initialCount={0}
            onCelebrate={() => {
              alert("🎉 Great job! Keep it up! 🎉");
            }}
          />
        </div>
      )}
    </div>
  );
}
