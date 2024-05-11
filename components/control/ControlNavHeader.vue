<template>
  <nav class="relative max-sm:order-1 max-sm:w-full" @mouseleave="menuLinks.forEach((link) => (link.isActive = false))">
    <div class="ring-1 ring-slate-200 max-w-sm lg:max-w-xl rounded-full shadow bg-white overflow-auto flex p-1 gap-1">
      <NuxtLink
        to="/control"
        active-class="pointer-events-none"
        class="px-4 py-1 hover:ring-1 ring-slate-200 text-slate-400 hover:text-black rounded-full duration-200 flex -mr-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="size-4 m-auto">
          <path
            fill="currentColor"
            d="M272.5 5.7c9-7.6 22.1-7.6 31.1 0l264 224c10.1 8.6 11.4 23.7 2.8 33.8s-23.7 11.3-33.8 2.8L512 245.5V432c0 44.2-35.8 80-80 80H144c-44.2 0-80-35.8-80-80V245.5L39.5 266.3c-10.1 8.6-25.3 7.3-33.8-2.8s-7.3-25.3 2.8-33.8l264-224zM288 55.5L112 204.8V432c0 17.7 14.3 32 32 32h48V312c0-22.1 17.9-40 40-40H344c22.1 0 40 17.9 40 40V464h48c17.7 0 32-14.3 32-32V204.8L288 55.5zM240 464h96V320H240V464z"
          />
        </svg>
      </NuxtLink>

      <div v-for="menu in menuLinks" :key="menu">
        <NuxtLink
          :to="menu.link"
          v-if="menu.name.toLowerCase() !== 'home'"
          active-class="ring-1 ring-slate-200 shadow pointer-events-none"
          class="rounded-3xl block px-4 py-1 hover:ring-1 ring-slate-200 duration-200 cursor-pointer whitespace-nowrap"
          @mouseover="
            menuLinks.forEach((link) => (link.isActive = false));
            menu.isActive = true;
          "
        >
          {{ menu.name }}
        </NuxtLink>
      </div>
    </div>

    <template v-for="menu in menuLinks" :key="menu">
      <Transition
        enter-from-class="-translate-y-5 opacity-0 duration-300"
        enter-to-class="translate-x-0 opacity-100 duration-300"
        leave-to-class="-translate-y-5 opacity-0 duration-300"
        mode="out-in"
      >
        <div v-if="menu.dropdown && menu.isActive" class="absolute inset-x-8 -ml-2 -z-10">
          <div
            class="grid gap-2 bg-white rounded-b-2xl shadow-md p-2 ring-1 ring-slate-200"
            @mouseleave="menu.isActive = false"
          >
            <NuxtLink
              v-for="submenu in menu.dropdown"
              :to="submenu.link"
              active-class="ring-1 shadow pointer-events-none"
              class="px-4 py-1.5 hover:ring-1 ring-slate-200 rounded-xl block duration-200"
            >
              {{ submenu.name }}
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </template>
  </nav>
</template>

<script setup>
defineProps({
  menuLinks: {
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
