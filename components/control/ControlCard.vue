<template>
  <div
    class="w-full bg-white shadow ring-1 ring-slate-200 rounded-xl divide-y"
    :class="{ 'opacity-50 hover:opacity-100 duration-200': hidden }"
  >
    <div v-if="image?.length > 0" class="p-3 flex">
      <img :src="image" class="h-20 rounded-lg" :alt="title" />

      <NuxtLink
        v-if="open?.length > 0"
        :to="open"
        target="_blank"
        class="text-slate-400 hover:text-blue-500 duration-200 ml-auto mb-auto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="size-5">
          <path
            fill="currentColor"
            d="M384 64c17.7 0 32 14.3 32 32V416c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32H384zm64 32c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM168 160c-8.8 0-16 7.2-16 16s7.2 16 16 16h97.4L132.7 324.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L288 214.6V320c0 8.8 7.2 16 16 16s16-7.2 16-16V176c0-8.8-7.2-16-16-16H168z"
          />
        </svg>
      </NuxtLink>
    </div>

    <div class="p-3 flex-1 font-medium truncate max-w-full" :title>
      {{ title }}
    </div>

    <div class="control-details p-3 flex flex-wrap gap-3">
      <slot />

      <div v-if="hidden" class="bg-orange-50 flex items-center gap-1 text-orange-700 shadow ring-orange-200">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="size-4">
          <path
            fill="currentColor"
            d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm51.3 163.3l-41.9-33C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5zm-88-69.3L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8z"
          />
        </svg>

        Hidden
      </div>
    </div>

    <div
      v-if="$slots['actions'] || actionEdit || actionDelete"
      class="flex *:flex-1 *:p-2 *:duration-200 divide-x *:text-sm text-center rounded-b-xl overflow-hidden"
    >
      <slot name="actions">
        <NuxtLink :to="actionEdit" class="hover:bg-slate-50 flex gap-2 items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="size-3.5">
            <path
              d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
            />
          </svg>

          Edit
        </NuxtLink>

        <button
          type="button"
          @click="actionDelete"
          class="hover:bg-red-50/50 hover:text-red-500 flex gap-2 items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="size-3.5">
            <path
              fill="currentColor"
              d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80h13.7H416h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H412.4L388.4 452.7c-2.5 33.4-30.3 59.3-63.8 59.3H123.4c-33.5 0-61.3-25.9-63.8-59.3L35.6 128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80.1 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM83.7 128l23.8 321.2c.6 8.4 7.6 14.8 16 14.8H324.6c8.4 0 15.3-6.5 16-14.8L364.3 128H83.7zm62.2 81.9c7.8-7.8 20.5-7.8 28.3 0L224 259.7l49.9-49.9c7.8-7.8 20.5-7.8 28.3 0s7.8 20.5 0 28.3L252.3 288l49.9 49.9c7.8 7.8 7.8 20.5 0 28.3s-20.5 7.8-28.3 0L224 316.3l-49.9 49.9c-7.8 7.8-20.5 7.8-28.3 0s-7.8-20.5 0-28.3L195.7 288l-49.9-49.9c-7.8-7.8-7.8-20.5 0-28.3z"
            />
          </svg>

          Delete
        </button>
      </slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  hidden: Boolean,
  title: {
    type: String,
    required: true,
    default: 'No Title'
  },
  image: {
    type: String
  },
  open: {
    type: String,
    default: null
  },
  actionEdit: {
    type: String
  },
  actionDelete: {
    type: Function
  }
});
</script>

<style>
.control-details > div {
  @apply bg-white shadow ring-1 ring-slate-200 rounded-md px-2 py-0.5 text-sm;
}
</style>
