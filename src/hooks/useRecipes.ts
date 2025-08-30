import { fetchRecipes } from "@/api/recipes";
import { useQuery } from "@tanstack/react-query";

//Hook to fetch recipes
export function useRecipes(ingredient: string, category: string, area: string) {
  return useQuery({
    queryKey: ["recipes", ingredient, category, area],
    queryFn: () => fetchRecipes(ingredient, category, area),
    enabled: !!ingredient || !!category || !!area, // Only run when at least one filter is set
  });
}
