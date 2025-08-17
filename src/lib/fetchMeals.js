// app/lib/fetchMeals.js

export async function fetchMeals(query) {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&addRecipeInformation=true&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
  );

  if (!res.ok) throw new Error("Failed to fetch meals");

  const data = await res.json();
  return data.results;
}
