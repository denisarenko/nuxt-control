<template>
  <label class="relative flex shrink-0 cursor-pointer items-center">
    <input
      v-model="model"
      class="peer h-7 w-12 cursor-pointer appearance-none rounded-full ring-1 ring-slate-200 shadow duration-200 checked:ring-green-600 checked:bg-green-500 checked:shadow-green-300"
      :type="type"
      :name="name"
    />

    <span
      class="pointer-events-none absolute ml-1 size-5 rounded-full bg-slate-200 duration-200 peer-checked:shadow peer-checked:translate-x-full peer-checked:bg-white"
    />

    <span class="ml-3">{{ label }}</span>
  </label>
</template>

<script setup>
const model = defineModel({ type: [Boolean] });

defineProps({
  label: {
    type: String,
    default: 'Label',
    required: true
  },
  name: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'checkbox'
  }
});
</script>
