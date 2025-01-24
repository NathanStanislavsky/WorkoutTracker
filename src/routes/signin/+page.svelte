<script>
  import { goto } from "$app/navigation";

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (res.ok) {
      console.log("User signed in successfully:", result);
      goto("/workout");
    } else {
      console.error("Error signing in user:", result.error);
    }
  }
</script>

<div class="flex-grow flex items-center justify-center bg-gray-100">
  <div class="w-1/3 mx-auto p-6 bg-white shadow-md rounded-md">
    <h1 class="text-2xl font-bold text-center mb-6">Sign In</h1>
    <form class="space-y-4" on:submit={handleSubmit}>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Email</label
        >
        <input
          type="email"
          id="email"
          name="email"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter an email"
        />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700"
          >Password</label
        >
        <input
          type="password"
          id="password"
          name="password"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter a password"
        />
      </div>
      <div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Sign In
        </button>
      </div>
    </form>
  </div>
</div>
