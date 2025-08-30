import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { RecipeGrid } from "./RecipeGrid";
import type { Meal } from "@/types/meal";

const mockRecipes: Meal[] = [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { idMeal: "1", strMeal: "Pizza", strMealThumb: "pizza.jpg" } as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { idMeal: "2", strMeal: "Pasta", strMealThumb: "pasta.jpg" } as any,
];

//describe your test-case
describe("RecipeGrid", () => {
  //Check for loader rendering
  it("renders loader when loading", () => {
    render(
      <RecipeGrid
        isLoading={true}
        isError={false}
        recipes={undefined}
        ingredient=""
        onRetry={vi.fn()}
        onRecipeClick={vi.fn()}
      />
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  //check error state with retry option
  it("renders error state with retry option", () => {
    const onRetry = vi.fn();
    render(
      <RecipeGrid
        isLoading={false}
        isError={true}
        recipes={undefined}
        ingredient=""
        onRetry={onRetry}
        onRecipeClick={vi.fn()}
      />
    );
    expect(screen.getByText(/failed to fetch recipes/i)).toBeInTheDocument();
  });

  //check for empty state when no recipes and no ingredient
  it("renders empty state when no recipes and no ingredient", () => {
    render(
      <RecipeGrid
        isLoading={false}
        isError={false}
        recipes={[]}
        ingredient=""
        onRetry={vi.fn()}
        onRecipeClick={vi.fn()}
      />
    );
    expect(
      screen.getByText(/what's in your mind today\?/i)
    ).toBeInTheDocument();
  });

  //check for empty state with ingredient message
  it("renders empty state with ingredient message", () => {
    render(
      <RecipeGrid
        isLoading={false}
        isError={false}
        recipes={[]}
        ingredient="chicken"
        onRetry={vi.fn()}
        onRecipeClick={vi.fn()}
      />
    );
    expect(
      screen.getByText(/no recipes found for "chicken"/i)
    ).toBeInTheDocument();
  });

  //check for recipe cards when recipes are available
  it("renders recipe cards when recipes are available", () => {
    render(
      <RecipeGrid
        isLoading={false}
        isError={false}
        recipes={mockRecipes}
        ingredient=""
        onRetry={vi.fn()}
        onRecipeClick={vi.fn()}
      />
    );

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText(/pizza/i)).toBeInTheDocument();
    expect(screen.getByText(/pasta/i)).toBeInTheDocument();
  });

  //check for triggers onRecipeClick when a recipe is clicked
  it("triggers onRecipeClick when a recipe is clicked", () => {
    const onRecipeClick = vi.fn();
    render(
      <RecipeGrid
        isLoading={false}
        isError={false}
        recipes={mockRecipes}
        ingredient=""
        onRetry={vi.fn()}
        onRecipeClick={onRecipeClick}
      />
    );

    fireEvent.click(screen.getByText(/pizza/i));
    expect(onRecipeClick).toHaveBeenCalledWith(mockRecipes[0]);
  });
});
