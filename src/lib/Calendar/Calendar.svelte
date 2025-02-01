<script lang="ts">
  import { onMount } from "svelte";
  import {
    generateCalendar,
    getNextMonth,
    getPrevMonth,
  } from "./generateCalendar.ts";
  import WorkoutCarousel from "$lib/Carousel/Carousel.svelte";

  type CalendarDay = {
    day: number;
    currentMonth: boolean;
  };

  let currentDate: Date = new Date();
  let currentMonth: number = currentDate.getMonth();
  let currentYear: number = currentDate.getFullYear();

  const daysOfWeek: string[] = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  let calendarDays: CalendarDay[] = [];

  let selectedDate: Date | null = null;
  let workouts: any[] = [];
  let loading: boolean = false;
  let error: string | null = null;

  onMount(() => {
    calendarDays = generateCalendar(currentMonth, currentYear);
  });

  function getMonthName(monthIndex: number): string {
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
    selectedDate = null;
    workouts = [];
  }

  function navigateToNextMonth() {
    const { month, year } = getNextMonth(currentMonth, currentYear);
    currentMonth = month;
    currentYear = year;
    calendarDays = generateCalendar(currentMonth, currentYear);
    selectedDate = null;
    workouts = [];
  }

  async function selectDate(date: CalendarDay) {
    if (date.currentMonth) {
      const selected = new Date(currentYear, currentMonth, date.day);
      await setSelectedDate(selected);
    }
  }

  async function setSelectedDate(date: Date) {
    const isoDate = date.toISOString();
    const url = `/calendar/${encodeURIComponent(isoDate)}`;

    selectedDate = date;
    workouts = [];
    error = null;
    loading = true;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch workouts");
      }

      workouts = await response.json();
    } catch (err: any) {
      console.error(err);
      error = err.message || "An error occurred";
    } finally {
      loading = false;
    }
  }
</script>

<div class="max-w-md mx-auto p-8 bg-slate-800">
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
      aria-label="Next Month"
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
        data-testid={`day-${date.day}-${date.currentMonth ? "current" : "other"}`}
        class={`p-2 text-center rounded 
      ${date.currentMonth ? "bg-lightblue text-white" : "bg-gray-100 text-black"}
      ${
        selectedDate &&
        selectedDate.getDate() === date.day &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear
          ? "bg-blue-500 text-white"
          : "hover:bg-gray-500"
      }
    `}
        type="button"
        aria-label={`Select Date ${date.day} ${date.currentMonth ? "current month" : "other month"}`}
      >
        {date.day}
      </button>
    {/each}
  </div>

  {#if selectedDate}
    <div class="mt-4 bg-blue-100 rounded text-sm p-4">
      <h3 class="text-lg font-semibold mb-2">
        Workouts on {selectedDate.toDateString()}
      </h3>

      {#if loading}
        <p>Loading workouts...</p>
      {:else if error}
        <p class="text-red-500">Error: {error}</p>
      {:else if workouts.length === 0}
        <p>No workouts found for this date.</p>
      {:else}
        <ul class="list-disc list-inside">
          {#each workouts as workout}
            <li>
              <strong>{workout.type}</strong> - {workout.duration} minutes, {workout.caloriesBurned}
              calories
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  {/if}
</div>
