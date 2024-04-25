<template>
  <div v-if="editor" class="flex" :class="[classColor, classToolbar]">
    <template v-for="tool in toolbar" :key="tool.type">
      <button
        v-if="!tool.divide"
        type="button"
        :class="[classButton, { 'ring-blue-500': tool.type && editor.isActive(tool.type, tool.attr) }]"
        :disabled="editSource && tool.type !== 'source'"
        @click="tool.action"
      >
        <FormEditorIcon :name="typeof tool.icon === 'function' ? tool.icon() : tool.icon" class="size-4" />
      </button>

      <div v-if="tool.divide" class="border-r border-current opacity-10" />
    </template>
  </div>
</template>

<script setup>
const { classButton, classColor, classToolbar } = inject('styles');
const { setLink, uploadImage, editSource, youtubeLink } = inject('actions');

const { editor } = defineProps({
  editor: {
    type: Object,
    required: true
  }
});

const toolbar = ref([
  {
    type: 'heading',
    attr: { level: 2 },
    icon: 'h2',
    title: 'Heading 2',
    action: () => editor.chain().focus().toggleHeading({ level: 2 }).run()
  },
  {
    type: 'heading',
    attr: { level: 3 },
    icon: 'h3',
    title: 'Heading 3',
    action: () => editor.chain().focus().toggleHeading({ level: 3 }).run()
  },
  {
    type: 'heading',
    attr: { level: 4 },
    icon: 'h4',
    title: 'Heading 4',
    action: () => editor.chain().focus().toggleHeading({ level: 4 }).run()
  },
  {
    type: 'paragraph',
    icon: 'paragraph',
    title: 'Paragraph',
    action: () => editor.chain().focus().setParagraph().run()
  },

  {
    divide: true
  },

  {
    type: 'bold',
    icon: 'bold',
    title: 'Bold',
    action: () => editor.chain().focus().toggleBold().run()
  },
  {
    type: 'italic',
    icon: 'italic',
    title: 'Italic',
    action: () => editor.chain().focus().toggleItalic().run()
  },
  {
    type: 'strike',
    icon: 'strikethrough',
    title: 'Strike',
    action: () => editor.chain().focus().toggleStrike().run()
  },

  {
    divide: true
  },

  {
    type: 'link',
    icon: () => (!editor.isActive('link') ? 'link' : 'link-unlink'),
    title: 'Link',
    action: () => {
      if (!editor.isActive('link')) {
        setLink.value = true;
      } else {
        editor.chain().focus().unsetLink().run();
      }
    }
  },

  {
    type: 'blockquote',
    icon: 'quotes',
    title: 'Blockquote',
    action: () => editor.chain().focus().toggleBlockquote().run()
  },
  {
    type: 'bulletList',
    icon: 'list-unordered',
    title: 'Bullet List',
    action: () => editor.chain().focus().toggleBulletList().run()
  },
  {
    type: 'orderedList',
    icon: 'list-ordered',
    title: 'Ordered List',
    action: () => editor.chain().focus().toggleOrderedList().run()
  },

  {
    type: 'table',
    icon: () => (!editor.isActive('table') ? 'table-view' : 'table-view'),
    title: 'Table',
    action: () => {
      if (editor.isActive('table')) {
        editor.chain().focus().deleteTable().run();
      } else {
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
      }
    }
  },

  {
    icon: 'image',
    type: 'image',
    title: 'image',
    action: () => (uploadImage.value = true)
  },

  {
    icon: 'youtube',
    type: 'youtube',
    title: 'Youtube',
    action: () => {
      if (youtubeLink.value) {
        editor.chain().focus().deleteSelection().run();
        youtubeLink.value = false;
      } else {
        youtubeLink.value = true;
      }
    }
  },

  {
    divide: true
  },

  {
    icon: 'format-clear',
    title: 'Clear Format',
    action: () => editor.chain().focus().unsetAllMarks().run()
  },
  {
    icon: 'separator',
    title: 'Divide',
    action: () => editor.chain().focus().setHorizontalRule().run()
  },

  {
    icon: 'source-code',
    type: 'source',
    title: 'Source Code',
    action: () => (editSource.value = !editSource.value)
  }
]);
</script>
