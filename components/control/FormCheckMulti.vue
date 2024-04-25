<template>
  <label class="relative block">
    <span v-if="$attrs['label']" class="mb-1 block font-medium">{{
      $attrs["label"]
    }}</span>

    <span class="flex flex-wrap items-center gap-4">
      <label
        v-for="(category, index) in options"
        :key="index"
        class="relative cursor-pointer"
      >
        <input
          v-model="value"
          :type="$attrs['type'] || 'checkbox'"
          :name="$attrs['name']"
          class="control-color-secondary absolute inset-0 appearance-none rounded-xl checked:ring-1 checked:ring-green-500"
          :value="category[valueKey]"
        />

        <span class="relative block px-4 py-2">{{ category[nameKey] }}</span>
      </label>
    </span>

    <ControlFormValidate :name="$attrs['name']" />
  </label>
</template>

<script setup>
const value = defineModel({ type: [Array, String, Number, null] });

defineProps({
  options: {
    type: [Array, null],
    required: true,
  },
  valueKey: {
    type: String,
    default: "id",
  },
  nameKey: {
    type: String,
    default: "title",
  },
});

defineOptions({ inheritAttrs: false });
</script>
