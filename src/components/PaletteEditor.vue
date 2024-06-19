<script setup lang="ts">
import { reactive } from 'vue';

import PaletteViewer from '@/components/PaletteViewer.vue';
import ChromaCommands from '@/components/ChromaCommands.vue';

const colors = reactive([]);
</script>

<template>
  <section class="editor">
    <ChromaCommands />
    <div class="divider text-2xl">Visualisation</div>
    <PaletteViewer v-model:colors="colors" />
  </section>
</template>

<style scoped>
.editor {
  @apply w-full h-full flex flex-col items-center rounded-xl p-4 lg:py-32 lg:px-64;
}
</style>
