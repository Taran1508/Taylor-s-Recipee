import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock window.matchMedia for useIsMobile hook
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // vitest
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
});

// Create a fresh QueryClient for each test
function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

//describe your test-case
describe("Home Page Integration", () => {
  it("searches for a recipe, displays results, and opens recipe details", async () => {
    renderWithClient(<App />);

    // 1. Type into the search bar
    const searchInput = screen.getByPlaceholderText(
      /Search by ingredient or use filters.../i
    );
    fireEvent.change(searchInput, { target: { value: "chicken" } });

    // 2. Click search button (inside SearchBar)
    const searchButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchButton);

    // 3. Wait for all recipe results
    const recipeItems = await screen.findAllByText(
      /chicken/i,
      {},
      { timeout: 3000 }
    );
    expect(recipeItems.length).toBeGreaterThan(0);

    // 4. Click the first recipe to open modal
    const firstRecipe = recipeItems[0];
    const recipeName = firstRecipe.textContent;
    fireEvent.click(firstRecipe);

    // 5. Wait for modal to appear with recipe details
    const modalTitle = await screen.findByRole("heading", {
      name: new RegExp(recipeName || "", "i"),
    });
    expect(modalTitle).toBeInTheDocument();
  });
});
