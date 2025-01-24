import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import navbar from './navbar.svelte';

describe('Navbar Component', () => {
  it('renders navbar', () => {
    const { getByText } = render(navbar);
    expect(getByText('Workout Tracker')).toBeInTheDocument();
  });

  it('renders the logo with the provided URL', () => {
    const { getByAltText } = render(navbar, { logoUrl: 'logo.png' });
    expect(getByAltText('Workout logo')).toHaveAttribute('src', 'logo.png');
  });

  it('includes a home link with the correct href', () => {
    const { getByRole } = render(navbar);
    const homeLink = getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.getAttribute('href')).toBe('/');
  });
});


