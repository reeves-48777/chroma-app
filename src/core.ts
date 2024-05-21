import init, { extract_palette } from '@wasm/chroma_wasm';
import { MaybeRef, toValue } from 'vue';

export const extractPalette = (
  arrayBuffer: Uint8Array,
  nColors: MaybeRef<number>
) => {
  return extract_palette(arrayBuffer, toValue(nColors)).map(
    (c: any) => `rgba(${c[0]}, ${c[1]}, ${c[2]}, 1)`
  );
};
