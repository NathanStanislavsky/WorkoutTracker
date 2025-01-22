import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import WorkoutPage from './+page.svelte';

describe('WorkoutPage', () => {
  it('renders without crashing', () => {
    render(WorkoutPage);
    expect(screen.getByText(/Workouts/i)).toBeInTheDocument();
  });
});