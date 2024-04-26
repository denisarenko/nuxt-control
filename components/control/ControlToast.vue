<template>
  <Teleport to="body">
    <Transition
      enter-from-class="scale-90 translate-y-10 opacity-0"
      enter-to-class="scale-100 translate-y-0 opacity-100 duration-300"
      leave-to-class="scale-90 translate-y-10 opacity-0 duration-300"
    >
      <div
        v-if="toastMessage"
        class="fixed ring-1 ring-slate-200 bottom-5 right-5 z-50 flex max-w-[400px] items-center gap-3 rounded-xl bg-white p-5 shadow-md"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" v-if="toastType === 'success'" class="size-6 text-green-500"><path fill="currentColor" d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM363.3 203.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L224 297.4l-52.7-52.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l64 64c6.2 6.2 16.4 6.2 22.6 0l128-128z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" v-if="toastType === 'error'" class="size-6 text-red-500"><path fill="currentColor" d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM180.7 180.7c-6.2 6.2-6.2 16.4 0 22.6L233.4 256l-52.7 52.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L256 278.6l52.7 52.7c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L278.6 256l52.7-52.7c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L256 233.4l-52.7-52.7c-6.2-6.2-16.4-6.2-22.6 0z"/></svg>

        {{ toastMessage }}
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const { toastType, toastMessage, onMouseEnter, onMouseLeave } = useToast();
</script>
