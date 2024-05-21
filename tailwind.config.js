import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts,js,vue}'],
  theme: {
    extend: {
      fontFamily: ['Rubik', 'sans-serif'],
    },
  },
  daisyui: {
    themes: ['dim', 'fantasy'],
  },
  plugins: [daisyui],
};
