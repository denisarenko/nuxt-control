<template>
  <label class="relative block">
    <span class="inline-flex">
      <input
        ref="input"
        v-model="value"
        class="peer mt-1 size-5 shrink-0 appearance-none rounded-md border border-gray-300 bg-white duration-200 checked:border-green-500 checked:bg-green-500"
        type="checkbox"
        v-bind="!$attrs['label']"
      />

      <span
        class="absolute mt-1 flex size-5 scale-150 opacity-0 duration-200 peer-checked:scale-100 peer-checked:opacity-100"
      >
        <SvgIcon name="check" class="m-auto size-3 text-white" />
      </span>

      <span class="ml-2 whitespace-pre-line">
        <slot name="label">
          {{ $attrs["label"] }}
        </slot>
      </span>
    </span>

    <ControlFormValidate :name="$attrs['name']" />
  </label>
</template>

<script setup>
const value = defineModel({ type: Boolean });

defineOptions({ inheritAttrs: false });
</script>
