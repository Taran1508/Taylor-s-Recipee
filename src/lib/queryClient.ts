import { QueryClient } from "@tanstack/react-query";

//QueryClient for caching
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes window (customize it based on requiremnt)
      retry: 2, // Retry failed requests twice (Resukting in total 3 Requests)
      refetchOnWindowFocus: true, // Auto refetch when window (tab) gains focus
    },
  },
});
