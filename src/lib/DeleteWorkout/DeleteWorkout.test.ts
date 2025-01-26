import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import DeleteWorkout from './DeleteWorkout.svelte';

describe('Delete workout button component', () => {
    it('Renders button component', () => {
        const { getByText } = render(DeleteWorkout);
        expect(getByText('Delete')).toBeInTheDocument();
    });
});