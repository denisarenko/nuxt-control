<template>
  <label class="relative block">
    <span v-if="$attrs['label']" class="mb-1 block font-medium">
      {{ $attrs["label"] }}
    </span>

    <span class="control-input flex flex-wrap items-center gap-2 !px-2">
      <label
        v-for="(category, index) in options"
        :key="index"
        class="relative cursor-pointer"
      >
        <input
          v-model="value"
          :type="$attrs['type'] || 'checkbox'"
          :name="$attrs['name']"
          class="peer absolute inset-0 appearance-none rounded-md hover:bg-slate-50 checked:bg-green-50 checked:ring-green-500 shadow ring-1 ring-slate-200 duration-200"
          :value="category[keyValue]"
        />

        <span
          class="relative block px-2 peer-checked:text-green-800 duration-200"
        >
          {{ category[keyName] }}
        </span>
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
  keyValue: {
    type: String,
    default: "id",
  },
  keyName: {
    type: String,
    default: "title",
  },
});

defineOptions({ inheritAttrs: false });
</script>
