<template>
  <div class="bg-slate-50 min-h-dvh bg-dot text-slate-800">
    <div class="max-w-7xl mx-auto px-4">
      <header class="py-8 flex justify-between items-center">
        <div class="flex gap-5 items-center min-h-9">
          <NuxtLink to="/">
            <slot name="logo">
              <img src="https://placehold.co/150x40" alt="Control Panel Logo" />
            </slot>
          </NuxtLink>
        </div>

        <div v-if="hasAuth" class="flex gap-5 items-center">
          {{ accountData.name }}

          <button type="button" @click="logout" class="bg-white ring-1 ring-slate-200 rounded-full size-9 flex shadow">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="size-4 m-auto">
              <path
                d="M256 56a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm80 0A56 56 0 1 0 224 56a56 56 0 1 0 112 0zM179.4 116.4c-12.7-3.2-26.1-3.2-38.8 0l-1.5 .4c-12.3 3.1-23.7 9-33.3 17.4L53.5 180c-6.7 5.8-7.3 15.9-1.5 22.6s15.9 7.3 22.6 1.5l52.4-45.8c5.7-5 12.6-8.6 20-10.4l1.5-.4c7.6-1.9 15.6-1.9 23.3 0l16.9 4.2L153.2 257.9c-7.3 21.8 2 45.7 22 57l93.3 52.5L224.9 490.7c-2.9 8.3 1.4 17.5 9.8 20.4s17.5-1.4 20.4-9.8L298.6 378c5.2-14.7-.9-30.9-14.5-38.5l-37.5-21.1c.2-.4 .4-.9 .5-1.3l37.2-111.6L298 253.2c5.9 20.6 24.7 34.8 46.2 34.8H400c8.8 0 16-7.2 16-16s-7.2-16-16-16H344.1c-7.1 0-13.4-4.7-15.4-11.6l-20.3-71c-4.7-16.5-17.9-29.2-34.5-33.4l-94.5-23.6zm83 53.7L218.3 302.4 190.9 287c-6.7-3.8-9.8-11.7-7.3-19l36.2-108.6 42.7 10.7zM130 314.1L101.3 384H16c-8.8 0-16 7.2-16 16s7.2 16 16 16h85.3c13 0 24.7-7.8 29.6-19.8l23.3-56.6c-10-6.7-18.2-15.5-24.1-25.4zM458.5 444.2C445.6 480 433.6 480 432 480h0 0c-1.6 0-13.6 0-26.4-35.8c-9.4-26.3-16.8-66.4-19.9-124.2h-32c7.3 140.7 39.7 192 78.4 192c44.2 0 80-66.6 80-256S476.2 0 432 0c-41.6 0-75.8 59-79.6 224h32c1.8-75.3 10.1-125.3 21.2-156.2C418.4 32 430.4 32 432 32l0 0 0 0c1.6 0 13.6 0 26.4 35.8C471.1 102.9 480 162.5 480 256s-8.9 153.1-21.5 188.2z"
              />
            </svg>
          </button>
        </div>
      </header>

      <main v-if="hasAuth" class="grid grid-cols-[250px_1fr] items-start gap-8 pb-8">
        <aside class="bg-white ring-1 ring-slate-200 shadow grid gap-2 rounded-3xl p-4 sticky top-5">
          <template v-for="menu in menuLinks" :key="menu">
            <NuxtLink
              v-if="!menu.divide"
              :to="menu.link"
              active-class="ring-1 ring-slate-200 shadow"
              class="px-4 py-2 hover:bg-slate-50 rounded-lg duration-200"
            >
              {{ menu.name }}
            </NuxtLink>

            <div v-else class="uppercase text-xs px-4 font-semibold opacity-50 my-2">
              {{ menu.name }}
            </div>
          </template>
        </aside>

        <slot />
      </main>

      <section v-else class="bg-white ring-1 ring-slate-200 shadow rounded-3xl p-5 md:py-14">
        <slot name="auth" />
      </section>
    </div>
  </div>
</template>

<script setup>
defineProps({
  menuLinks: {
    type: Array,
    required: true
  },
  logout: {
    type: Function,
    required: true
  },
  hasAuth: Boolean,
  accountData: {
    type: Object
  }
});
</script>

<style>
.bg-dot {
  background-image: radial-gradient(circle at 2px 2px, theme('colors.slate.200') 1px, transparent 0);
  background-size: 16px 16px;
}
</style>