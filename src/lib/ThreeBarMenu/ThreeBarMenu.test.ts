import { render, fireEvent } from "@testing-library/svelte";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import ThreeBarMenu from "./ThreeBarMenu.svelte";

describe("ThreeBarMenu component", () => {
  it("should not show the dropdown menu by default", () => {
    const { queryByRole } = render(ThreeBarMenu);

    expect(queryByRole("menu")).not.toBeInTheDocument();
  });

  it("should toggle the menu when the button is clicked", async () => {
    const { getByLabelText, queryByRole } = render(ThreeBarMenu);
    const toggleButton = getByLabelText("Toggle menu");

    expect(queryByRole("menu")).not.toBeInTheDocument();

    await fireEvent.click(toggleButton);
    expect(queryByRole("menu")).toBeInTheDocument();

    await fireEvent.click(toggleButton);
    expect(queryByRole("menu")).not.toBeInTheDocument();
  });

  it('should navigate to /workout/edit/123 when "Edit" is clicked', async () => {
    const { getByLabelText, getByText } = render(ThreeBarMenu, {
      props: { id: 123 },
    });

    const toggleButton = getByLabelText("Toggle menu");
    await fireEvent.click(toggleButton);

    const originalLocation = window.location;

    delete (window as any).location;
    window.location = { href: "" } as Location;

    await fireEvent.click(getByText("Edit"));

    expect(window.location.href).toBe("/workout/edit/123");

    window.location = originalLocation;
  });

  it('should call fetch with /workout/delete/123 and reload when "Delete" is clicked', async () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
    const mockResponse = new Response(null, { status: 200, statusText: 'OK' });
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);
  
    const originalLocation = window.location;

    const reloadSpy = vi.fn();
  
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: {
        ...originalLocation,
        reload: reloadSpy
      }
    });

    const { getByLabelText, getByText } = render(ThreeBarMenu, { props: { id: 123 } });
    const toggleButton = getByLabelText('Toggle menu');
  
    await fireEvent.click(toggleButton);
    await fireEvent.click(getByText('Delete'));

    expect(confirmSpy).toHaveBeenCalled();
    expect(fetchSpy).toHaveBeenCalledWith('/workout/delete/123', { method: 'DELETE' });
    expect(reloadSpy).toHaveBeenCalled();
  
    confirmSpy.mockRestore();
    fetchSpy.mockRestore();
  
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: originalLocation
    });
  });
});
