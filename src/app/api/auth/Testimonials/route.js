// // app/api/testimonials/route.js
// import { connectToDB } from '@/utils/db';
// import Testimonial from '@/models/Testimonial';

// export async function GET() {
//   await connectToDB();
//   const testimonials = await Testimonial.find().sort({ createdAt: -1 });
//   return new Response(JSON.stringify(testimonials), { status: 200 });
// }

// export async function POST(req) {
//   await connectToDB();
//   const body = await req.json();
//   const testimonial = await Testimonial.create(body);
//   return new Response(JSON.stringify(testimonial), { status: 201 });
// }
