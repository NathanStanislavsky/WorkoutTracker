import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import DeleteWorkout from './DeleteWorkout.svelte';

describe('Delete workout button component', () => {
    it('Renders button component', () => {
        const { getByText } = render(DeleteWorkout);
        expect(getByText('Delete')).toBeInTheDocument();
    });

    it('renders correctly with the provided id prop', () => {
        const mockId = 123;

        const { getByRole, getByDisplayValue } = render(DeleteWorkout, { props: { id: mockId } });
    
        const button = getByRole('button', { name: /delete/i });
        expect(button).toBeInTheDocument();
    
        const hiddenInput = getByDisplayValue(mockId.toString());
        expect(hiddenInput).toBeInTheDocument();
        expect(hiddenInput).toHaveAttribute('name', 'id');
        expect(hiddenInput).toHaveAttribute('type', 'hidden');
      });
});