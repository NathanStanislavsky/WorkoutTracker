import { render } from "@testing-library/svelte";
import '@testing-library/jest-dom';
import { describe, it, expect } from "vitest";
import WorkoutItem from "./WorkoutCard.svelte";

describe("WorkoutItem Component", () => {
  it("renders workout details correctly", () => {
    const { getByText } = render(WorkoutItem, {
      props: {
        date: "2025-01-01",
        workoutType: "Cardio",
        duration: 30,
        calories: 200,
      },
    });

    expect(getByText("Cardio")).toBeInTheDocument();
    expect(getByText("2025-01-01")).toBeInTheDocument();
    expect(getByText("Duration")).toBeInTheDocument();
    expect(getByText("30 min")).toBeInTheDocument();
    expect(getByText("Calories")).toBeInTheDocument();
    expect(getByText("200")).toBeInTheDocument();
  });
});