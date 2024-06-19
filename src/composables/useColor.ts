export function useColor() {
  const rgbToHex = (color: { r: number; g: number; b: number }) => {
    return `#${color.r}${color.g}${color.b}`;
  };

  return {
    rgbToHex,
  };
}
