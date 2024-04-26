<template>
  <blockquote
    class="text-center max-w-3xl mx-auto py-4 md:py-14 space-y-4 min-h-64"
  >
    <TransitionGroup
      enter-from-class="opacity-0 -translate-x-14 duration-500"
      enter-to-class="opacity-100 translate-x-0 duration-500"
      leave-to-class="opacity-0 -translate-x-14"
    >
      <svg
        v-if="!pending"
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

      <p v-if="!pending" class="text-2xl min-h-8 delay-100">
        {{ quote?.content }}
      </p>

      <div v-if="!pending" class="text-slate-500 mx-auto min-h-7 delay-200">
        {{ quote?.author }}
      </div>
    </TransitionGroup>
  </blockquote>
</template>

<script setup>
const { data: quote, pending } = useLazyFetch(
  "https://api.quotable.io/random?size=2",
);
</script>
