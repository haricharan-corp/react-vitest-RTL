import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import DebouncedSearch from "./debouncedInput";

describe("DebouncedSearch", () => {
  beforeEach(() => {
    // 1. Enable fake timers before each test
    vi.useFakeTimers();
  });

  afterEach(() => {
    // 2. Restore real timers after each test to prevent test bleed
    vi.useRealTimers();
  });

  it("delays API call until user stops typing for 500ms", async () => {
    // Connect userEvent to Vitest's fake timer runner
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const mockSearch = vi.fn();

    render(<DebouncedSearch onSearch={mockSearch} />);

    const input = screen.getByRole("textbox");

    // Type input
    await user.type(input, "vitest");

    // 1. Immediately after typing, timer has NOT reached 500ms yet
    expect(mockSearch).not.toHaveBeenCalled();

    // 2. Fast-forward clock by 499ms (1ms short of debounce threshold)
    act(() => {
      vi.advanceTimersByTime(499);
    });
    expect(mockSearch).not.toHaveBeenCalled();

    // 3. Fast-forward remaining 1ms (completing 500ms debounce)
    act(() => {
      vi.advanceTimersByTime(1);
    });

    // 4. Assert callback fired once with final value
    expect(mockSearch).toHaveBeenCalledTimes(1);
    //  onSearch(query); query typed input is the arguement to
    //the onSearch funtio
    expect(mockSearch).toHaveBeenCalledWith("vitest");
  });

  it("resets debounce timer on rapid keystrokes", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const mockSearch = vi.fn();

    render(<DebouncedSearch onSearch={mockSearch} />);
    const input = screen.getByRole("textbox");

    // Type 'react'
    await user.type(input, "react");

    // Fast-forward 300ms (timer is active, but not complete)
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // User types ' query' before 500ms completes -> resets timer
    await user.type(input, " query");

    // Fast-forward another 300ms (total 600ms overall, but only 300ms since last key)
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Search should still NOT have fired because timer reset on second input
    expect(mockSearch).not.toHaveBeenCalled();

    // Advance remaining 200ms
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Now it fires once with full query
    expect(mockSearch).toHaveBeenCalledTimes(1);
    expect(mockSearch).toHaveBeenCalledWith("react query");
  });
});
