import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Exercise from './Exercise.svelte';

describe('Exercise Component', () => {
    it('renders exercise details correctly', () => {
        const { getByText } = render(Exercise, { props: {
            name: 'Push Ups',
            sets: 3,
            reps: 10,
            weight: 100,
        }});

        expect(getByText('Push Ups')).toBeInTheDocument();
        expect(getByText('Sets')).toBeInTheDocument();
        expect(getByText('3')).toBeInTheDocument();
        expect(getByText('Reps')).toBeInTheDocument();
        expect(getByText('10')).toBeInTheDocument();
        expect(getByText('Weight')).toBeInTheDocument();
        expect(getByText('100')).toBeInTheDocument();
    });

    it('renders exercise component with "delete" button', () => {
        const { getByText } = render(Exercise, { props: {
            name: 'Push Ups',
            sets: 3,
            reps: 10,
            weight: 100,
        }});

        expect(getByText('x')).toBeInTheDocument();
    });
});