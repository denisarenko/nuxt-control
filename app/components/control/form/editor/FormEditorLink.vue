<template>
  <div v-if="editor.isActive('link') || setLink" class="flex gap-1.5 p-1.5" :class="classColor">
    <input v-model="linkHref" type="url" placeholder="Enter URL" class="bg-transparent px-2 outline-none" />

    <button
      v-if="linkHref && linkHref !== editor.getAttributes('link').href"
      type="button"
      class="leading-none text-xs"
      :class="[classButton, { '!ring-blue-500 text-blue-800': linkNoFollow }]"
      @click="linkNoFollow = !linkNoFollow"
    >
      Nofollow
    </button>

    <button
      v-if="linkHref && linkHref !== editor.getAttributes('link').href"
      type="button"
      :class="classButton"
      @click="setHref"
    >
      <ControlFormEditorIcon name="check-line" class="size-4" />
    </button>

    <button v-if="linkHref" type="button" :class="classButton" @click="editor.chain().focus().unsetLink().run()">
      <ControlFormEditorIcon name="link-unlink" class="size-4" />
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

const linkNoFollow = ref(false);

const setHref = () => {
  editor
    .chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: linkHref.value, rel: linkNoFollow.value ? 'noopener noreferrer nofollow' : null })
    .run();

  setLink.value = false;
};

watchEffect(() => {
  if (editor) linkHref.value = editor.getAttributes('link').href || '';
});
</script>
