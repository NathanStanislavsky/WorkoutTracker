import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import WorkoutPage from "./+page.svelte";

describe("WorkoutPage", () => {
  it("renders without crashing", () => {
    render(WorkoutPage);
    expect(screen.getByText(/Workouts/i)).toBeInTheDocument();
  });

  it("displays the Workout Carousel component", () => {
    render(WorkoutPage);

    const carousel = screen.getByTestId("workout-carousel");
    expect(carousel).toBeInTheDocument();
  });

  it("displays all workouts for a user when data is provided", () => {
    const workouts = [
      {
        date: "2025-01-20",
        workoutType: "Push",
        duration: 30,
        calories: 250,
      },
      {
        date: "2025-01-21",
        workoutType: "Leg",
        duration: 45,
        calories: 300,
      },
    ];

    render(WorkoutPage, { workouts });

    expect(screen.getByText("Push")).toBeInTheDocument();
    expect(screen.getByText("Leg")).toBeInTheDocument();
  });
});
