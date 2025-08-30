// src/components/RecipeCard.tsx
import React from "react";
import fallbackimg from "@/assets/images.png";
import type { Meal } from "@/types/meal";

interface RecipeCardProps {
  recipe: Meal;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    // RecipeCard
    <div
      role="dialog"
      aria-modal="true"
      className="border cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <img
        src={recipe.strMealThumb || fallbackimg}
        alt={recipe.strMeal}
        loading="lazy" //lazy loaded
        className="w-full h-32 object-cover"
      />
      <div className="p-2">
        <h3 className="text-sm font-semibold line-clamp-2">{recipe.strMeal}</h3>
      </div>
    </div>
  );
};
