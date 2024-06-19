<template>
  <header class="bg-slate-500">
    <section class="identity">
      <figure>
        <img :src="logo" />
      </figure>
      <h1>Chroma</h1>
    </section>
    <ChromaThemeSwitcher />
  </header>
</template>

<script setup lang="ts">
import logo from '@/assets/rainbow.webp';
import ChromaThemeSwitcher from '@/components/ChromaThemeSwitcher.vue';
</script>

<style scoped>
header {
  @apply w-full p-6 flex items-center justify-between;

  .identity {
    @apply flex items-center space-x-6;

    figure {
      @apply size-16 rounded-lg overflow-clip;
    }

    h1 {
      @apply font-black text-4xl tracking-widest;
    }
  }
}
</style>
