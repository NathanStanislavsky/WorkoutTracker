import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import ThreeBarMenu from './ThreeBarMenu.svelte';

describe('ThreeBarMenu component', () => {
  it('should not show the dropdown menu by default', () => {
    const { queryByRole } = render(ThreeBarMenu);

    expect(queryByRole('menu')).not.toBeInTheDocument();
  });

  it('should toggle the menu when the button is clicked', async () => {
    const { getByLabelText, queryByRole } = render(ThreeBarMenu);
    const toggleButton = getByLabelText('Toggle menu');

    expect(queryByRole('menu')).not.toBeInTheDocument();

    await fireEvent.click(toggleButton);
    expect(queryByRole('menu')).toBeInTheDocument();

    await fireEvent.click(toggleButton);
    expect(queryByRole('menu')).not.toBeInTheDocument();
  });

  it('should call the edit handler when "Edit" is clicked', async () => {
    const { getByLabelText, getByText } = render(ThreeBarMenu);
    const toggleButton = getByLabelText('Toggle menu');

    await fireEvent.click(toggleButton);

    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    await fireEvent.click(getByText('Edit'));
    expect(alertSpy).toHaveBeenCalledWith('Edit action');

    alertSpy.mockRestore();
  });
});