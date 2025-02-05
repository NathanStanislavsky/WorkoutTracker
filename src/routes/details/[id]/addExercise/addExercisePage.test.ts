import { describe, it, expect, vi, beforeEach } from "vitest";
import AddExercisePage from "./+page.svelte";
import { render } from "@testing-library/svelte";
import "@testing-library/jest-dom";

describe("add exercise page tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders add exercise", () => {
    const { getByText } = render(AddExercisePage);
    expect(getByText("Add a New Exercise")).toBeInTheDocument();
  });

  it('renders the form with the correct fields', () => {
    const { getByLabelText } = render(AddExercisePage);
    expect(getByLabelText('Exercise Name')).toBeInTheDocument();
    expect(getByLabelText('Sets')).toBeInTheDocument();
    expect(getByLabelText('Reps')).toBeInTheDocument();
    expect(getByLabelText('Weight')).toBeInTheDocument();
  });
});