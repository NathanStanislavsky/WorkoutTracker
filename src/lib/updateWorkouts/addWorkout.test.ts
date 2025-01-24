import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import AddWorkout from './addWorkout.svelte';

describe('add workout component', () => {
  it('renders add workout component', () => {
    const { getByText } = render(AddWorkout);
    expect(getByText('Add a New Workout')).toBeInTheDocument();
  });

  it('renders the form with the correct fields', () => {
    const { getByLabelText } = render(AddWorkout);
    expect(getByLabelText('Type')).toBeInTheDocument();
    expect(getByLabelText('Date')).toBeInTheDocument();
    expect(getByLabelText('Duration (minutes)')).toBeInTheDocument();
    expect(getByLabelText('Calories Burned')).toBeInTheDocument();
  });
});


