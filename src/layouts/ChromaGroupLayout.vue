<template>
  <div class="group" :class="groupMetaClass">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

enum Layout {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

interface GroupProps {
  layout?: string;
}
const props = withDefaults(defineProps<GroupProps>(), {
  layout: Layout.Vertical,
});

const groupMetaClass = computed(() => {
  return props.layout === Layout.Horizontal
    ? 'flex-row space-x-2'
    : 'flex-col space-y-2';
});
</script>

<style scoped>
.group {
  @apply flex;
}
</style>
