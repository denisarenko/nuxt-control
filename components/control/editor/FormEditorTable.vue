<template>
  <div v-if="editor.isActive('table')" class="flex gap-1.5 p-1.5" :class="classColor">
    <template v-for="tool in toolbar" :key="tool.type">
      <button
        v-if="!tool.divide"
        type="button"
        :class="[classButton, { 'ring-blue-500': tool.type && editor.isActive(tool.type, tool.attr) }]"
        @click="tool.action"
      >
        <FormEditorIcon :name="typeof tool.icon === 'function' ? tool.icon() : tool.icon" class="size-4" />
      </button>

      <div v-if="tool.divide" class="border-r border-current opacity-10" />
    </template>
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

const toolbar = ref([
  {
    icon: 'insert-column-left',
    title: 'Add Column Left',
    action: () => editor.chain().focus().addColumnBefore().run()
  },
  {
    icon: 'insert-column-right',
    title: 'Add Column Right',
    action: () => editor.chain().focus().addColumnAfter().run()
  },
  {
    icon: 'delete-column',
    title: 'Delete Column',
    action: () => editor.chain().focus().deleteColumn().run()
  },

  {
    divide: true
  },

  {
    icon: 'insert-row-top',
    title: 'Add Row Top',
    action: () => editor.chain().focus().addRowBefore().run()
  },
  {
    icon: 'insert-row-bottom',
    title: 'Add Row Bottom',
    action: () => editor.chain().focus().addRowAfter().run()
  },
  {
    icon: 'delete-row',
    title: 'Delete Row',
    action: () => editor.chain().focus().deleteRow().run()
  },

  {
    divide: true
  },

  {
    icon: 'merge-cells',
    title: 'Merge or Split',
    action: () => editor.chain().focus().mergeOrSplit().run()
  }
]);
</script>
