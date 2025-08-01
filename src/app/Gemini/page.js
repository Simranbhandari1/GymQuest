// 'use client';

// import { useState } from 'react';
// import toast, { Toaster } from 'react-hot-toast';

// export default function DietPlanner() {
//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     gender: '',
//     height: '',
//     weight: '',
//     goal: '',
//     dietPreference: '',
//     health: '',
//   });

//   const [loading, setLoading] = useState(false);
//   const [htmlResult, setHtmlResult] = useState('');

//   const isFormComplete = Object.entries(formData).every(([key, val]) => {
//     if (key === 'health') return true; // Optional
//     return val.trim() !== '';
//   });

//   const handleChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isFormComplete) {
//       toast.error('Please fill out all required fields!');
//       return;
//     }

//     setLoading(true);
//     setHtmlResult('');

//     try {
//       const response = await fetch('/api/Gemini/ask', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userData: formData }),
//       });

//       const html = await response.text();
//       setHtmlResult(html);
//       toast.success('Diet plan generated!');
//     } catch (error) {
//       console.error('Error generating plan:', error);
//       toast.error('Failed to generate diet plan.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSave = () => {
//     const blob = new Blob([htmlResult], { type: 'text/html' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'weekly_diet_plan.html';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     toast.success('Diet plan saved!');
//   };

//   return (
//     <main className="min-h-screen py-12 px-4 md:px-12 bg-gradient-to-br from-blue-100 to-purple-200 overflow-x-hidden">
//       <Toaster />
//       <div className="flex flex-col md:flex-row justify-center gap-10">
//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white shadow-xl p-8 mt-20 rounded-2xl w-full md:w-[40%]"
//         >
//           <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
//             Personalized Diet Plan
//           </h2>

//           {[
//             { label: 'Name', field: 'name' },
//             { label: 'Age', field: 'age', type: 'number' },
//             {
//               label: 'Gender',
//               field: 'gender',
//               type: 'select',
//               options: ['Male', 'Female', 'Other']
//             },
//             { label: 'Height (cm)', field: 'height', type: 'number' },
//             { label: 'Weight (kg)', field: 'weight', type: 'number' },
//             {
//               label: 'Fitness Goal',
//               field: 'goal',
//               type: 'select',
//               options: [
//                 'Weight Loss',
//                 'Muscle Gain',
//                 'Maintenance',
//                 'Improve Endurance',
//                 'Boost Immunity',
//                 'Body Toning'
//               ]
//             },
//             {
//               label: 'Diet Preference',
//               field: 'dietPreference',
//               type: 'select',
//               options: ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Eggetarian']
//             },
//             { label: 'Any health problems? (optional)', field: 'health' },
//           ].map(({ label, field, type = 'text', options }) => (
//             <div key={field} className="flex flex-col mb-4">
//               <label htmlFor={field} className="text-sm font-semibold text-gray-700 mb-1">
//                 {label}
//               </label>
//               {type === 'select' ? (
//                 <select
//                   id={field}
//                   value={formData[field]}
//                   onChange={(e) => handleChange(field, e.target.value)}
//                   className="border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   disabled={loading}
//                 >
//                   <option value="">Select</option>
//                   {options.map(option => (
//                     <option key={option} value={option}>{option}</option>
//                   ))}
//                 </select>
//               ) : (
//                 <input
//                   id={field}
//                   type={type}
//                   value={formData[field]}
//                   onChange={(e) => handleChange(field, e.target.value)}
//                   className="border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   disabled={loading}
//                 />
//               )}
//             </div>
//           ))}

//           <button
//             type="submit"
//             disabled={!isFormComplete || loading}
//             className="bg-purple-600 text-white w-full py-2 rounded-lg hover:bg-purple-700 transition disabled:bg-purple-300 font-semibold mt-4"
//           >
//             {loading ? 'Generating...' : 'Generate Plan'}
//           </button>
//         </form>

