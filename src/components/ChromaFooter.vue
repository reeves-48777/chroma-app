<template>
  <footer class="bg-card flex flex-col items-center">
    <div class="mark"></div>
    <PaletteViewer />
  </footer>
</template>

<script setup lang="ts">
import PaletteViewer from './PaletteViewer.vue';
</script>

<style scoped>
footer {
  @apply w-full p-6 flex items-center justify-between;
}
.mark {
  @apply h-4 w-1/6 bg-muted rounded-lg;
}
</style>
