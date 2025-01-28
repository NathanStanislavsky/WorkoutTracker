<script lang="ts">
  import { onMount } from "svelte";
  import { generateCalendar } from "./generateCalendar.ts";

  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let calendarDays = [];

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
</script>

<div class="max-w-md mx-auto p-4">
  <div class="flex justify-between items-center mb-4">
    <h2 class="text-xl font-semibold">
      {getMonthName(currentMonth)}
      {currentYear}
    </h2>
  </div>

  <div class="grid grid-cols-7 gap-2 text-center font-medium text-gray-700">
    {#each daysOfWeek as day}
      <div>{day}</div>
    {/each}
  </div>

  <div class="grid grid-cols-7 gap-2 mt-2">
    {#each calendarDays as date}
      <div
        class={`p-2 text-center rounded ${
          date.currentMonth ? "bg-white" : "bg-gray-100 text-gray-400"
        } hover:bg-blue-100 cursor-pointer`}
      >
        {date.day}
      </div>
    {/each}
  </div>
</div>