//         {/* Diet Plan Display */}
//        {/* Diet Plan Display */}
// {htmlResult && (
//   <div className="bg-white shadow-2xl mt-20 rounded-3xl p-6 w-full md:w-[60%]">
//     <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
//       Your Weekly Diet Plan
//     </h2>
//     <div className="rounded-xl overflow-hidden border-4 border-purple-300 shadow-lg">
//       <iframe
//         title="Weekly Diet Plan"
//         srcDoc={htmlResult}
//         sandbox="allow-scripts allow-same-origin"
//         className="w-full h-[75vh] bg-white rounded-xl border-none"
//         style={{
//           // scrollbarWidth: 'thin',
//           // scrollbarColor: '#a78bfa #f3f4f6',
//         }}
//       />
//     </div>

//     {/* Save Button Centered */}
//     <div className="flex justify-center mt-6">
//       <button
//         onClick={handleSave}
//         className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 shadow-md transition duration-300"
//       >
//         Save Diet Plan
//       </button>
//     </div>
//   </div>
// )}

//       </div>
//     </main>
//   );
// }
'use client';

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import LiquidChrome from '../components/organisms/LiquidChrome';
import ProtectedRoute from '../components/organisms/Access/ProtectedRoute';

export default function DietPlanner() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    goal: '',
    dietPreference: '',
    health: '',
  });

  const [loading, setLoading] = useState(false);
  const [htmlResult, setHtmlResult] = useState('');
  const [showForm, setShowForm] = useState(true);

  const isFormComplete = Object.entries(formData).every(([key, val]) => {
    if (key === 'health') return true;
    return val.trim() !== '';
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormComplete) {
      toast.error('Please fill out all required fields!');
      return;
    }

    setLoading(true);
    setHtmlResult('');

    try {
      const response = await fetch('/api/Gemini/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userData: formData }),
      });

      const html = await response.text();
      setHtmlResult(html);
      setShowForm(false);
      toast.success('Diet plan generated!');
    } catch (error) {
      console.error('Error generating plan:', error);
      toast.error('Failed to generate diet plan.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveHTMLDownload = () => {
    if (!htmlResult) {
      toast.error("Nothing to download.");
      return;
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Diet Plan for ${formData.name}</title>
  <style>
    body {
      font-family: sans-serif;
      background-color: #1f2937;
      color: #ffffff;
      padding: 20px;
    }
    h1, h2 {
      color: #10b981;
      text-align: center;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background-color: #111827;
      color: #ffffff;
    }
    th, td {
      border: 1px solid #374151;
      padding: 12px;
      text-align: center;
    }
    thead {
      background-color: #10b981;
    }
    tr:nth-child(even) {
      background-color: #1f2937;
    }
  </style>
</head>
<body>
  <h1>Diet Plan for ${formData.name}</h1>
  <h2>Your Weekly Meal Planner</h2>
  ${htmlResult}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Diet_Plan_${formData.name.replace(/\s+/g, '_')}.html`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success('Diet plan is saved!');
  };

  return (
    <ProtectedRoute>
      <main className="relative bg-gradient-to-b mt-20 from-black via-[#0f3e3b] to-black min-h-screen flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <LiquidChrome baseColor={[0.1, 0.2, 0.2]} speed={1} amplitude={0.7} interactive />
        </div>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0" />

        <Toaster />

        <div className="relative z-10 flex flex-col items-center w-full max-w-6xl px-6 mt-12 mb-12">
          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-8 w-full md:w-[60%]"
            >
              <h2 className="text-3xl font-bold text-center text-white mb-6">
                Personalized Diet Plan
              </h2>

              {[ // Form Fields
                { label: 'Name', field: 'name' },
                { label: 'Age', field: 'age', type: 'number' },
                {
                  label: 'Gender',
                  field: 'gender',
                  type: 'select',
                  options: ['Male', 'Female', 'Other'],
                },
                { label: 'Height (cm)', field: 'height', type: 'number' },
                { label: 'Weight (kg)', field: 'weight', type: 'number' },
                {
                  label: 'Fitness Goal',
                  field: 'goal',
                  type: 'select',
                  options: [
                    'Weight Loss',
                    'Muscle Gain',
                    'Maintenance',
                    'Improve Endurance',
                    'Boost Immunity',
                    'Body Toning',
                  ],
                },
                {
                  label: 'Diet Preference',
                  field: 'dietPreference',
                  type: 'select',
                  options: ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Eggetarian'],
                },
                { label: 'Any health problems? (optional)', field: 'health' },
              ].map(({ label, field, type = 'text', options }) => (
                <div key={field} className="flex flex-col mb-4">
                  <label htmlFor={field} className="text-sm font-semibold mb-1 text-white">
                    {label}
                  </label>
                  {type === 'select' ? (
                    <select
                      id={field}
                      value={formData[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="bg-white/80 text-black placeholder:Select border border-white/30 rounded-lg px-4 py-2"
                      disabled={loading}
                    >
                      <option value="">Select</option>
                      {options.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field}
                      type={type}
                      value={formData[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      placeholder={label}
                      className="bg-white/80 text-black border border-white/30 rounded-lg px-4 py-2"
                      disabled={loading}
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={!isFormComplete || loading}
                className="bg-purple-600 w-full py-2 rounded-lg hover:bg-purple-700 disabled:bg-purple-300 font-semibold mt-4"
              >
                {loading ? 'Generating...' : 'Generate Plan'}
              </button>
            </form>
          )}

          {htmlResult && (
            <div
              id="diet-pdf-section"
              className="mt-10 w-full max-w-4xl rounded-2xl shadow-xl border-2 border-gray-400 p-6 bg-gray-900/40 backdrop-blur-md text-white"
            >
              <h3 className="text-4xl font-extrabold text-center text-white mb-2">
                Diet Plan for {formData.name}
              </h3>

              <h2 className="text-3xl font-bold text-center text-green-400 mb-6">
                Your Weekly Meal Planner
              </h2>

              <div
                className="prose prose-invert max-w-none rounded-xl overflow-hidden"
                dangerouslySetInnerHTML={{ __html: htmlResult }}
              />

              <div className="flex justify-center mt-6">
                <button
                  onClick={handleSaveHTMLDownload}
                  className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 shadow-md transition duration-300"
                >
                  Save Diet
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}



// "use client";
// import { useState, useEffect, useRef } from "react";
// import toast from "react-hot-toast";

// export default function DietChat() {
//   const [messages, setMessages] = useState([
//     {
//       role: "bot",
//       text: "Hi! Let's get your weekly diet plan. First, what's your age?",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [step, setStep] = useState(1);
//   const [userData, setUserData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [dietPlan, setDietPlan] = useState("");
//   const messagesEndRef = useRef(null);
//   const recognitionRef = useRef(null);

//   const speak = (text) => {
//     if (typeof window !== "undefined" && "speechSynthesis" in window) {
//       const utterance = new SpeechSynthesisUtterance(text);
//       utterance.lang = "en-US";
//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   useEffect(() => {
//     speak(messages[0].text);
//   }, []);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const trimmedInput = input.trim().toLowerCase();
//     if (!trimmedInput) return;

//     // Validation
//     if (step === 1) {
//       const age = parseInt(trimmedInput);
//       if (isNaN(age) || age < 10 || age > 100) {
//         toast.error("Enter a valid age between 10–100.");
//         return;
//       }
//     } else if (step === 2) {
//       const weight = parseInt(trimmedInput);
//       if (isNaN(weight) || weight < 30) {
//         toast.error("Enter weight in kg (30+).");
//         return;
//       }
//     } else if (step === 3) {
//       const height = parseInt(trimmedInput);
//       if (isNaN(height) || height < 100) {
//         toast.error("Enter height in cm (100+).");
//         return;
//       }
//     } else if (step === 4) {
//       if (trimmedInput.length < 2) {
//         toast.error("Please specify a health condition or type 'none'.");
//         return;
//       }
//     } else if (step === 5) {
//       const validGoals = ["weight loss", "muscle gain", "maintenance"];
//       if (!validGoals.includes(trimmedInput)) {
//         toast.error("Goal must be: weight loss, muscle gain, or maintenance.");
//         return;
//       }
//     } else if (step === 6) {
//       const validDiets = ["vegetarian", "vegan", "keto", "none"];
//       if (!validDiets.includes(trimmedInput)) {
//         toast.error("Diet must be: vegetarian, vegan, keto, or none.");
//         return;
//       }
//     }

//     // Handle input
//     const newMessages = [...messages, { role: "user", text: input }];
//     setMessages(newMessages);
//     let nextBotMessage = "";
//     const updatedUserData = { ...userData };

//     if (step === 1) {
//       updatedUserData.age = trimmedInput;
//       nextBotMessage = "What's your weight in kg?";
//     } else if (step === 2) {
//       updatedUserData.weight = trimmedInput;
//       nextBotMessage = "What's your height in cm?";
//     } else if (step === 3) {
//       updatedUserData.height = trimmedInput;
//       nextBotMessage = "Any health problems? If none, type 'none'.";
//     } else if (step === 4) {
//       updatedUserData.health = trimmedInput;
//       nextBotMessage = "What's your goal? (weight loss, muscle gain, maintenance)";
//     } else if (step === 5) {
//       updatedUserData.goal = trimmedInput;
//       nextBotMessage = "Any diet preference? (vegetarian, vegan, keto, none)";
//     } else if (step === 6) {
//       updatedUserData.diet = trimmedInput;
//       nextBotMessage = "All set! Click 'Generate Plan' to get your weekly diet chart.";
//     }

//     setUserData(updatedUserData);
//     setMessages((prev) => [...prev, { role: "bot", text: nextBotMessage }]);
//     speak(nextBotMessage);
//     setInput("");
//     setStep(step + 1);
//   };

//   const generatePlan = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/Gemini/ask", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//       });

//       const data = await res.json();

//       if (data.dietPlan) {
//         setDietPlan(data.dietPlan);
//         setMessages((prev) => [...prev, { role: "bot", text: data.dietPlan }]);
//         speak("Here is your personalized diet plan.");
//       } else {
//         toast.error("Could not generate plan.");
//       }
//     } catch (err) {
//       console.error("Plan generation failed:", err);
//       toast.error("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startListening = () => {
//     if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
//       if (recognitionRef.current) recognitionRef.current.abort();
//       const recognition = new window.webkitSpeechRecognition();
//       recognition.lang = "en-US";
//       recognition.interimResults = false;
//       recognition.maxAlternatives = 1;

//       recognition.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         setInput(transcript);
//       };
//       recognition.onerror = (event) => {
//         console.error("Speech recognition error:", event.error);
//       };
//       recognition.start();
//       recognitionRef.current = recognition;
//     } else {
//       toast.error("Speech recognition not supported.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-100">
//       <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6">
//         <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
//           🥗 Personalized Diet Assistant
//         </h2>

//         <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50 rounded-lg border border-gray-200">
//           {messages.map((msg, i) => (
//             <div key={i} className={`flex ${msg.role === "bot" ? "justify-start" : "justify-end"}`}>
//               <div
//                 className={`px-4 py-2 rounded-lg max-w-xs ${
//                   msg.role === "bot" ? "bg-indigo-100 text-indigo-900" : "bg-green-100 text-green-900"
//                 }`}
//               >
//                 <span className="block text-sm">{msg.text}</span>
//               </div>
//             </div>
//           ))}
//           <div ref={messagesEndRef}></div>
//         </div>

//         {step <= 6 && (
//           <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
//             <input
//               className="flex-1 px-4 py-2 text-black rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type or use mic..."
//               required
//             />
//             <button
//               type="button"
//               onClick={startListening}
//               className="bg-yellow-400 px-4 py-2 rounded-lg text-white hover:bg-yellow-500 transition"
//               title="Speak"
//             >
//               🎤
//             </button>
//             <button
//               type="submit"
//               className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
//             >
//               ➤
//             </button>
//           </form>
//         )}

//         {step > 6 && (
//           <div className="mt-6 text-center">
//             <button
//               onClick={generatePlan}
//               disabled={loading || dietPlan}
//               className={`px-6 py-2 rounded-lg text-white font-semibold transition ${
//                 loading || dietPlan ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
//               }`}
//             >
//               {loading ? "Generating..." : "Generate Plan"}
//             </button>
//           </div>
//         )}

//         {dietPlan && (
//           <div className="mt-6 bg-white p-4 rounded shadow text-black whitespace-pre-wrap">
//             <h2 className="text-lg font-bold mb-2">Your 7-Day Diet Plan:</h2>
//             <pre>{dietPlan}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





