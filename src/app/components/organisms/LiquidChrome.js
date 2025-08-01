"use client";
import { useRef, useEffect } from "react";

export default function LiquidChrome() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const circles = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 60 + 20,
      dx: (Math.random() - 0.5) * 0.7,
      dy: (Math.random() - 0.5) * 0.7,
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let circle of circles) {
        const gradient = ctx.createRadialGradient(
          circle.x,
          circle.y,
          0,
          circle.x,
          circle.y,
          circle.r
        );
        gradient.addColorStop(0, "#14b8a6"); // green
        gradient.addColorStop(1, "#0f172a"); // dark

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
        ctx.fill();

        // Move
        circle.x += circle.dx;
        circle.y += circle.dy;

        // Bounce
        if (circle.x - circle.r < 0 || circle.x + circle.r > canvas.width)
          circle.dx *= -1;
        if (circle.y - circle.r < 0 || circle.y + circle.r > canvas.height)
          circle.dy *= -1;
      }

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}
