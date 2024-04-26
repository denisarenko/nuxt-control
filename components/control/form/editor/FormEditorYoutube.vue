<template>
  <div
    v-if="editor.isActive('youtube') || youtubeLink"
    class="flex gap-1.5 p-1.5"
    :class="classColor"
  >
    <input
      v-model="linkHref"
      type="url"
      placeholder="Enter URL"
      class="bg-transparent px-2 outline-none"
    />

    <button v-if="linkHref" type="button" :class="classButton" @click="setHref">
      <ControlFormEditorIcon name="check-line" class="size-4" />
    </button>

    <button
      v-if="linkHref"
      type="button"
      :class="classButton"
      @click="linkHref = ''"
    >
      <ControlFormEditorIcon name="link-unlink" class="size-4" />
    </button>
  </div>
</template>

<script setup>
const { editor } = defineProps({
  editor: {
    type: Object,
    required: true,
  },
});

const { classButton, classColor } = inject("styles");
const { youtubeLink } = inject("actions");

const linkHref = ref();

const setHref = () => {
  editor.chain().focus().setYoutubeVideo({ src: linkHref.value }).run();
  linkHref.value = "";
  youtubeLink.value = false;
};
</script>
