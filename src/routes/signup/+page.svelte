<script>
  import { goto } from "$app/navigation";

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (res.ok) {
      console.log("User registered successfully:", result);
      goto("/signin");
    } else {
      console.error("Error registering user:", result.error);
    }
  }
</script>

<div class="h-full flex items-center justify-center">
  <div class="w-full max-w-md p-6 bg-white shadow-md rounded-md">
    <h1 class="text-2xl font-bold text-center mb-6">Sign Up</h1>
    <form class="space-y-4" on:submit={handleSubmit}>
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700"
          >Username</label
        >
        <input
          type="text"
          id="name"
          name="name"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter a username"
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
        <label for="weight" class="block text-sm font-medium text-gray-700"
          >Weight</label
        >
        <input
          type="number"
          id="weight"
          name="weight"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter your weight"
        />
      </div>
      <div>
        <label for="age" class="block text-sm font-medium text-gray-700"
          >Age</label
        >
        <input
          type="number"
          id="age"
          name="age"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter your age"
        />
      </div>
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
        <button
          type="submit"
          class="w-full py-2 px-4 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Sign Up
        </button>
      </div>
    </form>
  </div>
</div>
