<template>
  <section class="bg-white ring-1 ring-slate-200 shadow rounded-3xl">
    <header
      v-if="title?.length > 0"
      class="flex gap-4 items-center py-3 px-4 border-b border-slate-200 top-0 sticky bg-white rounded-t-3xl z-[1]"
    >
      <button
        v-if="back"
        class="ring-1 ring-slate-200 rounded-lg size-8 duration-200 hover:shadow hover:bg-slate-50 text-slate-400 hover:text-black"
        @click="$router.back()"
        title="Back"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="size-4 m-auto">
          <path
            fill="currentColor"
            d="M15 239c-9.4 9.4-9.4 24.6 0 33.9L207 465c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L65.9 256 241 81c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L15 239z"
          />
        </svg>
      </button>

      <h2 class="text-lg lg:text-2xl mr-auto truncate max-w-full">
        {{ title }}
      </h2>

      <NuxtLink v-if="actionName" :to="actionLink" class="p-px rounded-xl duration-200 hover:shadow h-10" data-radial>
        <div
          class="bg-gradient-to-t from-green-50 ring-1 ring-green-600/30 to-white/90 px-3 md:px-5 py-1 whitespace-nowrap rounded-[11px] h-full flex items-center"
        >
          {{ actionName }}
        </div>
      </NuxtLink>
    </header>

    <div class="p-4 space-y-5">
      <slot />
    </div>

    <footer
      v-if="$slots.footer || submit"
      class="flex gap-6 items-center py-3 px-4 border-t border-slate-200 bg-white rounded-b-3xl sticky bottom-0"
    >
      <slot name="footer">
        <button type="submit" form="form" class="control-btn mx-auto">
          {{ submit || 'Submit' }}
        </button>
      </slot>
    </footer>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: undefined
  },
  submit: {
    type: String,
    default: undefined
  },
  actionName: {
    type: String,
    default: undefined
  },
  actionLink: {
    type: String,
    default: undefined
  },
  back: Boolean
});
</script>
