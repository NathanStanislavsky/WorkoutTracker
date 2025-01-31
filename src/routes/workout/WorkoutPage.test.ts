import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { queryByRole, render, screen } from "@testing-library/svelte";
import WorkoutPage from "./+page.svelte";

describe("WorkoutPage", () => {
  it("displays the Workout Carousel component", () => {
    render(WorkoutPage, {
      data: {
        workouts: [
          {
            id: 1,
            date: "2025-01-20",
            workoutType: "Push",
            duration: 30,
            calories: 250,
          },
        ],
        user: { id: 1, name: "Test User", email: "test@example.com" },
      },
    });

    const carousel = screen.getByTestId("workout-carousel");
    expect(carousel).toBeInTheDocument();
  });

  it("displays all workouts for a user when data is provided", () => {
    const workouts = [
      {
        id: 1,
        date: "2025-01-20",
        workoutType: "Push",
        duration: 30,
        calories: 250,
      },
      {
        id: 2,
        date: "2025-01-21",
        workoutType: "Leg",
        duration: 45,
        calories: 300,
      },
    ];

    const mockUser = { id: 1, name: "Test User", email: "test@example.com" };

    render(WorkoutPage, { data: { workouts, user: mockUser }});

    expect(screen.getByText("Push")).toBeInTheDocument();
    expect(screen.getByText("Leg")).toBeInTheDocument();
  });

  it("shows a message if there are no workouts", () => {
    const mockUser = { id: 1, name: "Test User", email: "test@example.com" };

    render(WorkoutPage, { data: { workouts: [], user: mockUser } });

    expect(screen.getByText(/no workouts found/i)).toBeInTheDocument();
  });

  it("displays add workout button", () => {
    const mockUser = { id: 1, name: "Test User", email: "test@example.com" };

    render(WorkoutPage, { data: { workouts: [], user: mockUser } });

    const addWorkoutButton = screen.getByTestId("add-workout-button");
    expect(addWorkoutButton).toBeInTheDocument();
  });
});
