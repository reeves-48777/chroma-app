<script setup lang="ts">
import { ref } from 'vue';

const color = defineModel<string>('color');

// todo color conversion (from 'red', '#f00', 0xFF0000 to '#FF0000')
const colorStyle = ref<string>(`background: ${color.value}`);

const handleMouseOver = () => {};
const handleMouseLeave = () => {};
</script>

<template>
  <div
    class="selector"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
  >
    <div class="palette-color" :style="colorStyle">
      <span class="uppercase font-bold"> {{ color }}</span>
    </div>
  </div>
</template>

<style scoped>
:root {
  --chroma-outer-border-spacing: 2px;
}

.palette-color {
  @apply relative select-none flex w-36 h-24 items-end justify-center p-2 rounded-sm;
}

.palette-color::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  transform-origin: center;
  transform: scale(1);
  background-color: oklch(var(--a));
}
.palette-color:hover::before {
  transform: scaleX(1.029) scaleY(1.042);
}
</style>
