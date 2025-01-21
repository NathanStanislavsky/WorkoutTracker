import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import WorkoutItem from './WorkoutItem.svelte';

describe('WorkoutItem Component', () => {
  it('renders workout details correctly', () => {
    const { getByText } = render(WorkoutItem, {
      props: {
        date: '2025-01-01',
        workoutType: 'Cardio',
        duration: 30,
        calories: 200
      }
    });

    expect(getByText('Cardio')).toBeInTheDocument();
    expect(getByText('2025-01-01')).toBeInTheDocument();
    expect(getByText('Duration: 30 minutes')).toBeInTheDocument();
    expect(getByText('Calories Burned: 200')).toBeInTheDocument();
  });
});