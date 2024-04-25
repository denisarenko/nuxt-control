<template>
  <section class="bg-white ring-1 ring-slate-200 shadow rounded-3xl">
    <header
      v-if="title?.length > 0"
      class="flex gap-4 items-center p-4 border-b top-0 sticky bg-white rounded-t-3xl"
    >
      <button
        v-if="back"
        class="group ring-1 ring-slate-200 rounded-lg p-2 duration-200 hover:shadow hover:bg-slate-50"
        @click="$router.back()"
        title="Back"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          class="size-4 text-slate-400 group-hover:text-slate-800 duration-200"
          fill="currentColor"
        >
          <path
            d="M15 239c-9.4 9.4-9.4 24.6 0 33.9L207 465c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L65.9 256 241 81c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L15 239z"
          />
        </svg>
      </button>

      <h2 class="text-2xl mr-auto">
        {{ title }}
      </h2>

      <NuxtLink
        v-if="actionName"
        :to="actionLink"
        class="ring-1 ring-slate-200 rounded-lg px-4 text-sm py-2 duration-200 hover:shadow hover:bg-slate-50"
      >
        {{ actionName }}
      </NuxtLink>
    </header>

    <div class="p-4 space-y-5">
      <slot />
    </div>

    <footer
      v-if="$slots.footer"
      class="flex gap-6 items-center p-4 border-t bg-white rounded-b-3xl sticky bottom-0"
    >
      <slot name="footer" />
    </footer>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: undefined,
  },
  actionName: {
    type: String,
    default: undefined,
  },
  actionLink: {
    type: String,
    default: undefined,
  },
  back: Boolean,
});
</script>

<style>
.control-btn {
  @apply relative isolate duration-200;
  @apply rounded-xl px-8 py-2.5;
  @apply bg-gradient-to-bl from-blue-400 to-orange-400;
  @apply hover:shadow-md hover:shadow-orange-400/20;

  &:after {
    @apply content-[''] bg-white/90 rounded-[11px];
    @apply absolute inset-px -z-10;
    @apply hover:bg-white/95 duration-200;
    @apply hover:scale-y-[.93] hover:scale-x-[.96];
  }
}
</style>
