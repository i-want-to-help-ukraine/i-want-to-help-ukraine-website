export default {
  target: 'server',
  server: {
    port: process.env.PORT,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'VolunteersUA',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1 maximum-scale=1.0',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'VolunteersUA',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/vue-select.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    './plugins/croppa.js',
    './plugins/vue-js-modal.js',
    './plugins/clipboard.js',
    './plugins/vue-select.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://www.npmjs.com/package/@nuxtjs/dotenv
    '@nuxtjs/dotenv',
    '@nuxtjs/apollo',
    '@nuxtjs/cloudinary',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.GRAPHQL_URL,
      },
    },
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  },
}
