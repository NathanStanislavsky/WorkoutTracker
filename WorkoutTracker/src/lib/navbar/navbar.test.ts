import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import navbar from './navbar.svelte';

describe('Navbar Component', () => {
  it('renders navbar', () => {
    const { getByText } = render(navbar);
    expect(getByText('Workout Tracker')).toBeInTheDocument();
  });
});


