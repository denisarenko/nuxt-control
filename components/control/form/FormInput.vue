<template>
  <label class="relative block">
    <span v-if="$attrs['label']" class="mb-1 block font-medium">
      {{ $attrs['label'] }}
    </span>

    <textarea v-if="$attrs['type'] === 'textarea'" v-model="model" rows="3" class="control-input" v-bind="$attrs" />

    <input v-else v-model="model" class="control-input file:hidden" type="text" v-bind="$attrs" />

    <ControlFormValidate :name="$attrs['name']" />
  </label>
</template>

<script setup>
const model = defineModel({ type: [String, Number, File] });

defineOptions({ inheritAttrs: false });
</script>

<style>
.control-input {
  @apply min-h-10 w-full appearance-none rounded-xl px-4 py-0.5;
  @apply bg-white ring-1 ring-slate-200 shadow placeholder:text-slate-400;
  @apply outline-none outline-offset-1 duration-300;
  @apply focus:outline-blue-200 focus:ring-blue-500;
  @apply disabled:bg-slate-100 disabled:text-slate-400;

  &:is(select) {
    background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="14" height="9" fill="none"%3E%3Cpath stroke="%23cbd5e1" stroke-width="2" d="m1 1 6 6 6-6"/%3E%3C/svg%3E');
    background-position: right 16px center;
    @apply pr-10 appearance-none;
    @apply bg-no-repeat;
  }
}
</style>
