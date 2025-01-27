import { render, screen } from "@testing-library/svelte";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import WorkoutList from "./Carousel.svelte";

describe("Workout Carousel Component", () => {
  it("renders a list of workout items", () => {
    const workouts = [
      {
        date: "2025-01-20",
        workoutType: "Cardio",
        duration: 30,
        calories: 250,
      },
    ];

    render(WorkoutList, { props: { workouts } });

    expect(screen.getByText("Cardio")).toBeInTheDocument();
    expect(screen.getByText("2025-01-20")).toBeInTheDocument();
    expect(screen.getByText("Duration")).toBeInTheDocument();
    expect(screen.getByText("30 min")).toBeInTheDocument();
    expect(screen.getByText("250")).toBeInTheDocument();
  });
});