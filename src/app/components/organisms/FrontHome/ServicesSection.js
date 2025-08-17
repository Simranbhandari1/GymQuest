"use client";

import React from "react";

export default function ServicesSection() {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-700 to-gray-900 text-white py-20 px-4 md:px-20 font-sans">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">
          The <span className="text-yellow-200">WellFlex</span> Services
        </h2>
        <p className="text-white/80 mt-2">
          10+ years of transforming lives with expert fitness guidance.
        </p>
        <div className="w-24 h-1 bg-yellow-300 mx-auto mt-4 rounded"></div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white/10 border border-yellow-300 rounded-2xl p-6 hover:shadow-lg hover:shadow-yellow-200/30 transition">
          <div className="text-yellow-200 text-lg font-semibold mb-2">
            Yoga for Beginners
          </div>
          <p className="text-white/70 text-sm mb-4">
            This beginner-level yoga program is designed to introduce you to the fundamentals of yoga practice.
          </p>
          <div className="text-sm text-white/80 mb-2">
            Duration: <span className="text-white">30 Days</span>
          </div>
          <div className="text-sm text-white/80 mb-4">
            Focus: Flexibility, Relaxation
          </div>
          <div className="text-yellow-100 text-lg font-bold">
            $49 <span className="text-sm text-white/70">/month</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white/10 border border-yellow-300 rounded-2xl p-6 hover:shadow-lg hover:shadow-yellow-200/30 transition">
          <div className="text-yellow-200 text-lg font-semibold mb-2">
            Advanced Yoga
          </div>
          <p className="text-white/70 text-sm mb-4">
            Strengthen your body and mind with this 60-day yoga program for experienced individuals.
          </p>
          <div className="text-sm text-white/80 mb-2">
            Duration: <span className="text-white">60 Days</span>
          </div>
          <div className="text-sm text-white/80 mb-4">
            Focus: Strength, Mindfulness
          </div>
          <div className="text-yellow-100 text-lg font-bold">
            $79 <span className="text-sm text-white/70">/month</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white/10 border border-yellow-300 rounded-2xl p-6 hover:shadow-lg hover:shadow-yellow-200/30 transition">
          <div className="text-yellow-200 text-lg font-semibold mb-2">
            Zumba for Beginners
          </div>
          <p className="text-white/70 text-sm mb-4">
            Dance your way to fitness with this fun and energetic 90-day Zumba program.
          </p>
          <div className="text-sm text-white/80 mb-2">
            Duration: <span className="text-white">90 Days</span>
          </div>
          <div className="text-sm text-white/80 mb-4">
            Focus: Cardio, Energy
          </div>
          <div className="text-yellow-100 text-lg font-bold">
            $89 <span className="text-sm text-white/70">/month</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white/10 border border-yellow-300 rounded-2xl p-6 hover:shadow-lg hover:shadow-yellow-200/30 transition">
          <div className="text-yellow-200 text-lg font-semibold mb-2">
            Advanced Pilates
          </div>
          <p className="text-white/70 text-sm mb-4">
            Improve your posture and strength with this challenging 90-day Pilates routine.
          </p>
          <div className="text-sm text-white/80 mb-2">
            Duration: <span className="text-white">90 Days</span>
          </div>
          <div className="text-sm text-white/80 mb-4">
            Focus: Core, Flexibility
          </div>
          <div className="text-yellow-100 text-lg font-bold">
            $99 <span className="text-sm text-white/70">/month</span>
          </div>
        </div>
      </div>
    </div>
  );
}
