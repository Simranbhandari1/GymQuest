// lib/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // If already connected, no need to connect again
    if (mongoose.connection.readyState === 1) {
      console.log("⚡ Already connected to MongoDB");
      return;
    }

    // Connect to MongoDB using URI from .env file
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Musclefactory", // ✅ Make sure this matches your DB name
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};



// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error("❌ MONGODB_URI is not defined in .env.local");
// }

// let isConnected = false; // ✅ Prevent multiple connections

// export async function connectDB() {
//   if (isConnected) {
//     console.log("➡️ Using existing MongoDB connection");
//     return;
//   }

//   try {
//     await mongoose.connect(MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     isConnected = true;
//     console.log("✅ MongoDB connected");
//   } catch (err) {
//     console.error("❌ MongoDB connection error:", err);
//     throw err;
//   }
// }
