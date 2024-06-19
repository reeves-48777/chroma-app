<template>
  <section class="commands">
    <Card>
      <ChromaImageImporter />
    </Card>
  </section>
</template>

<script setup lang="ts">
import ChromaImageImporter from './ChromaImageImporter.vue';
import Card from './ui/card/Card.vue';
</script>

<style scoped>
.commands {
  @apply w-full flex flex-wrap rounded-xl p-4 lg:p-8;
}
</style>
