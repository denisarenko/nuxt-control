<template>
  <label class="block">
    <span>{{ $attrs["label"] }}</span>
    <span class="relative block">
      <select
        v-model="value"
        v-bind="!$attrs['options' || 'placeholder']"
        class="control-input peer"
      >
        <option selected disabled value>{{ $attrs["placeholder"] }}</option>
        <slot>
          {{ $attrs["options"] }}
        </slot>
      </select>

      <SvgIcon
        name="chevron-down"
        class="text-primary absolute inset-y-0 right-4 size-3 h-full peer-focus:text-black"
      />

      <ControlFormValidate :name="$attrs['name']" />
    </span>
  </label>
</template>

<script setup>
const value = defineModel({ type: [String, Number] });

defineOptions({ inheritAttrs: false });
</script>
