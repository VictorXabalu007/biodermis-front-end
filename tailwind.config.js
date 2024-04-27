/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'brand-purple': '#C882B7',
        'dark-purple': '#462E40',
        'gray': {
          'neutral-400': '#989898',
          'neutral-600': '#656565',
        },
        'green': {
          'solid-800': '#52B788'
        }
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ] 
}