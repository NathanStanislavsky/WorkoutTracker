import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import ThreeBarMenu from './ThreeBarMenu.svelte';

describe('ThreeBarMenu component', () => {
  it('should not show the dropdown menu by default', () => {
    const { queryByRole } = render(ThreeBarMenu);

    expect(queryByRole('menu')).not.toBeInTheDocument();
  });
});