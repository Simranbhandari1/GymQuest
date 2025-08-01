"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../components/organisms/Access/ProtectedRoute";
import LiquidChrome from "../components/organisms/LiquidChrome";

const API_KEY = "a234e1f792ec41c8831d7496a0ab33a6";

function MealsContent() {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const isCleanTitle = (title) => {
    const lowercaseTitle = title.toLowerCase();
    const badWords = ["beef", "pork", "bacon", "mutton"];
    return !badWords.some((word) => lowercaseTitle.includes(word));
  };

  const fetchMeals = async (search = "", offsetValue = 0, append = false) => {
    try {
      setLoading(true);

      let url = `https://api.spoonacular.com/recipes/complexSearch?query=salad&number=20&offset=${offsetValue}&addRecipeInformation=true&apiKey=${API_KEY}&excludeIngredients=beef`;

      if (search) {
        url += `+${encodeURIComponent(search)}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      const newMeals = (data.results || []).filter(
        (meal) =>
          isCleanTitle(meal.title) && meal.image && meal.image.trim() !== ""
      );

      setMeals(append ? [...meals, ...newMeals] : newMeals);
      setSelectedMeal(null);
    } catch (err) {
      console.error("Error fetching meals:", err);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

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
      {/* Liquid Chrome Background */}
      <div className="absolute inset-0 z-0">
        <LiquidChrome
          baseColor={[0.1, 0.2, 0.2]}
          speed={1}
          amplitude={0.7}
          interactive
        />
      </div>

      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0" />

      {/* Main Content */}
      <div className="relative z-10 p-6 w-full max-w-7xl">
        <h1 className="text-6xl font-bold mb-8 text-center">Healthy Salads</h1>

        {/* <div className="flex gap-2 justify-center mb-6">
          <input
            type="text"
            placeholder="Search for recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/10 border border-white/30 text-white px-4 py-2 rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Search
          </button>
        </div> */}

        {loading && (
          <p className="text-center text-gray-300">Loading...</p>
        )}

        {!selectedMeal && (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {meals.map((meal) => (
              <div
                key={meal.id}
                className="cursor-pointer bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-md hover:shadow-lg transition"
                onClick={() => setSelectedMeal(meal)}
              >
                <img
                  src={meal.image}
                  alt={meal.title}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-3">
                  <h2 className="text-lg font-semibold">{meal.title}</h2>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedMeal && (
          <div className="mt-6 p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg max-w-3xl mx-auto">
            <button
              onClick={() => setSelectedMeal(null)}
              className="mb-4 bg-gray-400 text-black hover:bg-gray-300 px-3 py-1 rounded"
            >
              ← Back
            </button>
            <h2 className="text-2xl font-bold mb-4 text-green-300">{selectedMeal.title}</h2>
            <img
              src={selectedMeal.image}
              alt={selectedMeal.title}
              className="w-full max-w-md mb-4 rounded"
            />
            <p
              dangerouslySetInnerHTML={{ __html: selectedMeal.summary }}
              className="mb-4 text-gray-300"
            />
            <a
              href={selectedMeal.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              View Full Recipe
            </a>
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

// 👇 Wrap with ProtectedRoute before export
export default function Meals() {
  return (
    <ProtectedRoute>
      <MealsContent />
    </ProtectedRoute>
  );
}
