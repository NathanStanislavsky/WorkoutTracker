import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import EditWorkoutPage from './+page.svelte';

describe("Edit workout page", () => {
  it('Renders the page heading', () => {
    render(EditWorkoutPage, {
      props: {
        data: {
          workout: {
            id: 1,
            type: 'Cardio',
            date: new Date().toISOString(),
            duration: 30,
            caloriesBurned: 300
          }
        }
      }
    });

    const heading = screen.getByRole('heading', { name: /edit workout/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders the form with the correct fields", () => {
    render(EditWorkoutPage, {
      props: {
        data: {
          workout: {
            id: 1,
            type: 'Cardio',
            date: new Date().toISOString(),
            duration: 30,
            caloriesBurned: 300
          }
        }
      }
    });

    expect(screen.getByLabelText('Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Duration')).toBeInTheDocument();
    expect(screen.getByLabelText('Calories Burned')).toBeInTheDocument();
  });
});