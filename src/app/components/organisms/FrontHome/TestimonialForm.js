// "use client";
// import { useState } from "react";

// export default function TestimonialForm({ onAdd }) {
//   const [form, setForm] = useState({
//     name: "",
//     company: "",
//     image: "",
//     stars: 5,
//     text: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch("/api/auth/Testimonials", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     if (res.ok) {
//       setForm({
//         name: "",
//         company: "",
//         image: "",
//         stars: 5,
//         text: "",
//       });
//       onAdd(); // Refresh testimonials
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-6 rounded-xl shadow-lg space-y-4"
//     >
//       <h3 className="text-xl font-bold text-gray-700 text-center">
//         Leave Your Testimonial
//       </h3>
//       <input
//         name="name"
//         value={form.name}
//         onChange={handleChange}
//         placeholder="Your Name"
//         required
//         className="w-full px-4 py-2 border rounded-lg"
//       />
//       <input
//         name="company"
//         value={form.company}
//         onChange={handleChange}
//         placeholder="Company or Title"
//         className="w-full px-4 py-2 border rounded-lg"
//       />
//       <input
//         name="image"
//         value={form.image}
//         onChange={handleChange}
//         placeholder="Image URL (optional)"
//         className="w-full px-4 py-2 border rounded-lg"
//       />
//       <input
//         name="stars"
//         type="number"
//         min="1"
//         max="5"
//         value={form.stars}
//         onChange={handleChange}
//         className="w-full px-4 py-2 border rounded-lg"
//       />
//       <textarea
//         name="text"
//         value={form.text}
//         onChange={handleChange}
//         placeholder="Your message"
//         required
//         className="w-full px-4 py-2 border rounded-lg"
//       />
//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//       >
//         Submit Testimonial
//       </button>
//     </form>
//   );
// }
