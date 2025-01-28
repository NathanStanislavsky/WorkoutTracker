import { render, screen } from "@testing-library/svelte";
import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Calendar from "./Calendar.svelte";

describe("Calendar component", () => {
  beforeEach(() => {
    vi.useFakeTimers();

    const mockedDate = new Date(2024, 11);
    vi.setSystemTime(mockedDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Renders calendar component with December 2024", () => {
    render(Calendar);

    const currentMonth = "December";
    const currentYear = "2024";

    expect(screen.getByText(`${currentMonth} ${currentYear}`)).toBeInTheDocument();
  });

  it("Renders calendar component with days of the week", () => {
    render(Calendar);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    days.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });
});