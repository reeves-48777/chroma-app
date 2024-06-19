<script setup lang="ts">
import PaletteColor from '@/components/PaletteColor.vue';
import ChromaSkeleton from '@/components/ChromaSkeleton.vue';
import { useColorStore } from '@/stores/colors';

const colorStore = useColorStore();
</script>

<template>
  <div class="container">
    <section v-if="colorStore.colors.length" class="view-palette">
      <div v-for="(_, index) in colorStore.colors" :key="index">
        <PaletteColor v-model:color="colorStore.colors[index]" />
      </div>
    </section>
    <chroma-skeleton v-else>
      <div class="w-full h-32"></div>
    </chroma-skeleton>
  </div>
</template>

<style scoped>
.container {
  @apply space-y-8 p-8 rounded-xl;
}

.view-palette {
  @apply w-full flex flex-row justify-center flex-wrap flex-[1_1_30%] box-border gap-2;
}
</style>
