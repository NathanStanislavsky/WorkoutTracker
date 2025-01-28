import { describe, it, expect } from "vitest";
import { generateCalendar, getNextMonth, getPrevMonth } from "./generateCalendar.ts";

describe("generateCalendar", () => {
  it("generates calendar with no previous month days", () => {
    const month = 11;
    const year = 2024;

    const calendar = generateCalendar(month, year);

    // December 2024 starts on Sunday (Dec 1, 2024 is a Sunday)
    // So, firstDay = 0, no previous month's days

    // December 2024 has 31 days
    // Total days = 31
    // Since firstDay is 0, no blanks at start
    // Then, 31 days. 31 % 7 = 3, so 7 - 3 = 4 blanks at end

    expect(calendar.length).toBe(35); // 5 weeks

    // Check first day
    expect(calendar[0]).toEqual({ day: 1, currentMonth: true });

    // Check last day
    expect(calendar[34]).toEqual({ day: 4, currentMonth: false });

    // Check some specific days
    expect(calendar[15]).toEqual({ day: 16, currentMonth: true });
    expect(calendar[30]).toEqual({ day: 31, currentMonth: true });
  });

  it("generates calendar with preivous month's days", () => {
    const month = 0; // January
    const year = 2025;

    const calendar = generateCalendar(month, year);

    // January 2025 starts on Wednesday (Jan 1, 2025 is a Wednesday)
    // So, firstDay = 3, 3 previous month's days

    // January has 31 days
    // 3 blanks + 31 days = 34
    // 34 % 7 = 6, so 1 blank at end

    expect(calendar.length).toBe(35); // 5 weeks

    // First three days are from December 2024
    expect(calendar[0]).toEqual({ day: 29, currentMonth: false }); // Dec 29
    expect(calendar[1]).toEqual({ day: 30, currentMonth: false }); // Dec 30
    expect(calendar[2]).toEqual({ day: 31, currentMonth: false }); // Dec 31

    // Check first day of January
    expect(calendar[3]).toEqual({ day: 1, currentMonth: true });

    // Check last day of January
    expect(calendar[33]).toEqual({ day: 31, currentMonth: true });

    // Last day in calendar is first day of February
    expect(calendar[34]).toEqual({ day: 1, currentMonth: false });
  });

  it("generates calendar for February 2024 (leap year)", () => {
    const month = 1; // February
    const year = 2024;

    const calendar = generateCalendar(month, year);

    // February 1, 2024 is a Thursday
    // firstDay = 4
    // 4 blanks from January 2024

    // February 2024 has 29 days
    // 4 blanks + 29 days = 33
    // 33 % 7 = 5, so 2 blanks at end

    expect(calendar.length).toBe(35); // 5 weeks

    // First four days are from January 2024
    expect(calendar[0]).toEqual({ day: 28, currentMonth: false }); // Jan 28
    expect(calendar[1]).toEqual({ day: 29, currentMonth: false }); // Jan 29
    expect(calendar[2]).toEqual({ day: 30, currentMonth: false }); // Jan 30
    expect(calendar[3]).toEqual({ day: 31, currentMonth: false }); // Jan 31

    // First day of February
    expect(calendar[4]).toEqual({ day: 1, currentMonth: true });

    // Last day of February
    expect(calendar[32]).toEqual({ day: 29, currentMonth: true });

    // First day of March
    expect(calendar[33]).toEqual({ day: 1, currentMonth: false });
    expect(calendar[34]).toEqual({ day: 2, currentMonth: false });
  });
});

describe("getPrevMonth", () => {
  it("correctly returns December of the previous year when current month is January", () => {
    const result = getPrevMonth(0, 2024); // January 2024
    expect(result).toEqual({ month: 11, year: 2023 }); // December 2023
  });

  it("correctly returns the previous month and same year when current month is not January", () => {
    const result = getPrevMonth(5, 2024); // June 2024
    expect(result).toEqual({ month: 4, year: 2024 }); // May 2024
  });
});

describe("getNextMonth", () => {
  it('correctly return January of the next year when current month is December', () => {
    const result = getNextMonth(11, 2024); // December 2024
    expect(result).toEqual({ month: 0, year: 2025 }); // January 2025
  });
});
