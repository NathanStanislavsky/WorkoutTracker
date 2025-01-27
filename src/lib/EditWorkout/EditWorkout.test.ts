import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import EditWorkout from './EditWorkout.svelte';

describe('Edit workout button component', () => {
    it('Renders button component', () => {
        const { getByText } = render(EditWorkout);
        expect(getByText('Edit')).toBeInTheDocument();
    });
});