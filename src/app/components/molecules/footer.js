"use client";

import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import LiquidChrome from "../organisms/LiquidChrome"; // Adjust path if needed

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-white px-6 md:px-12 lg:px-20 pt-20 pb-10 font-sans">
      {/* 🌊 Liquid Chrome Background */}
      <LiquidChrome />

      {/* 🎨 Dark Emerald Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-[#1e2f2e]/90 to-black/90 z-0" />

      {/* 📦 Footer Content */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-emerald-500/30 pb-12">
        {/* 🔰 Logo & About */}
        <div>
          <h2 className="text-2xl font-bold">
            Muscle<span className="text-emerald-300">Factory</span>
          </h2>
          <p className="text-sm text-emerald-100/80 mt-4 leading-6">
            Your ultimate fitness companion. Join the movement and reshape your body and mind.
          </p>
          <div className="flex gap-4 mt-6 text-lg text-emerald-200">
            <FaTwitter className="hover:text-white transition" />
            <FaFacebookF className="hover:text-white transition" />
            <FaInstagram className="hover:text-white transition" />
            <FaGithub className="hover:text-white transition" />
          </div>
        </div>

        {/* 📌 Company Links */}
        <div>
          <h3 className="uppercase text-sm text-emerald-200 mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-emerald-100/80">
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Features</li>
            <li className="hover:text-white cursor-pointer">Works</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
          </ul>
        </div>

        {/* 🔧 Help Links */}
        <div>
          <h3 className="uppercase text-sm text-emerald-200 mb-4">Help</h3>
          <ul className="space-y-2 text-sm text-emerald-100/80">
            <li className="hover:text-white cursor-pointer">Customer Support</li>
            <li className="hover:text-white cursor-pointer">Delivery Info</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* 📨 Newsletter */}
        <div>
          <h3 className="uppercase text-sm text-emerald-200 mb-4">
            Subscribe to our newsletter
          </h3>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-full bg-transparent border border-emerald-400 text-sm text-white placeholder-emerald-100 focus:outline-none"
          />
          <button className="mt-4 w-full py-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300 text-sm font-semibold text-black hover:opacity-90 transition">
            Subscribe
          </button>
        </div>
      </div>

      {/* 📅 Copyright */}
      <div className="relative z-10 text-center text-sm text-emerald-100/60 mt-8">
        © {new Date().getFullYear()} MuscleFactory. All rights reserved.
      </div>
    </footer>
  );
}
