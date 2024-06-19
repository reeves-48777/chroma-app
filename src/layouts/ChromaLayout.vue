<template>
  <section role="application">
    <slot name="header"></slot>
    <main>
      <slot></slot>
    </main>
    <slot class="footer" name="footer"></slot>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
section[role='application'] {
  @apply h-screen w-screen grid grid-cols-1 grid-rows-[auto_1fr] items-center justify-center relative;

  main {
    @apply w-full h-full flex flex-col items-center justify-center p-8 overflow-y-auto;
  }

  .footer {
    @apply w-full absolute;
  }
}
</style>
