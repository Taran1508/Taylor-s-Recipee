import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./index.css";
import App from "./App.tsx";
import { queryClient } from "./lib/queryClient.ts";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/*Query Client */}
    <QueryClientProvider client={queryClient}>
      {/*Theme provider */}
      <ThemeProvider>
        {/*To Find Runtime Errors */}
        <ErrorBoundary>
          {/*Entry Point */}
          <App />
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
