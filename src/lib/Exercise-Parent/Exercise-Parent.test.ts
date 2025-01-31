import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import ExerciseParent from './Exercise-Parent.svelte';

describe('ExerciseParent Component', () => {
  it('renders a single exercise details correctly', () => {
    render(ExerciseParent, {
      props: {
        exercises: [
          {
            name: 'Push Ups',
            sets: 3,
            reps: 10,
            weight: 100,
          },
        ],
      },
    });

    expect(screen.getByText('Push Ups')).toBeInTheDocument();

    expect(screen.getByText('Sets')).toBeInTheDocument();
    expect(screen.getByText('Reps')).toBeInTheDocument();
    expect(screen.getByText('Weight')).toBeInTheDocument();

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('renders the correct number of Sets labels for multiple exercises', () => {
    render(ExerciseParent, {
      props: {
        exercises: [
          { name: 'Push Ups', sets: 3, reps: 10, weight: 100 },
          { name: 'Squats', sets: 4, reps: 12, weight: 225 },
          { name: 'Deadlifts', sets: 5, reps: 8, weight: 315 },
        ],
      },
    });

    const setsLabels = screen.getAllByText('Sets');
    expect(setsLabels).toHaveLength(3);
  });

  it('renders nothing when exercises array is empty', () => {
    render(ExerciseParent, {
      props: { exercises: [] },
    });

    expect(screen.queryByText('Sets')).not.toBeInTheDocument();
    expect(screen.queryByText('Reps')).not.toBeInTheDocument();
    expect(screen.queryByText('Weight')).not.toBeInTheDocument();
  });
});