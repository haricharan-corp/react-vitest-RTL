import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCounter } from "../../hooks/useCounter";

describe("useCounter hooks", () => {
  it("initial value is 5 ", () => {
    //rendering hook
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).toBe(5);
  });

  it("increment ", () => {
    //rendering hook
    const { result } = renderHook(() => useCounter(0));

    expect(result.current.count).toBe(0);
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });

  it("decrement ", () => {
    //rendering hook
    const { result } = renderHook(() => useCounter(1));

    expect(result.current.count).toBe(1);
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(0);
  });
});
