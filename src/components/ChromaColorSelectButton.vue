<template>
  <div class="tooltip tooltip-accent tooltip-right" :data-tip="data.value">
    <!-- <button
      class="btn btn-circle btn-sm"
      :style="metaStyle"
      :class="{ selected: data.selected }"
    ></button> -->
    <Button class="rounded-full size-8" :style="metaStyle"></Button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Color } from '@/chroma';
import { Button } from './ui/button';

interface ColorButtonProps {
  data: Color;
}

const props = defineProps<ColorButtonProps>();

const metaStyle = computed(() => {
  let meta = `background: ${props.data.value}`;
  return meta;
});
</script>

<style scoped>
.selected {
  @apply border;
}
</style>
