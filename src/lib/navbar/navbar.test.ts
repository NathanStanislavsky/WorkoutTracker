import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import navbar from './Navbar.svelte';

describe('Navbar Component', () => {
  it('renders navbar', () => {
    const { getByText } = render(navbar);
    expect(getByText('Workout Tracker')).toBeInTheDocument();
  });

  it('renders the logo with the provided URL', () => {
    const { getByAltText } = render(navbar, { logoUrl: 'logo.png' });
    expect(getByAltText('Workout logo')).toHaveAttribute('src', 'logo.png');
  });

  it('includes a workout link with the correct href', () => {
    const { getByRole } = render(navbar);
    const workoutLink = getByRole('link', { name: 'Workout' });
    expect(workoutLink).toBeInTheDocument();
    expect(workoutLink.getAttribute('href')).toBe('/workout');
  });

  it('includes a signup link with the correct href', () => {
    const { getByRole } = render(navbar);
    const signupLink = getByRole('link', { name: 'Sign Up' });
    expect(signupLink).toBeInTheDocument();
    expect(signupLink.getAttribute('href')).toBe('/signup');
  });

  it('includes a signin link with the correct href', () => {
    const { getByRole } = render(navbar);
    const signupLink = getByRole('link', { name: 'Sign In' });
    expect(signupLink).toBeInTheDocument();
    expect(signupLink.getAttribute('href')).toBe('/signin');
  });

  it('includes a logout button', () => {
    const { getByRole } = render(navbar);
    const logoutButton = getByRole('button', { name: 'Logout' });
    expect(logoutButton).toBeInTheDocument();
  });
});


