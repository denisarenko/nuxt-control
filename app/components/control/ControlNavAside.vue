<template>
  <aside class="bg-white ring-1 ring-slate-200 shadow rounded-3xl p-4 md:sticky top-5">
    <button
      type="button"
      class="md:hidden text-lg border-b flex w-full justify-between items-center px-4"
      :class="navActive ? 'border-slate-200 pb-3 mb-2' : 'border-transparent'"
      @click="navActive = !navActive"
    >
      Navigation

      <Transition
        enter-from-class="opacity-0 scale-75 duration-300"
        enter-to-class="opacity-100 scale-100 duration-300"
        leave-to-class="opacity-0"
        mode="out-in"
      >
        <svg v-if="navActive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="size-5 text-slate-300">
          <path
            fill="currentColor"
            d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"
          />
        </svg>

        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="size-5 text-slate-300">
          <path
            fill="currentColor"
            d="M0 88C0 74.7 10.7 64 24 64H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 112 0 101.3 0 88zM0 248c0-13.3 10.7-24 24-24H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zM448 408c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H424c13.3 0 24 10.7 24 24z"
          />
        </svg>
      </Transition>
    </button>

    <Transition
      enter-from-class="opacity-0 scale-95 duration-500"
      enter-to-class="opacity-100 scale-100 duration-500"
      leave-to-class="opacity-0"
      mode="out-in"
    >
      <div v-if="navActive" class="grid gap-2">
        <template v-for="menu in navigation" :key="menu">
          <NuxtLink
            v-if="!menu.divide && menu.link !== null"
            :to="menu.link"
            active-class="ring-1 ring-slate-200 shadow pointer-events-none"
            class="px-4 py-2 hover:bg-slate-50 rounded-xl duration-200"
          >
            {{ menu.name }}
          </NuxtLink>

          <div v-if="menu.divide" class="uppercase text-xs px-4 font-semibold opacity-50 my-2">
            {{ menu.name }}
          </div>

          <div v-for="submenu in menu.dropdown" class="grid gap-2">
            <NuxtLink
              :to="submenu.link"
              active-class="ring-1 ring-slate-200 shadow pointer-events-none"
              class="px-4 py-2 hover:bg-slate-50 rounded-xl duration-200"
            >
              {{ menu.name }}: {{ submenu.name }}
            </NuxtLink>
          </div>
        </template>
      </div>
    </Transition>
  </aside>
</template>

<script setup>
defineProps({
  navigation: {
    type: Array,
    required: true
  }
});

const navActive = ref(true);

onMounted(() => {
  if (window.innerWidth < 768) navActive.value = false;

  window.addEventListener('resize', () => {
    navActive.value = window.innerWidth >= 768;
  });
});
</script>
