import type { Meal } from "@/types/meal";
import EmptyState from "./EmptyState";
import Loader from "./Loader";
import { RecipeCard } from "./RecipeCard";

interface RecipeGridProps {
  isLoading: boolean;
  isError: boolean;
  recipes: Meal[] | undefined;
  ingredient: string;
  onRetry: () => void;
  onRecipeClick: (recipe: Meal) => void;
}

export const RecipeGrid = ({
  isLoading,
  isError,
  recipes,
  ingredient,
  onRetry,
  onRecipeClick,
}: RecipeGridProps) => {
  //render loader when fetching recipes
  if (isLoading) return <Loader />;

  //render when failed to fetch recipes
  if (isError)
    return <EmptyState message="Failed to fetch recipes" onRetry={onRetry} />;

  //render when no recipes found
  if (!recipes || recipes.length === 0) {
    return (
      <EmptyState
        message={
          ingredient
            ? `No recipes found for "${ingredient}". Try a different ingredient!`
            : "What's in your mind today?"
        }
      />
    );
  }

  return (
    <>
      <div className={`ml-4 font-bold`}>Results:</div>
      <div
        role="list"
        aria-label="Recipes results"
        className="grid grid-cols-2  md:grid-cols-3 gap-4 p-4 mb-16"
      >
        {
          //render after fetching recipes
          recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              role="listitem"
              tabIndex={0}
              aria-labelledby={`recipe-title-${recipe.idMeal}`}
              onClick={() => onRecipeClick(recipe)}
            >
              <RecipeCard recipe={recipe} />
            </div>
          ))
        }
      </div>
    </>
  );
};
