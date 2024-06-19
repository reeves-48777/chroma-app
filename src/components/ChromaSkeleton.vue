<template>
  <div class="chroma-skeleton">
    <slot></slot>
  </div>
</template>

<style scoped>
.chroma-skeleton {
  background-image: repeating-linear-gradient(
    45deg,
    oklch(var(--nc)) 0,
    oklch(var(--nc)) 2px,
    transparent 0,
    transparent 50%
  );
  background-size: 32px 32px;
  background-color: transparent;
  @apply border rounded-lg;
}
</style>
