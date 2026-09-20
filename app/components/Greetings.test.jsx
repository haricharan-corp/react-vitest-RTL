import { render, screen } from "@testing-library/react";

import { it, describe, expect } from "vitest";
import Greeting from "./Greetings";

describe("Greeting", () => {
  it("renders a default prop greeting", () => {
    render(<Greeting />);
    expect(screen.getByText("Hello, World!")).toBeInTheDocument();
  });
  it("renders a default prop greeting with a name", () => {
    render(<Greeting name={"hari"} />);
    expect(screen.getByText("Hello, hari!")).toBeInTheDocument();
  });
});
