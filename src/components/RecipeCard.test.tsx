import { render, screen } from "@testing-library/react";
import { RecipeCard } from "./RecipeCard";
import fallbackimg from "@/assets/images.png";

const mockRecipe = {
  strMeal: "Spaghetti Carbonara",
  strMealThumb: "https://example.com/spaghetti.jpg",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any; // Casting as any to avoid full Meal type complexity for now!!!!

//describe your test-case
describe("RecipeCard", () => {
  //Check for recipe name and image
  it("renders recipe name and image", () => {
    render(<RecipeCard recipe={mockRecipe} />);

    expect(
      screen.getByRole("heading", { name: /spaghetti carbonara/i })
    ).toBeInTheDocument();

    const image = screen.getByRole("img", { name: /spaghetti carbonara/i });
    expect(image).toHaveAttribute("src", mockRecipe.strMealThumb);
  });

  //Check for fallabck image usage
  it("uses fallback image when recipe image is missing", () => {
    const recipeWithoutImage = { ...mockRecipe, strMealThumb: "" };
    render(<RecipeCard recipe={recipeWithoutImage} />);

    const image = screen.getByRole("img", { name: /spaghetti carbonara/i });
    expect(image).toHaveAttribute("src", fallbackimg);
  });

  //check for accessibility(screen-readers)
  it("has accessible role and alt text", () => {
    render(<RecipeCard recipe={mockRecipe} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByAltText(/spaghetti carbonara/i)).toBeInTheDocument();
  });
});
