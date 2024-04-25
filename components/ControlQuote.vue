<template>
  <blockquote class="text-center max-w-3xl mx-auto py-4 md:py-14 space-y-4">
    <svg
      class="size-8 mx-auto text-slate-300"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 18 14"
    >
      <path
        d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"
      />
    </svg>

    <p class="text-2xl">
      {{ quote.content }}
    </p>

    <div class="text-slate-500">
      {{ quote.author }}
    </div>
  </blockquote>
</template>

<script setup>
const { data: quote } = await useFetch("https://api.quotable.io/random?size=5");
</script>
