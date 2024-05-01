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
          'neutral-100' : '#EFEFEF',
          'neutral-200' : '#DCDCDC',
          'neutral-400': '#989898',
          'neutral-600': '#656565',
          'neutral-950' : '#292929'
        },
        'green': {
          'solid-300' : '#D8F3DC',
          'solid-800': '#52B788',
          'solid-600': '#95D5B2',
          'solid-900' : '#40916C'
        },

        'yeallow' : {
          'solid-400': '#FFF8D7',
          'solid-700': '#FFE566',
          'solid-900' : '#FFD400'
        },

        'purple' : {
          'solid-200' : '#F7ECF4',
          'solid-500' : '#B475A5',
          'solid-600' : '#B475A5',
          'solid-950' : '#462E40'
        },

        'gold-light': '#FBE588',
        'gold-dark': '#FBB637',
        'silver-light': '#E6EFF4',
        'silver-dark': '#A0A7AB',
        'bronze-light': '#F5B575',
        'bronze-dark': '#CE8135',


      },
      
      gradientColors: {

        'gold-gradient': 'bg-gradient-to-b from-gold-light to-gold-dark',
        'silver-gradient': 'bg-gradient-to-b from-silver-light to-silver-dark',
        'bronze-gradient': 'bg-gradient-to-b from-bronze-light to-bronze-dark',

      },
      

      
    
    },
  },
  plugins: [
    require('flowbite/plugin')
  ] 
}