import { GoogleGenerativeAI } from '@google/generative-ai';
import MealPlan from '@/app/lib/models/MealPlan';
import { connectDB } from '@/app/lib/config/db';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    await connectDB();

    const { userData } = await req.json();

    const uniqueSeed = Math.random().toString(36).substring(2, 10);

    const prompt = `
You are a professional nutritionist. Based on the following user details, generate a structured **Weekly Meal Planner** in pure **HTML format**.

**User Details:**
- Name: ${userData.name}
- Age: ${userData.age}
- Gender: ${userData.gender}
- Height: ${userData.height} cm
- Weight: ${userData.weight} kg
- Fitness Goal: ${userData.goal}
- Diet Preference: ${userData.dietPreference}
- Health Issues: ${userData.health || 'None'}

**Instructions:**
- Personalize the meal plan based on diet preference and fitness goal.
- Output only **pure valid HTML** using proper HTML tags like <table>, <tr>, <td>, <thead>, <tbody>, <strong>, <div>, etc.
- Do NOT use Markdown formatting.
- Do NOT include any "Note:" or disclaimer at the bottom.
- Each day (Monday to Saturday) must include **Breakfast, Lunch, Dinner**.
- Return a different diet plan each time by using variation. Use this seed for randomness: ${uniqueSeed}
- Final output should contain only the pure HTML — no backticks, no Markdown, no explanations.

Respond ONLY with HTML, nothing else.
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let htmlPlan = await response.text();

    // Clean unwanted formatting
    htmlPlan = htmlPlan.replace(/```html\s*/i, "")
                       .replace(/```/g, "")
                       .replace(/<strong>Note:.*?<\/strong>.*?(<br\s*\/?>)?/gi, "")
                       .replace(/Note:.*?(<br\s*\/?>)?/gi, "");

    // Inject CSS for white text and transparent backgrounds
    const style = `
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        th, td {
          padding: 12px;
          color: white;
        }
        thead th {
          background-color: transparent !important;
          color: white !important;
          font-weight: bold;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        tbody td {
          background-color: transparent !important;
          color: white;
        }
      </style>
    `;

    const finalHtml = style + htmlPlan;

    // Save to MongoDB
    await MealPlan.create({
      name: userData.name,
      age: userData.age,
      gender: userData.gender,
      height: userData.height,
      weight: userData.weight,
      goal: userData.goal,
      dietPreference: userData.dietPreference,
      health: userData.health || "None",
      htmlPlan: finalHtml,
    });

    return new Response(finalHtml, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error("Gemini API or DB error:", error);
    return new Response("<p>Failed to generate or save meal plan.</p>", {
      status: 500,
      headers: { "Content-Type": "text/html" },
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
