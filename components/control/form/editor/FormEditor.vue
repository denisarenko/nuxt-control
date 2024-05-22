<template>
  <div
    class="relative rounded-xl ring-1 ring-slate-200 shadow"
    :class="[darkBody ? 'bg-zinc-700 text-white' : 'bg-white', classColor]"
  >
    <ControlFormEditorToolbar v-if="editor" :editor />

    <div class="relative rounded-b-xl">
      <EditorContent class="article mx-auto max-w-4xl p-4" :editor @click="setLink = false" />

      <Transition
        enter-from-class="opacity-0"
        enter-to-class="opacity-100 duration-200"
        leave-to-class="opacity-0 duration-200"
      >
        <textarea
          v-if="editor && editSource"
          class="font-mono absolute inset-0 whitespace-pre-line text-black rounded-b-xl bg-slate-100 p-4 text-sm outline-none"
          @input="editor.commands.setContent($event.target.value, true)"
          v-html="editor.getHTML()"
        />
      </Transition>
    </div>

    <BubbleMenu
      v-if="editor"
      :editor
      :class="classBubbleMenu"
      :tippy-options="{ onHide: () => false, moveTransition: '.5s' }"
      :should-show="({ state, from, to }) => from === to || state.selection"
    >
      <template v-if="!editSource">
        <ControlFormEditorLink :editor />

        <ControlFormEditorTable :editor />

        <ControlFormEditorImage :editor />

        <ControlFormEditorYoutube :editor />
      </template>
    </BubbleMenu>

    <ControlFormValidate :name="$attrs['name']" />
  </div>
</template>

<script setup>
import { useEditor, EditorContent, BubbleMenu, Extension } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Youtube from '@tiptap/extension-youtube';
import TextAlign from '@tiptap/extension-text-align';

const TextStyles = Extension.create({
  addGlobalAttributes() {
    return [
      {
        types: ['paragraph', 'link'],
        attributes: {
          style: { default: null }
        }
      }
    ];
  }
});

const setLink = ref(false);
const uploadImage = ref(false);
const editSource = ref(false);
const youtubeLink = ref(false);

const { classButton, classToolbar, classColor, darkBody, sticky } = defineProps({
  classButton: {
    type: String,
    default: 'rounded-md bg-white p-1.5 shadow ring-1 ring-slate-200 hover:bg-slate-50 disabled:opacity-50 duration-200'
  },
  classToolbar: {
    type: String,
    default: 'sticky z-[1] gap-2 border-b border-slate-200 bg-white rounded-t-xl p-2'
  },
  sticky: {
    type: String,
    default: 'top-0'
  },
  classBubbleMenu: {
    type: String,
    default: 'divide-y overflow-hidden rounded-xl bg-white shadow-md shadow-black/5 ring-1 ring-slate-200'
  },
  classColor: {
    type: String,
    default: 'bg-white text-black'
  },
  darkBody: Boolean
});

provide('styles', { classButton, classToolbar, classColor, sticky });
provide('actions', { setLink, uploadImage, editSource, youtubeLink });

const model = defineModel({ type: String });

const editor = useEditor({
  content: model.value,
  extensions: [
    StarterKit.configure(),
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Placeholder.configure({ placeholder: 'Type Something' }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: { rel: null }
    }),
    Table.configure({ resizable: true }),
    TableRow,
    TableHeader,
    TableCell,
    Image.extend({
      addAttributes: () => ({
        ...Image.config.addAttributes(),
        class: { default: 'mr-auto' },
        style: { default: 'width: 100%' }
      })
    }).configure({
      inline: true
    }),
    Youtube.configure({
      width: '100%',
      nocookie: true,
      modestBranding: 'true'
    }),
    TextStyles
  ],
  onUpdate: ({ editor }) => (model.value = editor.getHTML())
});

onBeforeUnmount(() => editor.value.destroy());
</script>

<style>
.tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  @apply float-left text-slate-400 pointer-events-none h-0;
}

.tiptap {
  @apply font-normal outline-0;

  td,
  th {
    @apply relative;
  }

  .selectedCell:after {
    @apply pointer-events-none absolute inset-0 -z-[1] bg-slate-50 content-[''];
  }

  .column-resize-handle {
    @apply pointer-events-none absolute -inset-y-px -right-0.5 z-[1] w-1 bg-blue-500/50;
  }

  [contenteditable='false'] iframe {
    @apply pointer-events-none;
  }
}

.resize-cursor {
  @apply cursor-col-resize;
}

.range {
  @apply h-2 w-full appearance-none rounded border bg-white;

  &::-webkit-slider-thumb {
    @apply size-4 appearance-none rounded-full bg-white shadow shadow-black/20 ring-1 ring-slate-200;
  }
}

.ProseMirror-selectednode {
  @apply ring-2 ring-blue-500/50 duration-200;
}
</style>
