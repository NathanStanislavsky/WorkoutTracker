import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import EditWorkoutPage from "./+page.svelte";

describe("Edit workout page", () => {
  it("Renders edit workout page heading", () => {
    render(EditWorkoutPage);
    const heading = screen.getByRole("heading", { name: /edit workout/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the form with the correct fields', () => {
    const { getByLabelText } = render(EditWorkoutPage);
    expect(getByLabelText('Type')).toBeInTheDocument();
    expect(getByLabelText('Date')).toBeInTheDocument();
    expect(getByLabelText('Duration (minutes)')).toBeInTheDocument();
    expect(getByLabelText('Calories Burned')).toBeInTheDocument();
  });
});
