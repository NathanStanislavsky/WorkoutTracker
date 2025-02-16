import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';

let setPageStore: (value: any) => void;
let Navbar: any;

describe('Navbar Component', () => {
  beforeAll(async () => {
    await vi.doMock('$app/stores', async () => {
      const { writable } = await import('svelte/store');
      const pageStore = writable({ data: { user: null } });
      // Expose the set method to update the store from tests.
      setPageStore = pageStore.set;
      return {
        page: {
          subscribe: pageStore.subscribe,
        },
      };
    });

    const module = await import('./Navbar.svelte');
    Navbar = module.default;
  });

  describe('Logged Out State', () => {
    beforeEach(() => {
      setPageStore({ data: { user: null } });
    });

    it('renders navbar with title and logo', () => {
      const { getByText, getByAltText } = render(Navbar, { props: { logoUrl: 'logo.png' } });
      expect(getByText('Workout Tracker')).toBeInTheDocument();
      expect(getByAltText('Workout logo')).toHaveAttribute('src', 'logo.png');
    });

    it('includes a signup link with the correct href', () => {
      const { getByRole } = render(Navbar);
      const signupLink = getByRole('link', { name: 'Sign Up' });
      expect(signupLink).toBeInTheDocument();
      expect(signupLink.getAttribute('href')).toBe('/signup');
    });

    it('includes a signin link with the correct href', () => {
      const { getByRole } = render(Navbar);
      const signinLink = getByRole('link', { name: 'Sign In' });
      expect(signinLink).toBeInTheDocument();
      expect(signinLink.getAttribute('href')).toBe('/signin');
    });

    it('does not include workout or logout elements', () => {
      const { queryByRole } = render(Navbar);
      expect(queryByRole('link', { name: 'Workout' })).toBeNull();
      expect(queryByRole('button', { name: 'Logout' })).toBeNull();
    });
  });

  describe('Logged In State', () => {
    beforeEach(() => {
      setPageStore({ data: { user: { name: 'Test User' } } });
    });

    it('includes a workout link with the correct href', () => {
      const { getByRole } = render(Navbar);
      const workoutLink = getByRole('link', { name: 'Workout' });
      expect(workoutLink).toBeInTheDocument();
      expect(workoutLink.getAttribute('href')).toBe('/workout');
    });

    it('includes a logout button', () => {
      const { getByRole } = render(Navbar);
      const logoutButton = getByRole('button', { name: 'Logout' });
      expect(logoutButton).toBeInTheDocument();
    });

    it('does not include signup or signin links when logged in', () => {
      const { queryByRole } = render(Navbar);
      expect(queryByRole('link', { name: 'Sign Up' })).toBeNull();
      expect(queryByRole('link', { name: 'Sign In' })).toBeNull();
    });
  });
});