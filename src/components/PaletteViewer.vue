<script setup lang="ts">
import PaletteColor from './PaletteColor.vue';

interface ViewerProps {
  colors: string[];
}
//@ts-ignore
const props = defineProps<ViewerProps>();
</script>

<template>
  <div class="container">
    <section class="view-palette">
      <div v-for="(_, index) in colors" :key="index">
        <PaletteColor v-model:color="colors[index]" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  @apply space-y-8 p-8 rounded-xl bg-base-200 dark:bg-base-300;
}

.view-palette {
  @apply w-full flex flex-row justify-center flex-wrap flex-[1_1_30%] box-border gap-2;
}
</style>
