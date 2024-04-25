<template>
  <Transition enter-from-class="translate-y-4" enter-to-class="translate-y-0 duration-200">
    <span
      v-if="name && validate && validate[name]"
      class="pointer-events-none absolute -bottom-3 left-4 rounded-3xl bg-white px-2 text-sm font-medium text-red-800 shadow ring-1 ring-red-300"
    >
      {{ validate[name] }}
    </span>
  </Transition>
</template>

<script setup>
const { validate } = useValidate();

defineProps({
  name: {
    type: String,
    required: true
  }
});
</script>
