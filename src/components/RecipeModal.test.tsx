import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import RecipeModal from "./RecipeModal";
import type { Meal } from "@/types/meal";

// Sample recipe input
const mockRecipe: Meal = {
  idMeal: "12345",
  strMeal: "Test Recipe",
  strMealThumb: "https://test.com/image.jpg",
  // add other required Meal fields as empty or null if needed
} as Meal;

describe("RecipeModal", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  //check for loading state initially
  it("shows loading state initially", () => {
    global.fetch = vi.fn(
      () => new Promise(() => {}) // never resolves
    ) as unknown as typeof fetch;

    render(<RecipeModal recipe={mockRecipe} onClose={vi.fn()} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  //check for error message when fetch fails
  it("displays error message when fetch fails", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as unknown as typeof fetch;

    render(<RecipeModal recipe={mockRecipe} onClose={vi.fn()} />);
    await waitFor(() => {
      expect(screen.getByText(/failed to load details/i)).toBeInTheDocument();
    });
  });

  //check for recipe details rendering when fetch succeeds
  it("renders recipe details when fetch succeeds", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            meals: [
              {
                idMeal: "12345",
                strMeal: "Loaded Recipe",
                strMealThumb: "https://test.com/meal.jpg",
                strInstructions: "Step 1: Do something.",
                strIngredient1: "Chicken",
                strMeasure1: "200g",
              },
            ],
          }),
      })
    ) as unknown as typeof fetch;

    render(<RecipeModal recipe={mockRecipe} onClose={vi.fn()} />);
    expect(await screen.findByText("Loaded Recipe")).toBeInTheDocument();
    expect(screen.getByText("Chicken — 200g")).toBeInTheDocument();
  });

  //check for onClose calls when close button is clicked
  it("calls onClose when close button is clicked", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            meals: [
              {
                idMeal: "12345",
                strMeal: "Loaded Recipe",
              },
            ],
          }),
      })
    ) as unknown as typeof fetch;

    const handleClose = vi.fn();
    render(<RecipeModal recipe={mockRecipe} onClose={handleClose} />);
    await screen.findByText("Loaded Recipe");

    const closeBtn = screen.getByRole("button", { name: /close modal/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
