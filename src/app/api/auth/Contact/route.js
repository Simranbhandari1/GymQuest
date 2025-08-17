import { connectDB } from '@/lib/config/db';
import Contact from "@/lib/models/ContactModel";

export async function GET(req) {
  try {
    await connectDB();

    const contacts = await Contact.find({});
    return new Response(JSON.stringify({ success: true, data: contacts }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error fetching messages:", error);
    return new Response(JSON.stringify({ success: false, error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, message } = await req.json();

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    return new Response(JSON.stringify({ success: true, message: "Message sent!" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error saving message:", error);
    return new Response(JSON.stringify({ success: false, error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
