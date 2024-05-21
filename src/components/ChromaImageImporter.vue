<template>
  <div class="image-importer">
    <chroma-group-layout>
      <h1>Extraire une palette depuis une image :</h1>
      <ChromaFileInput v-model:file="image" />
      <div class="space"></div>
      <h1>Nombre de couleurs à extraire: {{ nColors }}</h1>
      <input
        type="range"
        min="5"
        max="12"
        step="1"
        value="5"
        class="range"
        v-model="nColors"
        :disabled="disableInputs"
      />
      <div class="space"></div>
      <button
        :disabled="disableInputs"
        class="btn btn-accent text-xl"
        @click="handleExtractClick"
      >
        Extraire la palette
      </button>
      <div class="space"></div>
    </chroma-group-layout>
    <figure class="image-preview">
      <img v-if="imagePreview" :src="imagePreview" alt="Image Preview" />
      <div v-else>Aucune image n'a été choisie</div>
    </figure>
    <div v-if="image && extracted.length" class="palette-preview">
      <h1>Selectionnez les couleurs:</h1>
      <div class="mt-2 w-full grid grid-rows-4 grid-cols-5 gap-2">
        <button
          class="btn btn-circle"
          v-for="(color, index) in extracted"
          :style="[
            `background-color: ${color}}`,
            isSelected(color) ? 'border border-accent' : '',
          ]"
          :key="index"
          @click="handleColorClick(index)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChromaGroupLayout from '@/layouts/ChromaGroupLayout.vue';
import ChromaFileInput from './ChromaFileInput.vue';

import { computed, ref } from 'vue';
import init, { extract_palette } from '@wasm/chroma_wasm';

const extracted = ref<string[]>([]);
const nColors = ref<number>(5);

const selectedColors = ref<string[]>([]);

const image = ref<Blob | null>(null);
const imagePreview = computed(() => {
  if (image.value) {
    return URL.createObjectURL(image.value);
  }
});
const disableInputs = computed(() => {
  if (image.value) {
    return false;
  }
  return true;
});

const handleExtractClick = async () => {
  if (image.value && image.value.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const arrayBuffer = e.target.result;
      await init();
      extracted.value = extract_palette(
        new Uint8Array(arrayBuffer),
        nColors.value
      ).map((color: any) => `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`);
      console.log('successfully extracted colors');
      console.log(extracted.value);
    };
    reader.readAsArrayBuffer(image.value);
  } else {
    alert('Please upload a valid image file');
  }
};

const handleColorClick = (colorIndex: number) => {
  const index = selectedColors.value.findIndex(
    (color) => color === extracted.value[colorIndex]
  );
  if (index === -1) {
    selectedColors.value.push(extracted.value[colorIndex]);
  } else {
    selectedColors.value.splice(index, 1);
  }
};

const isSelected = (color: string) => {
  return selectedColors.value.includes(color);
};
</script>

<style scoped>
.image-importer {
  @apply flex gap-12 rounded-lg bg-base-100 py-6 px-8;
}

.image-importer figure {
  @apply rounded-lg flex items-center justify-center border overflow-clip;
  background-image: linear-gradient(
      45deg,
      oklch(var(--nc)) 3.125%,
      transparent 3.125%,
      transparent 50%,
      oklch(var(--nc)) 50%,
      oklch(var(--nc)) 53.125%,
      transparent 53.125%,
      transparent
    ),
    linear-gradient(
      45deg,
      oklch(var(--nc)) 3.125%,
      transparent 3.125%,
      transparent 50%,
      oklch(var(--nc)) 50%,
      oklch(var(--nc)) 53.125%,
      transparent 53.125%,
      transparent
    );
  background-size: 20px 20px;
  background-position: 0 0, 5px 5px; /* Ajuste la position du motif */
}

.image-importer figure div {
  @apply rounded-lg bg-base-100 p-3 border;
}

.image-preview {
  @apply w-64 flex flex-col items-center;
}
</style>
