<template>
  <div v-if="editor.isActive('image')" :class="classColor">
    <div class="flex items-center gap-2 p-1.5">
      <ControlFormEditorIcon name="image-alt" class="size-4 shrink-0" />

      <input
        v-model="imageAlt"
        type="text"
        class="w-full bg-transparent text-xs outline-none"
        placeholder="Enter Alt"
        @focusout="setImage()"
      />
    </div>

    <div class="border-b border-current opacity-10" />

    <div class="flex justify-between gap-1.5 p-1.5">
      <template v-for="tool in toolbar" :key="tool.icon">
        <button
          v-if="!tool.divide"
          type="button"
          :class="[
            classButton,
            {
              'ring-blue-500': editor.getAttributes('image').class === tool.action
            }
          ]"
          @click="setImage(tool.action)"
        >
          <ControlFormEditorIcon :name="tool.icon" class="size-4" />
        </button>

        <div v-if="tool.divide" class="border-r border-current opacity-10" />
      </template>
    </div>

    <div class="border-b border-current opacity-10" />

    <div class="flex items-center gap-2 p-1.5">
      <input v-model="imageSize" type="range" min="20" max="100" class="range" @input="setImage()" />

      <span class="select-none text-xs text-current opacity-50"> {{ imageSize }}% </span>
    </div>
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
const { uploadImage } = inject('actions');

const imageSize = ref();
const imageAlt = ref();
const imageClass = ref();

const toolbar = ref([
  {
    icon: 'align-left',
    title: 'Align Left',
    action: 'mr-auto'
  },
  {
    icon: 'align-center',
    title: 'Align Center',
    action: 'mx-auto'
  },
  {
    icon: 'align-right',
    title: 'Align Right',
    action: 'ml-auto'
  },

  {
    divide: true
  },

  {
    icon: 'float-left',
    title: 'Float Left',
    action: 'float-left mr-4'
  },
  {
    icon: 'float-right',
    title: 'Float Right',
    action: 'float-right ml-4'
  }
]);

watchEffect(() => {
  if (editor) {
    imageSize.value = editor?.getAttributes('image').style?.replace(/\D/g, '');
    imageAlt.value = editor.getAttributes('image').alt;
    imageClass.value = editor.getAttributes('image').class;
  }
});

watch([uploadImage], () => {
  if (uploadImage.value) {
    const input = document.createElement('input');
    input.type = 'file';

    input.onchange = (event) => {
      const file = event.target.files[0];
      const body = new FormData();

      body.append('image', file);

      $fetch('/api/media/editor', {
        method: 'POST',
        params: { width: 1200 },
        body
      }).then((response) => {
        editor.commands.setImage({ src: response[0].url });
      });
    };

    input.click();

    uploadImage.value = false;
  }
});

const setImage = (align = null) => {
  if (align) imageClass.value = align;

  editor.commands.setImage({
    src: editor.getAttributes('image').src,
    alt: imageAlt.value,
    style: `width: ${imageSize.value}%`,
    class: imageClass.value
  });
};
</script>
