import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import Exercise from './Exercise.svelte';

const defaultProps = {
  id: 1,
  name: 'Push Ups',
  sets: 3,
  reps: 10,
  weight: 100,
};

const setup = (props = defaultProps) => render(Exercise, { props });

describe('Exercise Component', () => {
  it('renders exercise details correctly', () => {
    const { getByText } = setup();

    expect(getByText('Push Ups')).toBeInTheDocument();
    expect(getByText('Sets')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
    expect(getByText('Reps')).toBeInTheDocument();
    expect(getByText('10')).toBeInTheDocument();
    expect(getByText('Weight')).toBeInTheDocument();
    expect(getByText('100')).toBeInTheDocument();
  });

  it('renders a delete button', () => {
    const { getByText } = setup();
    expect(getByText('x')).toBeInTheDocument();
  });

  it('calls delete exercise endpoint when delete button is clicked', async () => {
    const fetchSpy = vi.spyOn(window, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    );

    const { getByText } = setup();
    const deleteButton = getByText('x');

    await fireEvent.click(deleteButton);

    expect(fetchSpy).toHaveBeenCalledWith('/details/deleteExercise/1', {
      method: 'DELETE'
    });

    fetchSpy.mockRestore();
  });
});