import { render, screen, fireEvent } from "@testing-library/react";
import FiltersPanel from "./FiltersPanel";

// Mock the useIsMobile hook
vi.mock("@/hooks/useMobile", () => ({
  useIsMobile: () => false, // default to desktop
}));

//describe your test-case
describe("FiltersPanel", () => {
  //test for category and area filter rendering
  test("renders category and area filters", () => {
    render(
      <FiltersPanel
        category=""
        setCategory={() => {}}
        area=""
        setArea={() => {}}
      />
    );

    expect(screen.getByDisplayValue("All Categories")).toBeInTheDocument();
    expect(screen.getByDisplayValue("All Areas")).toBeInTheDocument();
  });

  //test for setCategory and setArea calls when values chnage
  test("calls setCategory and setArea when values change", () => {
    const setCategoryMock = vi.fn();
    const setAreaMock = vi.fn();

    render(
      <FiltersPanel
        category=""
        setCategory={setCategoryMock}
        area=""
        setArea={setAreaMock}
      />
    );

    fireEvent.change(screen.getByDisplayValue("All Categories"), {
      target: { value: "Dessert" },
    });
    expect(setCategoryMock).toHaveBeenCalledWith("Dessert");

    fireEvent.change(screen.getByDisplayValue("All Areas"), {
      target: { value: "Indian" },
    });
    expect(setAreaMock).toHaveBeenCalledWith("Indian");
  });
});
