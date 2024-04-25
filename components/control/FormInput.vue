<template>
  <label class="relative block">
    <span v-if="$attrs['label']" class="mb-1 block text-sm font-medium">
      {{ $attrs["label"] }}
    </span>

    <textarea
      v-if="$attrs['type'] === 'textarea'"
      v-model="model"
      rows="3"
      class="control-input"
      v-bind="$attrs"
    />

    <input
      v-else
      v-model="model"
      class="control-input leading-[2.4] file:hidden"
      type="text"
      v-bind="$attrs"
    />

    <ControlFormValidate :name="$attrs['name']" />
  </label>
</template>

<script setup>
const model = defineModel({ type: [String, Number, File] });

defineOptions({ inheritAttrs: false });
</script>

<style>
.control-input {
  @apply min-h-10 w-full appearance-none rounded-lg px-4 py-2 text-sm;
  @apply bg-white ring-1 ring-slate-200 shadow placeholder:text-slate-400;
  @apply outline-none outline-offset-1 duration-300;
  @apply focus:outline-blue-200 focus:ring-blue-500;
  @apply disabled:bg-slate-100 disabled:text-slate-400;
}
</style>
