<script>
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

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
</div>