<template>
  <div
    v-if="colorStore.selected.colors.length"
    class="palette-preview bg-gray-900"
  >
    <h1>Selectionnez les couleurs:</h1>
    <div class="mt-2 w-full grid grid-rows-4 grid-cols-5 gap-4">
      <ChromaColorSelectButton
        v-for="(color, index) in colorStore.selected.colors"
        :key="index"
        :data="color"
        @click="handleColorClick(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChromaColorSelectButton from '@/components/ChromaColorSelectButton.vue';

import { useColorStore } from '@/stores/colors';

const colorStore = useColorStore();

const handleColorClick = (_index: number) => {
  colorStore.selected.select(_index);
};
</script>

<style scoped>
.palette-preview {
  @apply rounded-xl p-4;
}
</style>
