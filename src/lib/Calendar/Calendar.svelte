<script lang="ts">
  import { onMount } from "svelte";
  import {
    generateCalendar,
    getNextMonth,
    getPrevMonth,
  } from "./generateCalendar.ts";

  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let calendarDays = [];

  let selectedDate = null;

  onMount(() => {
    calendarDays = generateCalendar(currentMonth, currentYear);
  });

  function getMonthName(monthIndex) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthIndex];
  }

  function navigateToPrevMonth() {
    const { month, year } = getPrevMonth(currentMonth, currentYear);
    currentMonth = month;
    currentYear = year;
    calendarDays = generateCalendar(currentMonth, currentYear);
  }

  function navigateToNextMonth() {
    const { month, year } = getNextMonth(currentMonth, currentYear);
    currentMonth = month;
    currentYear = year;
    calendarDays = generateCalendar(currentMonth, currentYear);
  }

  function selectDate(date) {
    if (date.currentMonth) {
      selectedDate = new Date(currentYear, currentMonth, date.day);
    }
  }
</script>

<div class="max-w-md mx-auto p-4 bg-slate-800 p-10">
  <div class="flex justify-between items-center mb-4">
    <button
      on:click={navigateToPrevMonth}
      class="p-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring"
      aria-label="Previous Month"
    >
      &lt;
    </button>
    <h2 class="text-xl font-semibold text-white">
      {getMonthName(currentMonth)}
      {currentYear}
    </h2>
    <button
      on:click={navigateToNextMonth}
      class="p-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring"
      aria-label="Previous Month"
    >
      &gt;
    </button>
  </div>

  <div class="grid grid-cols-7 gap-2 text-center font-medium text-white">
    {#each daysOfWeek as day}
      <div>{day}</div>
    {/each}
  </div>

  <div class="grid grid-cols-7 gap-2 mt-2">
    {#each calendarDays as date}
      <button
        on:click={() => selectDate(date)}
        class={`p-2 text-center rounded 
          ${date.currentMonth ? "bg-lightblue text-white" : "bg-gray-100 text-black"}
          ${
            selectedDate &&
            selectedDate.getDate() === date.day &&
            selectedDate.getMonth() === currentMonth
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-500"
          }
        `}
        type="button"
        aria-label="Select Date"
      >
        {date.day}
      </button>
    {/each}
  </div>

  {#if selectedDate}
    <div class="mt-4 p-2 bg-blue-100 rounded">
      Selected Date: {selectedDate.toDateString()}
    </div>
  {/if}
</div>
