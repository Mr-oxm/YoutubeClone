/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {screens: {
      'beyond': '1980px',
      // => @media (min-width: 1980px) { ... }
      'ultra': '3840px',
      // => @media (min-width: 3840px) { ... }
    },},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        youtubeDark: {
          "primary": "#f00",
          "secondary": "#3ea6ff",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#3f3f3f",
          "base-200": "#272727",
          "base-300": "#0f0f0f",
          "base-content": "#ffffff",
        },
        youtubeLight: {
          "primary": "#f00",
          "secondary": "#3ea6ff",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#e5e5e5",
          "base-200": "#f2f2f2",
          "base-300": "#ffffff",
          "base-content": "#0f0f0f",
        },
      },
      "business",
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
  ],
  },
}

