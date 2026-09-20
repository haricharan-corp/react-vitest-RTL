import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import UserProfile from "./UserProfile";
// import "@testing-library/jest-dom/vitest";

describe("UserProfile", () => {
  // This prevents real HTTP calls to external servers.
  //means globalThis.fetch with vi.fn(> any fetch call haeepend
  //globally replace with vi mock function
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });
  // Clears Call History: Resets the call count back to 0
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("fetches and displays user data", async () => {
    // NOTE
    // The very next time fetch() is called in this test, return a
    //  Promise that resolves to this fake object one time only."
    //vi.mocked is used for ts not for js
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 4,
        name: "John",
        email: "Jon@gmail.com",
      }),
    });
    render(<UserProfile userId={4} />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/john/i)).toBeInTheDocument();
      expect(screen.getByText(/jon@gmail.com/i)).toBeInTheDocument();
    });
  });

  it("error while fetching user data", async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: "User not found" }),
    });
    render(<UserProfile userId={999} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/user not found/i)).toBeInTheDocument();
    });
  });
  // 404, 500, 403=>res.ok is false=> mockResolvedValueOnce
  //   mockRejectedValueOnce used for hard crash

  //   fetch throws an error => mockRejectedValueOnce
  it("handles network crash or disconnect", async () => {
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(
      new Error("failed to fecth"),
    );
    render(<UserProfile userId={4} />);

    await waitFor(() => {
      expect(screen.getByText(/failed to fecth/i)).toBeInTheDocument();
    });
  });
});
