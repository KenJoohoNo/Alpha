export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      overrideBrowserslist: [
        'last 2 versions',
        '> 1%',
        'Firefox ESR',
        'not dead',
        'not IE 11'
      ],
      grid: true,
      flexbox: true
    },
  },
}
