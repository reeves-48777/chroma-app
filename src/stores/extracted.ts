import { defineStore } from 'pinia';
import { ref, MaybeRef, toValue } from 'vue';

export const useExtractedStore = defineStore('extracted', () => {
  const colors = ref<string[]>([]);

  function add(_color: MaybeRef<string>) {
    const color = toValue(_color);
    const index = colors.value.findIndex((clr) => clr === color);
    if (index === -1) {
      colors.value.push(color);
    }
  }
  
  function setColors(_arr: MaybeRef<string[]>) {
    colors.value = toValue(_arr);
  }

  function remove(_color: MaybeRef<string>) {
    const color = toValue(_color);
    const index = colors.value.findIndex((clr) => clr === color);
    if (index !== -1) {
      colors.value.splice(index, 1);
    }
  }

  return {
    colors,
    add,
    setColors,
    remove,
  };
});
