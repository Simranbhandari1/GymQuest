"use client";

import React from "react";
import { FaInstagram } from "react-icons/fa";
import LiquidChrome from "../LiquidChrome";

const trainers = [
  {
    name: "Esther Howard",
    role: "Senior Fitness Trainer",
    image: "/gym-trainer-1.jpg",
  },
  {
    name: "Jenny Wilson",
    role: "Senior Fitness Trainer",
    image: "/gym-trainer-2.jpg",
  },
  {
    name: "John Doe",
    role: "Senior Fitness Trainer",
    image: "/gym-trainer-3.jpg",
  },
  {
    name: "Alex Smith",
    role: "Senior Fitness Trainer",
    image: "/gym-trainer-4.jpg",
  },
];

export default function ExpertTrainersSection() {
  return (
    <section className="relative overflow-hidden py-20 px-6 md:px-12 text-white bg-black">
      {/* 🌊 Liquid Chrome Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LiquidChrome
          baseColor={[0.05, 0.2, 0.2]}
          speed={1}
          amplitude={0.4}
          interactive={true}
        />
      </div>

      {/* 🌓 Overlay for darkening */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-[#0f3e3b]/80 to-black/90 z-10" />

      {/* 👥 Trainers Content */}
      <div className="relative z-20 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-16 tracking-tight">
          Expert <span className="text-green-400">Trainers</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-green-400/20 transition-transform duration-300 hover:scale-[1.03] border border-green-500/20"
            >
              {/* Glow Border */}
              <div className="absolute inset-0 rounded-2xl z-0 bg-gradient-to-br from-[#00ffc255] via-[#00ffc233] to-[#00ffc255] blur-sm opacity-30 group-hover:opacity-60 transition" />

              <div className="relative z-10 bg-[#111]/90 rounded-2xl overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-64 object-cover object-top"
                />
                <div className="p-5 text-left">
                  <h3 className="text-xl font-semibold">{trainer.name}</h3>
                  <p className="text-sm text-gray-400">{trainer.role}</p>
                  {/* Removed Instagram Button */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
