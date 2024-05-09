<template>
  <label class="block">
    <span v-if="$attrs['label']" class="mb-1 block font-medium">
      {{ $attrs['label'] }}
    </span>

    <span class="relative block">
      <select v-model="value" v-bind="!$attrs['options' || 'placeholder']" class="control-input peer">
        <option selected disabled value>{{ $attrs['placeholder'] }}</option>
        <slot>
          {{ $attrs['options'] }}
        </slot>
      </select>

      <ControlFormValidate :name="$attrs['name']" />
    </span>
  </label>
</template>

<script setup>
const value = defineModel({ type: [String, Number] });

defineOptions({ inheritAttrs: false });
</script>
