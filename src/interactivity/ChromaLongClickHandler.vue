<template>
  <div
    @mousedown="startLongPress"
    @mouseup="endLongPress"
    @mouseleave="cancelLongPress"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ClickHandler } from 'chroma';

interface HandlerProps {
  mouseover: ClickHandler;
}
const props = defineProps<HandlerProps>();

let timer: number | null = null;
const isPressing = ref<boolean>(false);

const startLongPress = () => {
  timer = setTimeout(() => {
    isPressing.value = true;
    props.mouseover();
  }, 500);
};

const endLongPress = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  isPressing.value = false;
};

const cancelLongPress = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};
</script>
