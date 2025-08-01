"use client";
import { useState, useEffect } from "react";

export default function MealsPage() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9); // how many meals to show

  const fetchMeals = async (search = "") => {
    try {
      const url = search
        ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
        : `https://www.themealdb.com/api/json/v1/1/filter.php?c=Salad`; // only salads
      const res = await fetch(url);
      const data = await res.json();
      setMeals(data.meals || []);
      setVisibleCount(9); // reset count on new search
      setSelectedMeal(null);
    } catch (err) {
      console.error("Error fetching meals:", err);
      setMeals([]);
    }
  };

  const fetchMealDetails = async (id) => {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await res.json();
      if (data.meals && data.meals.length > 0) {
        setSelectedMeal(data.meals[0]);
      }
    } catch (err) {
      console.error("Error fetching meal details:", err);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <div className="p-8">
      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Search Healthy Meals"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        <button
          onClick={() => fetchMeals(query)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Search
        </button>
      </div>

      {/* Meal Detail View */}
      {selectedMeal ? (
        <div className="p-4 border rounded shadow">
          <img
            src={selectedMeal.strMealThumb}
            alt={selectedMeal.strMeal}
            className="w-full h-64 object-cover rounded mb-4"
          />
          <h2 className="text-2xl font-bold">{selectedMeal.strMeal}</h2>
          <p className="mt-2 text-sm whitespace-pre-line">
            {selectedMeal.strInstructions}
          </p>
          <button
            onClick={() => setSelectedMeal(null)}
            className="mt-4 text-blue-500 underline"
          >
            ← Back to Results
          </button>
        </div>
      ) : (
        <>
          {/* Meals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {meals.slice(0, visibleCount).map((meal) => (
              <div
                key={meal.idMeal}
                onClick={() => fetchMealDetails(meal.idMeal)}
                className="cursor-pointer border p-4 rounded shadow hover:shadow-lg transition"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-48 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold">{meal.strMeal}</h3>
              </div>
            ))}
          </div>

          {/* See More Button */}
          {visibleCount < meals.length && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 9)}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                See More Recipes
              </button>
            </div>
          )}
        </>
      )}

      {/* Attribution */}
      <div className="text-center text-xs text-gray-400 mt-12">
        Recipes from{" "}
        <a
          href="https://www.themealdb.com"
          className="text-blue-500"
          target="_blank"
        >
          TheMealDB
        </a>{" "}
        | Built with 💚 by Simran
      </div>
    </div>
  );
}
