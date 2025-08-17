"use client";

import { useEffect, useState, useCallback } from "react";
import ProtectedRoute from "../components/organisms/Access/ProtectedRoute";
import LiquidChrome from "../components/organisms/LiquidChrome";
import DOMPurify from "dompurify";
import Image from "next/image"; // ✅ use Next.js Image

const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_KEY; 
const FALLBACK_IMAGE = "/images/default-salad.jpg";

function MealsContent() {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const isCleanTitle = (title) => {
    const badWords = ["beef", "pork", "bacon", "mutton"];
    return !badWords.some((word) => title.toLowerCase().includes(word));
  };

  // ✅ Memoize fetchMeals with useCallback
  const fetchMeals = useCallback(async (search = "", offsetValue = 0, append = false) => {
    try {
      setLoading(true);
      setNoResults(false);

      const query = search.trim() || "salad";
      const url = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
        query
      )}&number=20&offset=${offsetValue}&addRecipeInformation=true&apiKey=${API_KEY}&excludeIngredients=beef`;

      const res = await fetch(url);
      const data = await res.json();

      const filteredMeals = (data.results || []).filter(
        (meal) =>
          isCleanTitle(meal.title) &&
          meal.summary?.trim() &&
          meal.image?.trim()
      );

      if (filteredMeals.length === 0) setNoResults(true);

      setMeals(append ? [...meals, ...filteredMeals] : filteredMeals);
      setSelectedMeal(null);
    } catch (err) {
      console.error("Error fetching meals:", err);
      setMeals([]);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  }, [meals]); // ✅ dependency added

  const fetchMealDetails = async (mealId) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.spoonacular.com/recipes/${mealId}/information?apiKey=${API_KEY}`
      );
      const data = await res.json();
      setSelectedMeal(data);
    } catch (err) {
      console.error("Error fetching meal details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setHasMounted(true);
    fetchMeals();
  }, [fetchMeals]); // ✅ added dependency

  if (!hasMounted) return null;

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
    <main className="relative bg-black min-h-screen mt-24 text-white flex items-center justify-center overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        <LiquidChrome baseColor={[0.1, 0.2, 0.2]} speed={1} amplitude={0.7} interactive />
      </div>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0" />

      <div className="relative z-10 p-6 w-full max-w-7xl">
        <h1 className="text-6xl font-extrabold font-serif text-amber-300 mb-8 text-center drop-shadow-lg">
          Healthy Salads
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search salads..."
            className="px-4 py-2 w-full max-w-md rounded-l-full bg-gray-800 border border-emerald-400 text-white focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 rounded-r-full bg-emerald-500 text-white hover:bg-emerald-600"
          >
            Search
          </button>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white/10 rounded-xl h-72"></div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && noResults && (
          <div className="text-center text-red-400 text-xl mt-10">
            No meals found. Try another search!
          </div>
        )}

        {/* Meals Grid */}
        {!loading && !selectedMeal && meals.length > 0 && (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {meals.map((meal) => (
              <div
                key={meal.id}
                className="relative cursor-pointer overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-md hover:shadow-lg transition"
                onClick={() => fetchMealDetails(meal.id)}
              >
                <Image
                  src={meal.image}
                  alt={meal.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="absolute top-0 left-0 w-full h-48 bg-amber-900/30 rounded-t-xl" />
                <div className="p-3">
                  <h2 className="text-lg text-white">{meal.title}</h2>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Meal Details */}
        {selectedMeal && (
          <div className="mt-6 p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg max-w-3xl mx-auto text-center">
            <div className="flex justify-start mb-4">
              <button
                onClick={() => setSelectedMeal(null)}
                className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded shadow"
              >
                ← Back
              </button>
            </div>

            <h2 className="text-3xl mb-4 text-green-300">{selectedMeal.title}</h2>

            <Image
              src={selectedMeal.image?.trim() ? selectedMeal.image : FALLBACK_IMAGE}
              alt={selectedMeal.title}
              width={600}
              height={400}
              className="mx-auto mb-6 rounded-lg shadow-lg max-h-[400px] object-cover"
            />

            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  selectedMeal.summary?.replace(/<b>|<\/b>/g, "") || ""
                ),
              }}
              className="mb-8 text-gray-100 text-left tracking-wide leading-7 text-[1.05rem] font-sans font-normal"
            />

            {/* Instructions */}
            <div className="text-white text-left">
              <h3 className="text-xl mb-2 text-emerald-400">Instructions:</h3>
              {selectedMeal.analyzedInstructions?.[0]?.steps?.length > 0 ? (
                <ol className="list-decimal list-inside space-y-2">
                  {selectedMeal.analyzedInstructions[0].steps.map((step) => (
                    <li key={step.number}>{step.step}</li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-400">Instructions not available.</p>
              )}
            </div>

            {/* Ingredients */}
            {selectedMeal.extendedIngredients?.length > 0 && (
              <div className="text-white text-left mt-6">
                <h3 className="text-xl mb-2 text-emerald-400">Ingredients:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-200">
                  {selectedMeal.extendedIngredients.map((ing) => (
                    <li key={ing.id}>{ing.original}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Load More */}
        {!selectedMeal && meals.length > 0 && !loading && (
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

export default function Meals() {
  return (
    <ProtectedRoute>
      <MealsContent />
    </ProtectedRoute>
  );
}
