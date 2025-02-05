import { describe, it, expect, vi, beforeEach } from "vitest";
import DetailsPage from "./+page.svelte";
import { render, screen } from "@testing-library/svelte";
import "@testing-library/jest-dom";

describe("Details page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders with exercises", () => {
    const exercises = [
        { id: "1", name: "Push-up", sets: 3, reps: 10, weight: 0 },
        { id: "2", name: "Pull-up", sets: 3, reps: 8, weight: 0 },
      ];

    render(DetailsPage, {
      data: {
        exercises,
      },
    });

    expect(screen.getByText("Push-up")).toBeInTheDocument();
    expect(screen.getByText("Pull-up")).toBeInTheDocument();
  });
});
