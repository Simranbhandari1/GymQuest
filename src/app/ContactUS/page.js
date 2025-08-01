'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import LiquidChrome from '../components/organisms/LiquidChrome';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Feedback',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/Contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Message sent successfully!");
        setFormData({
          name: '',
          email: '',
          subject: 'Feedback',
          phone: '',
          message: '',
        });
      } else {
        toast.error(data.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error sending message");
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-black via-[#0f3e3b] to-black mt-20 min-h-screen overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
        <LiquidChrome baseColor={[0.05, 0.1, 0.1]} interactive />
      </div>

      <Toaster position="top-right" />

      {/* Contact Form Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-2xl bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-10 text-white">
          
          <h2 className="text-4xl font-bold text-center mb-4">Contact Us</h2>
          <p className="text-center text-white/80 mb-10">
            We'd love to hear from you. Fill out the form below and we'll get back to you.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-semibold text-white/80">Full Name</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/80">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/80">Phone Number</label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="+91 9876543210"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/80">Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option className='text-black'>Feedback</option>
                <option className='text-black'>Help</option>
                <option className='text-black'>Business</option>
                <option className='text-black'>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/80">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full mt-1 px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                placeholder="Type your message here..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 transition rounded-lg font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
