import { defineStore } from 'pinia';
import { useSelectedStore } from './selected';
import { MaybeRef, ref, toValue } from 'vue';

export const useColorStore = defineStore('colors', () => {
  const colors = ref<string[]>([]);

  const selected = useSelectedStore();

  function setColors(_colors_array: MaybeRef<string[]>): void {
    colors.value = toValue(_colors_array);
  }

  return {
    colors,
    selected,
    setColors,
  };
});
