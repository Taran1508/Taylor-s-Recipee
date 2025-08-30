import type { Meal } from "@/types/meal";

const API_URL = import.meta.env.VITE_API_URL;

//function to fecth recipes
export async function fetchRecipes(
  ingredient: string,
  category: string,
  area: string
): Promise<Meal[]> {
  let url = "";

  //conditional API hit
  if (ingredient) {
    url = `${API_URL}/filter.php?i=${ingredient}`;
  } else if (category) {
    url = `${API_URL}/filter.php?c=${category}`;
  } else if (area) {
    url = `${API_URL}/filter.php?a=${area}`;
  } else {
    return [];
  }

  //handle the response
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch recipes");

  const data = await response.json();
  return data.meals || [];
}
