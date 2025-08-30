import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { SearchBar } from "./SearchBar";

// Mock the custom hook
vi.mock("@/hooks/useMobile", () => ({
  useIsMobile: () => false,
}));

//describe your test-case
describe("SearchBar", () => {
  //check for imput rendering
  it("renders the input", () => {
    render(<SearchBar onSearch={() => {}} />);
    const input = screen.getByPlaceholderText(/Search by ingredient/i);
    expect(input).toBeInTheDocument();
  });

  //check for value updates when typing
  it("updates value when typing", () => {
    render(<SearchBar onSearch={() => {}} />);
    const input = screen.getByPlaceholderText(/Search by ingredient/i);
    fireEvent.change(input, { target: { value: "chicken" } });
    expect(input).toHaveValue("chicken");
  });

  //check for debounces and calls onSearch after delay
  it("debounces and calls onSearch after delay", async () => {
    const onSearchMock = vi.fn();
    render(<SearchBar onSearch={onSearchMock} delay={300} />);
    const input = screen.getByPlaceholderText(/Search by ingredient/i);

    fireEvent.change(input, { target: { value: "chicken" } });

    // Wait for debounce (300ms)
    await waitFor(() => {
      expect(onSearchMock).toHaveBeenCalledWith("chicken");
    });
  });

  //check for input trim before calling onSearch
  it("trims input before calling onSearch", async () => {
    const onSearchMock = vi.fn();
    render(<SearchBar onSearch={onSearchMock} delay={200} />);
    const input = screen.getByPlaceholderText(/Search by ingredient/i);

    fireEvent.change(input, { target: { value: "  fish  " } });

    await waitFor(() => {
      expect(onSearchMock).toHaveBeenCalledWith("fish");
    });
  });
});
