import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi, describe, it, expect } from "vitest";
import { useRecipes } from "./useRecipes";
import { fetchRecipes } from "@/api/recipes";

// Mock API
vi.mock("@/api/recipes", () => ({
  fetchRecipes: vi.fn(),
}));

// Simple wrapper for React Query
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
);

//describe your test-case
describe("useRecipes", () => {
  //check when all filters are empty
  it("does not fetch when all filters are empty", () => {
    renderHook(() => useRecipes("", "", ""), { wrapper });

    expect(fetchRecipes).not.toHaveBeenCalled();
  });

  //check when ingredient is provided
  it("fetches when ingredient is provided", async () => {
    (fetchRecipes as vi.Mock).mockResolvedValueOnce([{ id: 1, name: "Pasta" }]);

    const { result } = renderHook(() => useRecipes("chicken", "", ""), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(fetchRecipes).toHaveBeenCalledWith("chicken", "", "");
    expect(result.current.data).toEqual([{ id: 1, name: "Pasta" }]);
  });

  //check for API error
  it("handles API error", async () => {
    (fetchRecipes as unknown as vi.Mock).mockRejectedValueOnce(
      new Error("API Error")
    );

    const { result } = renderHook(() => useRecipes("fish", "", ""), {
      wrapper: ({ children }) => (
        <QueryClientProvider
          client={
            new QueryClient({ defaultOptions: { queries: { retry: false } } })
          }
        >
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(Error);
  });
});
