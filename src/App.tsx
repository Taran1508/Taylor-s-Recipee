import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { RecipeGrid } from "./components/RecipeGrid";
import FiltersPanel from "./components/FiltersPanel";
import RecipeModal from "./components/RecipeModal";
import { useRecipes } from "./hooks/useRecipes"; // Make sure this exists
import type { Meal } from "./types/meal";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import FoodImageCircles from "./components/FoodImageCircle";
import { useIsMobile } from "./hooks/useMobile";
import Footer from "./components/Footer";

function App() {
  const isMobile = useIsMobile();
  const [ingredient, setIngredient] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Meal | null>(null);

  // Fetch recipes using your custom hook
  const {
    data: recipes,
    isLoading,
    isError,
    refetch,
  } = useRecipes(ingredient, category, area);

  return (
    <>
      <div className="min-h-screen gradient-hero bg-fixed">
        <Navigation />
        {/* Main Content */}
        <div className="px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}
            >
              {/* Left Side - Content */}
              <div
                className={`"space-y-8" ${isMobile ? "mt-30 mb-36" : "mt-30 mb-24"}`}
              >
                <HeroSection />
                {/* <ExamplePrompts /> */}
              </div>

              {/* Right Side - Food Images */}
              <div className="hidden lg:block">
                <FoodImageCircles />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recipee section */}
      <div
        className={`flex flex-col bg-[var(--background)] w-full p-8 mt-10 ${isMobile ? "" : ""}`}
      >
        {/* Search Bar */}
        <div className={`${isMobile ? "" : "ml-18"}`}>
          <h1
            className={`" font-bold montserrat-bold leading-tight " ${isMobile ? "text-3xl mb-5" : "text-5xl mb-10"}`}
          >
            <span
              className={`" font-bold text-[var(--textb)] cursive-text leading-tight" ${isMobile ? "text-4xl " : "text-7xl "}`}
            >
              Your next recipe
            </span>
            <br />
            Is just a search away.
          </h1>
          <SearchBar onSearch={setIngredient} />
          {/* Filters Panel */}
          <FiltersPanel
            category={category}
            setCategory={setCategory}
            area={area}
            setArea={setArea}
          />
        </div>

        {/* Recipe Grid */}
        <div className={` ${isMobile ? "mt-20 " : "mt-30"}`}>
          <RecipeGrid
            isLoading={isLoading}
            isError={isError}
            recipes={recipes}
            onRetry={refetch}
            ingredient={ingredient}
            onRecipeClick={(recipe) => setSelectedRecipe(recipe)}
          />
        </div>

        {/* Recipe Modal */}
        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
          />
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
