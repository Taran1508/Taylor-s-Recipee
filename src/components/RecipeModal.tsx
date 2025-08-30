// src/components/RecipeModal.tsx
import React, { useEffect, useRef, useState } from "react";
import type { Meal } from "@/types/meal";

interface RecipeModalProps {
  recipe: Meal;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  const [details, setDetails] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Fetch Individual recipee
  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/lookup.php?i=${recipe.idMeal}`
        );
        if (!res.ok) throw new Error("Failed to fetch recipe details");
        const data = await res.json();
        setDetails(data.meals?.[0] || null);
      } catch {
        setError("Failed to load details");
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [recipe.idMeal]);

  //Loading screen
  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="bg-white p-6 rounded shadow-lg">Loading...</div>
      </div>
    );
  }

  //handle error
  if (error || !details) {
    return (
      <div
        role="alert"
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="bg-white p-6 rounded shadow-lg">
          <p>{error || "No details found."}</p>
          <button
            onClick={onClose}
            className="mt-4 bg-blue-600 text-white px-3 py-1 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const ingredients = extractIngredients(details);

  return (
    //Render Modal
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${details.strMealThumb || "/fallback.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-[hsl(var(--background))] p-6 rounded-lg max-w-lg w-full overflow-auto max-h-[90vh]">
        <div className="flex flex-row justify-between items-start">
          <h2 id="modal-title" className="text-2xl font-bold mb-2">
            {details.strMeal}
          </h2>
          <button
            ref={closeButtonRef}
            aria-label="Close modal"
            onClick={onClose}
            className="text-red-600 hover:text-gray-900 transition cursor-pointer"
          >
            ❌
          </button>
        </div>
        <img
          src={details.strMealThumb}
          alt={details.strMeal}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <p id="modal-desc" className="mb-4 whitespace-pre-line">
          {details.strInstructions}
        </p>

        <h3 className="font-semibold mb-2">Ingredients</h3>
        <ul className="list-disc ml-6 mb-4">
          {ingredients.map((item, idx) => (
            <li key={idx}>
              {item.ingredient} — {item.measure}
            </li>
          ))}
        </ul>

        {details.strSource && (
          <a
            href={details.strSource}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline mr-4"
          >
            Source
          </a>
        )}
        {details.strYoutube && (
          <a
            href={details.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 underline"
          >
            Video
          </a>
        )}
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractIngredients(meal: any) {
  //function to extract Ingredients
  const list: { ingredient: string; measure: string }[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      list.push({ ingredient, measure: measure?.trim() || "" });
    }
  }

  return list;
}

export default RecipeModal;
