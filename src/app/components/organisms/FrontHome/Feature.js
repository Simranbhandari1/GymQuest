"use client";

import React from "react";
import { useRouter } from "next/navigation"; // ⬅️ import useRouter
import LiquidChrome from "../LiquidChrome";
import CustomButton from "../../atoms/button";

const featuresData = [
  {
    title: "Trusted 50,000+ Clients",
    desc: "Our clients' satisfaction speaks for itself.",
    extra: "Join thousands of happy members who trust us for their fitness journey.",
  },
  {
    title: "Personalized Plans",
    desc: "Tailored to meet your fitness goals.",
    extra: "Get a fitness plan designed just for you, based on your needs and preferences.",
  },
  {
    title: "Award-Winning Trainers",
    desc: "Learn from the best in the industry.",
    extra: "Our trainers are certified and recognized for their excellence in fitness coaching.",
  },
  {
    title: "Membership Options",
    desc: "Memberships that suit your lifestyle.",
    extra: "Choose a membership plan that fits your schedule and fitness goals.",
  },
  {
    title: "Nutrition Plans",
    desc: "Nutrition to fuel your fitness journey.",
    extra: "We provide personalized meal plans to complement your workout regimen.",
  },
  {
    title: "State-of-the-Art Facilities",
    desc: "Best equipment and training space.",
    extra: "Our gym is equipped with the latest fitness tools to help you achieve your goals.",
  },
];

export default function Features() {
  const router = useRouter(); // ⬅️ initialize the router

  return (
    <section className="relative z-20 overflow-hidden bg-gradient-to-b from-black via-[#0f3e3b] to-black flex flex-col justify-center items-center">
      {/* Liquid Chrome Background */}
      <div className="absolute inset-0 z-0">
        <LiquidChrome
          baseColor={[0.05, 0.2, 0.2]}
          speed={1}
          amplitude={0.4}
          interactive={true}
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-[#0f3e3b]/80 to-black/90 z-10" />

      {/* Main Content */}
      <div className="relative z-20 py-16 px-4 md:px-10 text-white w-full">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            The <span className="text-white">Well</span>
            <span className="text-green-400">Flex</span> Difference
          </h2>
          <p className="text-white/80 mb-10">
            10+ years of transforming lives with expert fitness guidance.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {featuresData.map((card, index) => (
              <div
                key={index}
                className="bg-[#111111]/80 border border-green-400/10 text-white p-6 rounded-2xl shadow-md hover:shadow-green-400/30 hover:scale-105 transition-all duration-300"
              >
                <h4 className="text-xl font-semibold mb-1">{card.title}</h4>
                <p className="text-white/80 mb-2">{card.desc}</p>
                <p className="text-sm text-white/60">{card.extra}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-12 flex justify-center">
            <CustomButton
              label="Explore Our Programs "
              onClick={() => router.push("/Gemini")} // ⬅️ redirect here
            />
          </div>
        </div>
      </div>
    </section>
  );
}
