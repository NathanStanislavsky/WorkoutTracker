import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import EditWorkoutPage from "./+page.svelte";

describe("Edit workout page", () => {
  it("Renders the page heading", () => {
    render(EditWorkoutPage);

    const heading = screen.getByRole("heading", { name: /edit exercise/i });
    expect(heading).toBeInTheDocument();
  });
});
