export function generateCalendar(month, year) {
    const calendarDays = [];
  
    // gets day of the week for the first day of the month
    const firstDay = new Date(year, month, 1).getDay();

    // since day is 0 the date constructur rolls back to previous month and returns the last day
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    // Previous month details
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
  
    // Fill in the blanks for the first week
    for (let i = firstDay; i > 0; i--) {
      calendarDays.push({
        day: daysInPrevMonth - i + 1,
        currentMonth: false,
      });
    }
  
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        day: i,
        currentMonth: true,
      });
    }
  
    // Fill in the blanks for the last week
    const remaining = 7 - (calendarDays.length % 7);
    if (remaining < 7) {
      for (let i = 1; i <= remaining; i++) {
        calendarDays.push({
          day: i,
          currentMonth: false,
        });
      }
    }
  
    return calendarDays;
  }