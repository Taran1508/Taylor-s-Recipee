import { render, screen, fireEvent } from "@testing-library/react";
import EmptyState from "./EmptyState";

//describe your test-case
describe("EmptyState", () => {
  //test when no data found.
  test("renders the message", () => {
    render(<EmptyState message="No data found" />);
    expect(screen.getByText(/No data found/i)).toBeInTheDocument();
  });

  //check for retry button when onRetry is provided
  test("renders retry button when onRetry is provided", () => {
    const onRetryMock = vi.fn();
    render(<EmptyState message="Something went wrong" onRetry={onRetryMock} />);

    const button = screen.getByRole("button", { name: /try again/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onRetryMock).toHaveBeenCalledTimes(1);
  });

  //check for retry button when onRetry is not provided
  test("does not render retry button when onRetry is not provided", () => {
    render(<EmptyState message="No items available" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
