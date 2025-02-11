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

  it("renders the form with the correct fields", () => {
    render(EditWorkoutPage, {
      props: {
        data: {
          exercise: {
            id: 1,
            name: 'Bench Press',
            sets: 3,
            reps: 10,
            weight: 100
          }
        }
      }
    });

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Sets')).toBeInTheDocument();
    expect(screen.getByLabelText('Reps')).toBeInTheDocument();
    expect(screen.getByLabelText('Weight')).toBeInTheDocument();
  });

  it('should preload inputs with exercise values', () => {
    const mockData = {
      exercise: {
        id: 1,
        name: 'Bench Press',
        sets: 3,
        reps: 10,
        weight: 100,
      },
    };

    render(EditWorkoutPage, { props: { data: mockData } });

    const nameInput = screen.getByLabelText(/name/i);
    const setsInput = screen.getByLabelText(/sets/i);
    const repsInput = screen.getByLabelText(/reps/i);
    const weightInput = screen.getByLabelText(/weight/i);

    expect(nameInput).toHaveValue('Bench Press');
    expect(setsInput).toHaveValue(3);
    expect(repsInput).toHaveValue(10);
    expect(weightInput).toHaveValue(100);
  });
});
