<template>
  <ClientOnly>
    <div class="bg-slate-50 min-h-dvh control-pattern-dots text-slate-800 isolate">
      <div v-if="account?.hasAuth" class="max-w-7xl mx-auto px-4">
        <header class="relative py-8 flex flex-wrap justify-between items-center gap-4 z-10">
          <div class="flex gap-5 items-center shrink-0">
            <NuxtLink to="/">
              <slot name="logo">
                <img src="https://placehold.co/150x40" alt="Control Panel Logo" />
              </slot>
            </NuxtLink>
          </div>

          <ControlNavHeader v-if="!navAside" :navigation />

          <div class="p-px rounded-full" data-radial>
            <div class="flex shadow rounded-full overflow-hidden">
              <div class="whitespace-nowrap truncate py-2 px-4 bg-white mr-px">
                {{ account?.data?.name }}
              </div>

              <button
                type="button"
                @click="logout"
                class="bg-white/95 hover:text-orange-600 text-slate-400 duration-200 p-3 pr-4 flex shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="size-4 m-auto">
                  <path
                    fill="currentColor"
                    d="M256 56a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm80 0A56 56 0 1 0 224 56a56 56 0 1 0 112 0zM179.4 116.4c-12.7-3.2-26.1-3.2-38.8 0l-1.5 .4c-12.3 3.1-23.7 9-33.3 17.4L53.5 180c-6.7 5.8-7.3 15.9-1.5 22.6s15.9 7.3 22.6 1.5l52.4-45.8c5.7-5 12.6-8.6 20-10.4l1.5-.4c7.6-1.9 15.6-1.9 23.3 0l16.9 4.2L153.2 257.9c-7.3 21.8 2 45.7 22 57l93.3 52.5L224.9 490.7c-2.9 8.3 1.4 17.5 9.8 20.4s17.5-1.4 20.4-9.8L298.6 378c5.2-14.7-.9-30.9-14.5-38.5l-37.5-21.1c.2-.4 .4-.9 .5-1.3l37.2-111.6L298 253.2c5.9 20.6 24.7 34.8 46.2 34.8H400c8.8 0 16-7.2 16-16s-7.2-16-16-16H344.1c-7.1 0-13.4-4.7-15.4-11.6l-20.3-71c-4.7-16.5-17.9-29.2-34.5-33.4l-94.5-23.6zm83 53.7L218.3 302.4 190.9 287c-6.7-3.8-9.8-11.7-7.3-19l36.2-108.6 42.7 10.7zM130 314.1L101.3 384H16c-8.8 0-16 7.2-16 16s7.2 16 16 16h85.3c13 0 24.7-7.8 29.6-19.8l23.3-56.6c-10-6.7-18.2-15.5-24.1-25.4zM458.5 444.2C445.6 480 433.6 480 432 480h0 0c-1.6 0-13.6 0-26.4-35.8c-9.4-26.3-16.8-66.4-19.9-124.2h-32c7.3 140.7 39.7 192 78.4 192c44.2 0 80-66.6 80-256S476.2 0 432 0c-41.6 0-75.8 59-79.6 224h32c1.8-75.3 10.1-125.3 21.2-156.2C418.4 32 430.4 32 432 32l0 0 0 0c1.6 0 13.6 0 26.4 35.8C471.1 102.9 480 162.5 480 256s-8.9 153.1-21.5 188.2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <main
          class="grid grid-cols-1 items-start gap-8 pb-8"
          :class="{ 'md:grid-cols-[250px_minmax(0,_1fr)]': navAside }"
        >
          <ControlNavAside v-if="navAside" :navigation />

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

          <slot name="auth">
            <form class="mx-auto max-w-md space-y-8 px-6" @submit.prevent="login(formData)">
              <ControlFormInput v-model="formData.email" name="email" type="text" placeholder="Enter Email" />

              <ControlFormInput
                v-model="formData.password"
                name="password"
                type="password"
                placeholder="Enter Password"
              />

              <div class="text-center">
                <button type="submit" class="control-btn">Login</button>
              </div>
            </form>
          </slot>
        </section>
      </main>

      <div
        class="fixed inset-0 -z-10 overflow-hidden duration-500"
        :class="account?.hasAuth ? 'opacity-100' : 'opacity-0'"
      >
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
  </ClientOnly>
</template>

<script setup>
import { useAuth } from '~/composables/auth.js';

useSeoMeta({ robots: 'noindex, nofollow' });

defineProps({
  navigation: {
    type: Array,
    required: true
  },
  logout: {
    type: Function,
    default: undefined
  },
  account: {
    type: Object,
    default: undefined
  },
  hasAuth: Boolean,
  navAside: Boolean
});

const formData = reactive({ email: '', password: '' });

const { account, login, logout } = useAuth();

const gradientBorder = (event) => {
  const cards = document.querySelectorAll('[data-radial]');

  for (let card of cards) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }
};

onMounted(() => document.body.addEventListener('mousemove', gradientBorder));
onUnmounted(() => document.body.removeEventListener('mousemove', gradientBorder));
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

[data-radial] {
  --mouse-x: -100%;
  --mouse-y: -100%;

  background: radial-gradient(
    200px circle at var(--mouse-x) var(--mouse-y),
    theme('colors.orange.500'),
    theme('colors.violet.400'),
    theme('colors.slate.200')
  );
}
</style>
