<template>
  <section class="commands">
    <ChromaImageImporter />
  </section>
</template>

<script setup lang="ts">
import ChromaImageImporter from './ChromaImageImporter.vue';
</script>

<style scoped>
.commands {
  @apply w-full flex flex-wrap bg-base-200 dark:bg-base-300 rounded-xl p-4 lg:p-8;
}
</style>
