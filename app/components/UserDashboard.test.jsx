import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import UserManagementDashboard from "./UserDashboard";

describe("UserManagementDashboard - Core Tests", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("blocks submission and keeps modal open when fields are empty", async () => {
    render(<UserManagementDashboard />);

    // Open modal & submit without typing
    await user.click(screen.getByRole("button", { name: /add new user/i }));
    await user.click(screen.getByRole("button", { name: /submit/i }));

    // Modal remains visible & row count stays unchanged
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(2); // 1 header + 1 default row
  });

  it("adds new user to the table and closes modal on valid submit", async () => {
    render(<UserManagementDashboard />);

    // 1. Open modal
    await user.click(screen.getByRole("button", { name: /add new user/i }));

    // 2. Fill required inputs
    await user.type(
      screen.getByRole("textbox", { name: /full name/i }),
      "Bob Smith",
    );
    await user.type(
      screen.getByRole("textbox", { name: /email address/i }),
      "bob@example.com",
    );

    // 3. Submit
    await user.click(screen.getByRole("button", { name: /submit/i }));

    // 4. Assert modal closes and table updates
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(screen.getByRole("cell", { name: "Bob Smith" })).toBeInTheDocument();
    expect(
      screen.getByRole("cell", { name: "bob@example.com" }),
    ).toBeInTheDocument();
  });
});
