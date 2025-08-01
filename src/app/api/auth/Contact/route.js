// // app/api/contact/route.js
// import { NextResponse } from 'next/server';
// import { connectDB } from '@/app/lib/config/db';
// import Contact from '@/app/lib/models/ContactModel';

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { name, email, subject, message } = body;

//     console.log("📨 Contact Form Submitted:", body); // ✅ Debug line

//     if (!name || !email || !subject || !message) {
//       return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
//     }

//     await connectDB();

//     const savedMessage = await Contact.create({ name, email, subject, message });

//     console.log("✅ Saved to MongoDB:", savedMessage); // ✅ Debug line

//     return NextResponse.json({ message: 'Message saved successfully!', data: savedMessage });
//   } catch (error) {
//     console.error('❌ Contact form error:', error.message);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }


// app/api/contact/route.js
import { connectDB } from '@/app/lib/config/db';
import Contact from "@/app/lib/models/ContactModel";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, message } = await req.json();

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    return Response.json({ success: true, message: "Message sent!" });
  } catch (error) {
    console.error("❌ Error saving message:", error);
    return Response.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}

