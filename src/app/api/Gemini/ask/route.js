import { GoogleGenerativeAI } from '@google/generative-ai';
import MealPlan from '@/lib/models/MealPlan';
import { connectDB } from '@/lib/config/db';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    await connectDB();

    const { userData } = await req.json();
    const uniqueSeed = Math.random().toString(36).substring(2, 10);

    const prompt = `
You are a professional fitness and nutrition coach.

Generate a **7-day weekly plan (Monday to Saturday)** for this user:
- Name: ${userData.name}
- Age: ${userData.age}
- Gender: ${userData.gender}
- Height: ${userData.height} cm
- Weight: ${userData.weight} kg
- Goal: ${userData.goal}
- Diet Preference: ${userData.dietPreference}
- Health Conditions: ${userData.health || "None"}

👉 Follow this format (like a fitness chart):

Each day should include:
- 🔹 Breakfast
- 🔹 Snack
- 🔹 Lunch
- 🔹 Snack
- 🔹 Dinner

Rules:
1. Each meal must list **3–5 items** (numbered 01, 02, 03...).
2. Return output in **pure HTML** inside one main <div class="weekly-plan">.
3. Use only <div>, <h3>, <ul>, <li>. No tables, no markdown.
4. Each day must be wrapped inside <div class="day"> with <h3> for the title.
5. Clean and minimal structure — like a diet calendar.

Use variation seed: ${uniqueSeed}
`;

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let rawHtml = await response.text();

    // Cleanup: remove code fences / notes
    rawHtml = rawHtml
      .replace(/```html\s*/gi, '')
      .replace(/```/g, '')
      .replace(/Note:.*?(<br\s*\/?>)?/gi, '');

    // CSS styling (3 cards per row, wider layout, responsive)
    const style = `
      <style>
        body {
          margin: 0;
          padding: 0;
          background: #111;
          color: #fff;
          font-family: sans-serif;
        }
        .weekly-plan {
          display: grid;
          grid-template-columns: repeat(3, 1fr); /* ✅ Always 3 cards on desktop */
          gap: 1.5rem;
          padding: 2rem;
          max-width: 1200px;  /* ✅ Wider container */
          margin: 0 auto;
          width: 100%;
        }
        .weekly-plan .day {
          background: #222;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.35);
        }
        .weekly-plan h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #00ffff;
          text-align: center;
        }
        .weekly-plan ul {
          list-style: none;
          padding-left: 0;
          margin-bottom: 1rem;
        }
        .weekly-plan li {
          margin-bottom: 6px;
          font-size: 1rem;
          color: #ddd;
        }
        /* ✅ Responsive: 2 cards on tablets */
        @media (max-width: 992px) {
          .weekly-plan {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        /* ✅ 1 card on mobile */
        @media (max-width: 600px) {
          .weekly-plan {
            grid-template-columns: 1fr;
          }
        }
      </style>
    `;

    const finalHtml = style + rawHtml;

    // Save meal plan in DB
    await MealPlan.create({
      name: userData.name,
      age: userData.age,
      gender: userData.gender,
      height: userData.height,
      weight: userData.weight,
      goal: userData.goal,
      dietPreference: userData.dietPreference,
      health: userData.health || 'None',
      htmlPlan: finalHtml,
    });

    return new Response(finalHtml, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error('Gemini API or DB error:', error);
    return new Response('<p>Failed to generate or save meal plan.</p>', {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    });
  }
}

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export async function POST(req) {
//   try {
//     const { age, weight, height, goal, diet, health } = await req.json();

//     const prompt = `
//       I am ${age} years old, ${weight}kg, ${height}cm tall.
//       My goal is to ${goal}.
//       My preferred diet is ${diet}.
//       I have the following health issues: ${health}.

//       Please create a detailed 7-day diet plan based on this information.
//     `;

//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const result = await model.generateContent(prompt);
//     const text = await result.response.text();

//     return Response.json({ dietPlan: text });

//   } catch (error) {
    
//     console.error("Error generating plan:", error);
//     return Response.json({ error: "Could not generate plan" }, { status: 500 });
//   }
// }

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export async function POST(req) {
//   try {
//     const { age, weight, height, goal, diet, health } = await req.json();

//     if (!age || !weight || !height || !goal || !diet) {
//       return new Response(
//         JSON.stringify({ error: "All fields are required." }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const prompt = `
// You are a professional fitness and nutrition expert.

// Create a personalized 7-day gym diet plan for the following user:

// - Age: ${age} years
// - Weight: ${weight} kg
// - Height: ${height} cm
// - Goal: ${goal}
// - Diet Preference: ${diet}
// - Health Issues: ${health}

// Provide the plan in a neat HTML format with:
// - A title and intro
// - 7 sections (one for each day)
// - Each day should include: Breakfast, Snack, Lunch, Snack, Dinner
// - Use clean styling (white background, readable fonts)

// Only return the complete HTML content with <!DOCTYPE html>, <html>, <head>, and <body>. No explanation or extra text.
// `;

//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // or your preferred version
//     const result = await model.generateContent(prompt);
//     const rawHTML = await result.response.text();

//     // Clean code blocks like ```html
//     const cleanHTML = rawHTML.replace(/```html|```/g, "").trim();

//     // Wrap in fallback HTML template in case Gemini doesn’t return <html>
//     const wrappedHTML = cleanHTML.startsWith("<!DOCTYPE")
//       ? cleanHTML
//       : `
//         <!DOCTYPE html>
//         <html lang="en">
//           <head>
//             <meta charset="UTF-8" />
//             <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//             <title>Diet Plan</title>
//             <style>
//               body {
//                 background-color: white;
//                 color: black;
//                 padding: 20px;
//                 font-family: Arial, sans-serif;
//               }
//               h1, h2 {
//                 color: #2e2e2e;
//               }
//               section {
//                 margin-bottom: 20px;
//                 border-bottom: 1px solid #ddd;
//                 padding-bottom: 10px;
//               }
//             </style>
//           </head>
//           <body>
//             <h1>Your 7-Day Diet Plan</h1>
//             ${cleanHTML}
//           </body>
//         </html>
//       `;

//     return new Response(wrappedHTML, {
//       status: 200,
//       headers: { "Content-Type": "text/html" },
//     });

//   } catch (error) {
//     console.error("Gemini error:", error);
//     return new Response(
//       JSON.stringify({ error: "Failed to generate diet plan." }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }
