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
      <!-- <Slider :min="5" :max="12" :step="1" v-model="nColors" /> -->
      <div class="space"></div>
      <Button @click="handleExtractClick"> Extraire la palette </Button>
    </chroma-group-layout>
    <figure class="image-preview">
      <img v-if="imagePreview" :src="imagePreview" alt="Image Preview" />
      <div v-else>Aucune image n'a été choisie</div>
    </figure>
    <chroma-group-layout>
      <ChromaColorSelector />
      <div class="space"></div>
      <Button @click="handleApplyClick()"> Appliquer les couleurs </Button>
    </chroma-group-layout>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import ChromaGroupLayout from '@/layouts/ChromaGroupLayout.vue';
import ChromaColorSelector from '@/components/ChromaColorSelector.vue';
import ChromaFileInput from '@/components/ChromaFileInput.vue';

import { computed, ref, toValue } from 'vue';
import { useColorStore } from '@/stores/colors';
import { useColor } from '@/composables/useColor';
import init, { extract_palette, add_matching_tint } from '@wasm/chroma_wasm';

const colorStore = useColorStore();

const extracted = ref<string[]>([]);
const nColors = ref<number>(5);

const image = ref<Blob | null>(null);
const imagePreview = computed(() => {
  if (image.value) {
    return URL.createObjectURL(image.value);
  }
});
const disableInputs = computed(() => {
  return !image.value;
});

const handleExtractClick = async () => {
  if (image.value && image.value.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const arrayBuffer = e.target.result;
      await init();
      extracted.value = extract_palette(
        new Uint8Array(arrayBuffer),
        toValue(nColors)
      ).map((color: { r: number; g: number; b: number }) =>
        useColor().rgbToHex(color)
      );
      colorStore.selected.setColors(extracted);
    };
    reader.readAsArrayBuffer(image.value);
  } else {
    alert('Please upload a valid image file');
  }
};

const handleApplyClick = () => {
  colorStore.setColors(
    colorStore.selected.colors.filter((c) => c.selected).map((c) => c.value)
  );
};
</script>

<style scoped>
.image-importer {
  @apply flex gap-12 rounded-lg py-6 px-8;

  .image-preview {
    @apply flex flex-col items-center justify-center;
    @apply border rounded-lg;
    @apply w-96;
    @apply overflow-clip;

    background-image: radial-gradient(oklch(var(--nc)) 2px, transparent 2px);
    background-size: 32px 32px;
    background-color: transparent;

    div {
      @apply rounded-lg p-3 border;
    }
  }
}
</style>
