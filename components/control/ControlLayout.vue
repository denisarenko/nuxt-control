<template>
  <div class="bg-slate-50 min-h-dvh control-pattern-dots text-slate-800 isolate">
    <div v-if="hasAuth" class="max-w-7xl mx-auto px-4">
      <header class="relative py-8 flex flex-wrap justify-between items-center gap-4 z-10">
        <div class="flex gap-5 items-center shrink-0">
          <NuxtLink to="/">
            <slot name="logo">
              <img src="https://placehold.co/150x40" alt="Control Panel Logo" />
            </slot>
          </NuxtLink>
        </div>

        <ControlNavHeader v-if="!navAside" :menu-links />

        <div class="flex bg-white ring-1 ring-slate-200 shadow rounded-3xl overflow-hidden divide-x">
          <div class="whitespace-nowrap truncate py-2 px-4">
            {{ accountData.name }}
          </div>

          <button
            type="button"
            @click="logout"
            class="hover:bg-slate-50 hover:text-blue-500 text-slate-400 duration-200 p-3 pr-4 flex shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="size-4 m-auto">
              <path
                fill="currentColor"
                d="M272 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm-90.7 12.6c-14-3.5-28.7-3.5-42.7 0l-1.8 .5c-13.3 3.3-25.6 9.7-35.9 18.6L56.4 165.8c-10.1 8.6-11.2 23.8-2.6 33.8s23.8 11.2 33.8 2.6l44.5-38.2c4.7-4 10.3-6.9 16.3-8.4l1.8-.5c6.4-1.6 13-1.6 19.4 0l8.6 2.1-32.7 98c-8.5 25.5 2.3 53.4 25.7 66.5l88 49.5L225.1 480.8c-4 12.7 3.1 26.1 15.7 30.1s26.1-3.1 30.1-15.8L307 379.5c5.6-18-2.1-37.5-18.6-46.8l-32.1-18 28.1-84.4 5.6 18.2c7.2 23.5 28.9 39.5 53.5 39.5H352h16.5H392c13.3 0 24-10.7 24-24s-10.7-24-24-24H368.1c1.2-82.9 11.4-134.5 24.1-164c12.4-28.7 22.4-28.1 23.7-28l.1 0 .1 0c1.3-.1 11.3-.7 23.7 28c13.5 31.4 24.2 87.7 24.2 180s-10.7 148.6-24.2 180c-12.4 28.7-22.4 28.1-23.7 28l-.1 0-.1 0c-1.3 .1-11.3 .7-23.7-28c-10.1-23.4-18.6-60.5-22.2-116H352 321.9c8.8 140.7 47.6 192 94.1 192c53 0 96-66.6 96-256S469 0 416 0c-46.2 0-84.8 50.6-93.9 189.1l-5.8-18.9c-5.8-18.7-20.9-33.1-39.9-37.9l-95-23.7zm70.8 67.2l-38.3 115-19-10.7c-3.3-1.9-4.9-5.9-3.7-9.5L225 169l27.1 6.8zM122.5 317.1L103.4 368H24c-13.3 0-24 10.7-24 24s10.7 24 24 24h84.9c16.7 0 31.6-10.3 37.4-25.9l14.1-37.6-4.9-2.8c-14.1-8-25.4-19.3-33-32.6z"
              />
            </svg>
          </button>
        </div>
      </header>

      <main
        class="grid grid-cols-1 items-start gap-8 pb-8"
        :class="{ 'md:grid-cols-[250px_minmax(0,_1fr)]': navAside }"
      >
        <ControlNavAside v-if="navAside" :menu-links />

        <slot />
      </main>
    </div>

    <main v-else class="p-5 md:py-14">
      <section class="max-w-4xl mx-auto bg-white ring-1 ring-slate-200 shadow rounded-3xl py-10 md:py-16">
        <div class="flex justify-center mb-10">
          <slot name="logo">
            <img src="https://placehold.co/150x40" alt="Control Panel Logo" />
          </slot>
        </div>

        <slot name="auth" />
      </section>
    </main>

    <div class="fixed inset-0 -z-10 overflow-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" width="2121" height="1246" fill="none">
        <g filter="url(#blur)">
          <path fill="#DBEEFC" d="M953.49 1031.43 171.59 273 80 288.54l873.49 742.89Z" />
          <path fill="#EAEDFC" d="M1378 1165.33 596.1 406.9l-91.59 15.54L1378 1165.33Z" />
          <path fill="#F6E8F5" d="M753.8 1031.76 234.7 541.13l-104.78 18.85 623.88 471.78Z" />
          <path fill="#fff" d="M820.82 1140.58 236 604.5l-126.97 20.9 711.79 515.18Z" />
          <path fill="#DBEEFC" d="M1694.64 697.06 1058.49 80l-74.51 12.64 710.66 604.42Z" />
          <path fill="#EAEDFC" d="m2040.02 806-636.15-617.06-74.51 12.64L2040.02 806Z" />
          <path fill="#fff" d="m1532.17 697.33-422.34-399.18-85.24 15.33 507.58 383.85Z" />
          <path fill="#F1E6FF" d="M1589.74 777.22 1102 347.5l-103.5 27.85 591.24 401.87Z" />
        </g>
        <defs>
          <filter id="blur" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur result="blur" stdDeviation="40" />
          </filter>
        </defs>
      </svg>
    </div>

    <ControlToast />
  </div>
</template>

<script setup>
import ControlNavHeader from '~/components/control/ControlNavHeader.vue';

defineProps({
  menuLinks: {
    type: Array,
    required: true
  },
  logout: {
    type: Function,
    required: true
  },
  accountData: {
    type: Object
  },
  hasAuth: Boolean,
  navAside: Boolean
});
</script>

<style>
.control-pattern-dots {
  background-image: radial-gradient(circle at 2px 2px, theme('colors.slate.200') 1px, transparent 0);
  background-size: 16px 16px;
}

.control-pattern-lines {
  background-size: 12px 12px;
  background-image: repeating-linear-gradient(
    -45deg,
    transparent 0,
    theme('colors.slate.200') 1px,
    transparent 0,
    transparent 50%
  );
}
</style>
