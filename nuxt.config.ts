export default {
  server: {
    port: 3000, // Change to an available port
    host: '0.0.0.0' // Listen on all network interfaces
  },

  head: {
    title: 'Experiment',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-vue/dist/bootstrap-vue.css'
  ],

  plugins: [
    '~/plugins/bootstrap-vue.js',
    '~/plugins/cookies.js'
  ],

  components: true,
  buildModules: [],
  modules: [],
  build: {},

  compatibilityDate: '2024-07-10'
};
