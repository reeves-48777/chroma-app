<template>
  <Button variant="outline" @click="toggleTheme">
    <Moon v-if="light" class="animate-in spin-in-90 fade-in-60" />
    <Sun v-else class="animate-out spin-out-90 fade-out-60" />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useColorMode } from '@vueuse/core';
import { Moon, Sun } from 'lucide-vue-next';
import { Button } from './ui/button';

const mode = useColorMode();
mode.value = 'auto';

const light = ref(false);

const toggleTheme = () => {
  light.value = !light.value;
  if (light.value) {
    mode.value = 'light';
  } else {
    mode.value = 'dark';
  }
};
</script>
