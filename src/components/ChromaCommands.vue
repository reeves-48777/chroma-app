<template>
  <section class="commands">
    <div class="image-import">
      <div class="group">
        <h1>Importer depuis une image :</h1>
        <ChromaFileInput v-model:file="file" />
        <div class="space"></div>
        <button
          :disabled="buttonDisabled"
          class="btn btn-accent text-xl"
          @click="extractPalette"
        >
          Extraire la palette
        </button>
        <div class="space"></div>
      </div>
      <figure class="image-preview">
        <img v-if="filePreview" :src="filePreview" alt="Image preview" />
        <div v-else>Aucune image n'a été choisie</div>
      </figure>
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
import { computed, ref } from 'vue';
import ChromaFileInput from '@/components/ChromaFileInput.vue';

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

const extractPalette = () => {
  alert('Extraction de la palette en cours');
};
</script>

<style scoped>
.commands {
  @apply w-full flex flex-wrap bg-base-100 rounded-xl p-4 lg:p-8 border;

  .image-import {
    @apply space-x-8 flex items-stretch justify-start border rounded-lg py-2 px-4 self-start;

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
}
</style>
