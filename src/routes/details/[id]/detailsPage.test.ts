import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/svelte";
import DetailsPage from "./+page.svelte";
import "@testing-library/jest-dom";

vi.mock("$app/navigation", () => {
  return {
    goto: vi.fn(),
  };
});

vi.mock("$app/stores", async () => {
  const { readable } = await import("svelte/store");
  return {
    page: readable({ params: { id: "123" } }),
  };
});

import { goto } from "$app/navigation";

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
      props: {
        data: { exercises },
      },
    });

    expect(screen.getByText("Push-up")).toBeInTheDocument();
    expect(screen.getByText("Pull-up")).toBeInTheDocument();
  });

  it("renders no exercises message when list is empty", () => {
    const exercises: Array<{
      id: string;
      name: string;
      sets: number;
      reps: number;
      weight: number;
    }> = [];

    render(DetailsPage, {
      props: {
        data: { exercises },
      },
    });

    expect(screen.getByText("No exercises found")).toBeInTheDocument();
  });

  it("renders add exercise button", () => {
    render(DetailsPage, {
      props: {
        data: { exercises: [] },
      },
    });

    expect(screen.getByTestId("add-exercise-button")).toBeInTheDocument();
  });

  it("redirects to add exercise page when button is clicked", async () => {
    render(DetailsPage, {
      props: {
        data: { exercises: [] },
      },
    });

    const addExerciseButton = screen.getByLabelText("Add new exercise");

    await fireEvent.click(addExerciseButton);

    expect(goto).toHaveBeenCalledWith("/details/123/addExercise");
  });
});