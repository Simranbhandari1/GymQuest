"use client";

import { useEffect, useState, useCallback } from "react";
import ProtectedRoute from "../components/organisms/Access/ProtectedRoute";
import LiquidChrome from "../components/organisms/LiquidChrome";
import Image from "next/image";

const API_KEY = "a234e1f792ec41c8831d7496a0ab33a6";
const FALLBACK_IMAGE = "/images/default-salad.jpg";

function MealsContent() {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [mealInstructions, setMealInstructions] = useState(null); // ✅ store steps
  const [searchQuery, setSearchQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const isCleanTitle = (title) => {
    const lowercaseTitle = title.toLowerCase();
    const badWords = ["beef", "pork", "bacon", "mutton"];
    return !badWords.some((word) => lowercaseTitle.includes(word));
  };

  const fetchMeals = useCallback(async (search = "", offsetValue = 0, append = false) => {
    try {
      setLoading(true);

      let url = `https://api.spoonacular.com/recipes/complexSearch?query=salad&number=20&offset=${offsetValue}&addRecipeInformation=true&apiKey=${API_KEY}&excludeIngredients=beef`;

      if (search) {
        url += `+${encodeURIComponent(search)}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      const newMeals = (data.results || []).filter(
        (meal) => isCleanTitle(meal.title) && meal.image && meal.image.trim() !== ""
      );

      setMeals((prevMeals) => (append ? [...prevMeals, ...newMeals] : newMeals));
      setSelectedMeal(null);
      setMealInstructions(null);
    } catch (err) {
      console.error("Error fetching meals:", err);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ fetch detailed instructions when meal is selected
  const fetchMealDetails = async (mealId) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.spoonacular.com/recipes/${mealId}/information?includeNutrition=false&apiKey=${API_KEY}`
      );
      const data = await res.json();
      setMealInstructions(data.analyzedInstructions?.[0]?.steps || []);
    } catch (err) {
      console.error("Error fetching meal details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const handleSearch = () => {
    setOffset(0);
    fetchMeals(searchQuery, 0, false);
  };

  const loadMore = () => {
    const newOffset = offset + 20;
    setOffset(newOffset);
    fetchMeals(searchQuery, newOffset, true);
  };

  return (
    <main className="relative bg-black min-h-screen mt-22 text-white flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <LiquidChrome baseColor={[0.1, 0.2, 0.2]} speed={1} amplitude={0.7} interactive />
      </div>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0" />

      <div className="relative z-10 p-6 w-full max-w-7xl">
        <h1 className="text-6xl font-bold mb-8 text-center">Healthy Salads</h1>

        {loading && <p className="text-center text-gray-300">Loading...</p>}

        {/* ✅ Show meal grid */}
        {!selectedMeal && (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {meals.map((meal) => (
              <div
                key={meal.id}
                className="cursor-pointer bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-md hover:shadow-lg transition"
                onClick={() => {
                  setSelectedMeal(meal);
                  fetchMealDetails(meal.id); // ✅ fetch steps
                }}
              >
                <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
                  <Image
                    src={meal.image || FALLBACK_IMAGE}
                    alt={meal.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-3">
                  <h2 className="text-lg font-semibold">{meal.title}</h2>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Selected meal with instructions */}
        {selectedMeal && (
          <div className="mt-6 p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg max-w-3xl mx-auto">
            <button
              onClick={() => {
                setSelectedMeal(null);
                setMealInstructions(null);
              }}
              className="mb-4 bg-gray-400 text-black hover:bg-gray-300 px-3 py-1 rounded"
            >
              ← Back
            </button>
            <h2 className="text-2xl font-bold mb-4 text-green-300">{selectedMeal.title}</h2>
            <div className="relative w-full max-w-md h-64 mb-4 rounded overflow-hidden mx-auto">
              <Image
                src={selectedMeal.image || FALLBACK_IMAGE}
                alt={selectedMeal.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <p
              dangerouslySetInnerHTML={{ __html: selectedMeal.summary }}
              className="mb-4 text-gray-300"
            />

            {/* ✅ Instructions appear here */}
            {mealInstructions && mealInstructions.length > 0 ? (
              <div className="mt-4 text-left">
                <h3 className="text-xl font-semibold mb-2 text-yellow-300">Recipe Steps:</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  {mealInstructions.map((step) => (
                    <li key={step.number} className="text-gray-200">
                      {step.step}
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <p className="text-gray-400">No detailed steps available.</p>
            )}
          </div>
        )}

        {!selectedMeal && meals.length > 0 && (
          <div className="text-center mt-6">
            <button
              onClick={loadMore}
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

// ✅ Protected wrapper
export default function Meals() {
  return (
    <ProtectedRoute>
      <MealsContent />
    </ProtectedRoute>
  );
}
