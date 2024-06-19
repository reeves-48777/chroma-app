import { defineStore } from 'pinia';
import { MaybeRef, ref, toValue } from 'vue';

import { Color } from '@/chroma';

export const useSelectedStore = defineStore('selected', () => {
  const colors = ref<Color[]>([]);

  function setColors(_colors_array: MaybeRef<string[]>) {
    colors.value = toValue(_colors_array).map((c) => {
      return new Color(c);
    });
  }

  function select(_index: MaybeRef<number>) {
    if (colors.value) {
      const colorIndex: number = toValue(_index);
      const color: Color = colors.value[colorIndex];
      
      if (color) {
        color.selected = !color.selected;
      }
    }
  }

  return {
    colors,
    setColors,
    select,
  };
});
