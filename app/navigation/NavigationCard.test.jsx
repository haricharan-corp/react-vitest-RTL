import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import NavigationCard from "./NavigationCard";

// 1. Create a spy function for the push method
const mockPush = vi.fn();

// 2. Mock the module at the top level (Vitest automatically hoists this)
// Variable Naming Rule: Vitest automatically hoists vi.mock->must start with the prefix mock

// How Vitest handles it: vi.mock("next/navigation", ...) intercepts any import from next/navigation across the entire file.
//  Whenever NavigationCard.jsx executes useRouter(), Vitest substitutes it with our fake function that returns { push: mockPush }.
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("NavigationCard", () => {
  let user;
  // userEvent.setup(): Initializes a fresh userEvent
  beforeEach(() => {
    user = userEvent.setup();
    vi.clearAllMocks(); // Clear spy call history before each test
  });

  it("navigates to settings route when button is clicked", async () => {
    render(<NavigationCard />);

    // Click the navigation button
    const button = screen.getByRole("button", { name: /go to settings/i });
    await user.click(button);

    // Assert push was called exactly once with the expected route
    expect(mockPush).toHaveBeenCalledTimes(1);
    // Verifies that the correct route path was passed as an argument.
    expect(mockPush).toHaveBeenCalledWith("/dashboard/settings");
  });
});
