// // /app/api/pexels/route.js
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   const { query = "workout", per_page = 6 } = await req.json();

//   try {
//     const response = await fetch(
//       `https://api.pexels.com/videos/search?query=${query}&per_page=${per_page}`,
//       {
//         headers: {
//           Authorization: process.env.API_KEY,
//         },
//       }
//     );

//     const result = await response.json();

//     const videos = result.videos.map((video) => ({
//       id: video.id,
//       url: video.video_files.find((f) => f.quality === "sd")?.link || "",
//       thumbnail: video.image,
//       duration: video.duration,
//     }));

//     return NextResponse.json({ videos });
//   } catch (error) {
//     console.error("❌ Pexels API failed:", error);
//     return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
//   }
// }


// /app/api/pexels/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  const { query = "workout", per_page = 6 } = await req.json();

  try {
    const response = await fetch(
      `https://api.pexels.com/videos/search?query=${query}&per_page=${per_page}`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY, // Make sure you use the right env key
        },
      }
    );

    const result = await response.json();

    const videos = result.videos.map((video) => ({
      id: video.id,
      url: video.video_files.find((f) => f.quality === "sd")?.link || "",
      thumbnail: video.image,
      duration: video.duration,
    }));

    return NextResponse.json({ videos });
  } catch (error) {
    console.error("❌ Pexels API failed:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
