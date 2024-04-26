<template>
  <nav v-if="totalPages >= 2" class="flex justify-center text-sm *:min-w-10 *:duration-200">
    <button
      v-if="currentPage >= 2"
      class="size-10 rounded-l-lg ring-1 ring-slate-200 shadow bg-white"
      title="Previous Page"
      @click="currentPage--"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="size-3 mx-auto text-slate-400">
        <path
          fill="currentColor"
          d="M15 239c-9.4 9.4-9.4 24.6 0 33.9L207 465c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L65.9 256 241 81c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L15 239z"
        />
      </svg>
    </button>

    <button
      v-for="page in pages"
      :key="page"
      class="size-10 ring-1 ring-slate-200 shadow bg-white hidden first:rounded-l-lg last:rounded-r-lg md:block"
      :class="{
        'pointer-events-none font-semibold text-blue-600 !ring-blue-200 z-[1]': page === currentPage,
        'pointer-events-none text-slate-300': page === '...'
      }"
      @click="currentPage = Number(page)"
    >
      {{ page }}
    </button>

    <button
      v-if="totalPages > currentPage"
      class="size-10 rounded-r-lg ring-1 ring-slate-200 shadow bg-white"
      title="Next Page"
      @click="currentPage++"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="size-3 mx-auto text-slate-400">
        <path
          fill="currentColor"
          d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z"
        />
      </svg>
    </button>
  </nav>
</template>

<script setup>
const { totalPages } = defineProps({
  totalPages: {
    type: Number,
    required: true
  }
});

const router = useRouter();
const route = useRoute();
const routePage = Number(route.query.page);
const currentPage = ref(routePage || 1);

const pages = computed(() => {
  const show = 5;
  const start = Math.max(currentPage.value - Math.floor(show / 2), 1);
  const end = Math.min(start + show - 1, totalPages);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  if (start > 1) {
    pages.unshift('...');
    if (start >= 2) pages.unshift(1);
  }

  if (end < totalPages) {
    if (end <= totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  return pages;
});

if (routePage <= 1 ?? isNaN(routePage)) {
  router.push({ query: { ...route.query, page: undefined } });
  currentPage.value = 1;
}

watch(currentPage, () => {
  router.push({ query: { ...route.query, page: currentPage.value } });

  if (currentPage.value <= 1) router.push({ query: { ...route.query, page: undefined } });
});
</script>
