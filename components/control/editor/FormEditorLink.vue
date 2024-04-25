<template>
  <div v-if="editor.isActive('link') || setLink" class="flex gap-1.5 p-1.5" :class="classColor">
    <input v-model="linkHref" type="url" placeholder="Enter URL" class="bg-transparent px-2 outline-none" />

    <button
      v-if="linkHref && linkHref !== editor.getAttributes('link').href"
      type="button"
      :class="classButton"
      @click="setHref"
    >
      <FormEditorIcon name="check-line" class="size-4" />
    </button>

    <button v-if="linkHref" type="button" :class="classButton" @click="editor.chain().focus().unsetLink().run()">
      <FormEditorIcon name="link-unlink" class="size-4" />
    </button>
  </div>
</template>

<script setup>
const { editor } = defineProps({
  editor: {
    type: Object,
    required: true
  }
});

const { classButton, classColor } = inject('styles');
const { setLink } = inject('actions');

const linkHref = ref();

const setHref = () => {
  editor.chain().focus().extendMarkRange('link').setLink({ href: linkHref.value }).run();

  setLink.value = false;
};

watchEffect(() => {
  if (editor) linkHref.value = editor.getAttributes('link').href || '';
});
</script>
