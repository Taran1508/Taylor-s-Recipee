//Meal Blueprint
export interface Meal {
  idMeal: string;
  strMeal?: string;
  strMealThumb: string;
  strCategory?: string; // optional because filter API may not always return it
  strArea?: string; // same like above
  strInstructions?: string; // for full recipe details
  strYoutube?: string; // video link if available
  strSource?: string; // external recipe source
}
