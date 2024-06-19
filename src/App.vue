<script setup lang="ts">
import ChromaLayout from '@/layouts/ChromaLayout.vue';
import { defineAsyncComponent } from 'vue';

const ChromaHeader = defineAsyncComponent(
  () => import('@/components/ChromaHeader.vue')
);
const ChromaCommands = defineAsyncComponent(
  () => import('@/components/ChromaCommands.vue')
);

const ChromaFooter = defineAsyncComponent(
  () => import('@/components/ChromaFooter.vue')
);
</script>

<template>
  <chroma-layout>
    <template #header>
      <ChromaHeader />
    </template>
    <ChromaCommands />
    <template #footer>
      <ChromaFooter />
    </template>
  </chroma-layout>
</template>
