// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import TestimonialForm from "./TestimonialForm";

// export default function TestimonialsSection() {
//   const [testimonials, setTestimonials] = useState([]);

//   const fetchTestimonials = async () => {
//     const res = await fetch("/api/testimonials");
//     const data = await res.json();
//     setTestimonials(data);
//   };

//   useEffect(() => {
//     fetchTestimonials();
//   }, []);

//   return (
//     <section className="py-12 px-4 bg-gray-50">
//       <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
//         What Our Members Say
//       </h2>

//       {/* Testimonial Form */}
//       <div className="max-w-2xl mx-auto mb-10">
//         <TestimonialForm onAdd={fetchTestimonials} />
//       </div>

//       {/* Testimonials */}
//       <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
//         {testimonials.map((t) => (
//           <div key={t._id} className="bg-white p-6 rounded-xl shadow-md">
//             {t.image && (
//               <div className="w-16 h-16 mx-auto mb-3">
//                 <Image
//                   src={t.image}
//                   alt={t.name}
//                   width={64}
//                   height={64}
//                   className="rounded-full object-cover"
//                 />
//               </div>
//             )}
//             <h4 className="text-lg font-semibold text-center">{t.name}</h4>
//             <p className="text-sm text-center text-gray-500">{t.company}</p>
//             <div className="flex justify-center mt-2">
//               {"⭐".repeat(t.stars || 5)}
//             </div>
//             <p className="text-gray-600 mt-3 text-center">{t.text}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
