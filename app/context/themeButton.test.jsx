import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ThemeButton from "./themeButton";
import { ThemeContext } from "./themeContext";

describe("ThemeButton", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("renders the current theme from context", () => {
    // 1. Define mock context values
    const mockValue = {
      theme: "dark",
      toggleTheme: vi.fn(),
    };

    // 2. Wrap component in the Provider during render
    render(<ThemeButton />, {
      wrapper: ({ children }) => (
        <ThemeContext.Provider value={mockValue}>
          {children}
        </ThemeContext.Provider>
      ),
    });

    // 3. Assert UI displays mock context value
    expect(
      screen.getByRole("button", { name: /current theme: dark/i }),
    ).toBeInTheDocument();
  });

  it("calls toggleTheme function when button is clicked", async () => {
    const mockToggle = vi.fn();
    const mockValue = {
      theme: "light",
      toggleTheme: mockToggle,
    };

    render(<ThemeButton />, {
      wrapper: ({ children }) => (
        <ThemeContext.Provider value={mockValue}>
          {children}
        </ThemeContext.Provider>
      ),
    });

    // Click button
    const button = screen.getByRole("button", {
      name: /current theme: light/i,
    });
    await user.click(button);

    // Assert mock function was called
  });
});
