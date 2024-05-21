<template>
  <section class="commands">
    <div class="image-import">
      <div class="group">
        <h1>Importer depuis une image :</h1>
        <ChromaFileInput v-model:file="file" />
        <h1>Nombre de couleurs à extraire :</h1>
        <input
          type="range"
          min="5"
          max="12"
          step="1"
          value="5"
          class="range"
          v-model="nColors"
        />
        <span>{{ nColors }}</span>
        <div class="space"></div>
        <button
          :disabled="buttonDisabled"
          class="btn btn-accent text-xl"
          @click="handleExtractClick"
        >
          Extraire la palette
        </button>
        <div class="space"></div>
      </div>
      <figure class="image-preview">
        <img v-if="filePreview" :src="filePreview" alt="Image preview" />
        <div v-else>Aucune image n'a été choisie</div>
      </figure>
      <div v-if="file && extracted.length" class="palette-preview">
        <h1>Couleurs extraites:</h1>
        <div class="w-full h-full grid grid-rows-4 grid-cols-5 gap-2">
          <div
            v-for="(color, index) in extracted"
            :style="`background: ${extracted[index]}`"
            :key="index"
          ></div>
        </div>
      </div>
    </div>
    <!-- <div class="image-import">
      <div class="group">
        <h1>Importer depuis une image :</h1>
        <ChromaFileInput v-model:file="file" />
      </div>
      <figure class="image-preview">
        <img v-if="filePreview" :src="filePreview" alt="Image preview" />
        <div v-else>Aucune image n'a été choisie</div>
      </figure>
    </div>
    <div class="image-import">
      <div class="group">
        <h1>Importer depuis une image :</h1>
        <ChromaFileInput v-model:file="file" />
      </div>
      <figure class="image-preview">
        <img v-if="filePreview" :src="filePreview" alt="Image preview" />
        <div v-else>Aucune image n'a été choisie</div>
      </figure>
    </div> -->
  </section>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue';
import ChromaFileInput from '@/components/ChromaFileInput.vue';
import { extractPalette } from '@/core';
import init from '@wasm/chroma_wasm';

const extracted = ref([]);
const nColors = ref(5);

const file = ref<Blob | null>(null);
const filePreview = computed(() => {
  if (file.value) {
    return URL.createObjectURL(file.value);
  }
});

const buttonDisabled = computed(() => {
  if (file.value) {
    return false;
  }
  return true;
});

const handleExtractClick = async () => {
  if (file.value && file.value.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const arrayBuffer = e.target.result;
      await init();
      extracted.value = extractPalette(new Uint8Array(arrayBuffer), nColors);
      console.log('successfully extracted colors');
      console.log(extracted.value);
    };
    reader.readAsArrayBuffer(file.value);
  } else {
    alert('Please upload a valid image file');
  }
};
</script>

<style scoped>
.commands {
  @apply w-full flex flex-wrap bg-base-200 dark:bg-base-300 rounded-xl p-4 lg:p-8;

  .image-import {
    @apply bg-base-100 space-x-8 flex items-stretch justify-start rounded-lg py-6 px-8 self-start;

    .group {
      @apply flex flex-col space-y-2;

      .space {
        @apply grow;
      }
    }

    figure {
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

      div {
        @apply rounded-lg bg-base-100 p-3 border;
      }
    }
  }

  .image-preview {
    @apply w-64 flex flex-col items-center;
  }

  .palette-preview > div > div {
    @apply size-8 rounded-full;
  }
}
</style>
