export default {
  target: 'server',
  ssr: false,
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
    '@nuxtjs/gtm',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.GRAPHQL_URL,
      },
    },
    includeNodeModules: true,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  },
  env: {
    APP_URL: process.env.APP_URL,
    GRAPHQL_URL: process.env.GRAPHQL_URL,

    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_API_URL: process.env.AUTH0_API_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,

    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_USER_AVATARS_PRESET_NAME:
      process.env.CLOUDINARY_USER_AVATARS_PRESET_NAME,
    CLOUDINARY_USER_AVATARS_FOLDER_NAME:
      process.env.CLOUDINARY_USER_AVATARS_FOLDER_NAME,
  },
  gtm: {
    id: 'GTM-PBHXKWP',
  },
}
