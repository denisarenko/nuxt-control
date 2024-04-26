<template>
  <svg aria-hidden="true">
    <use :href="'/editor-icons.svg#' + name" />
  </svg>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  }
});
</script>
