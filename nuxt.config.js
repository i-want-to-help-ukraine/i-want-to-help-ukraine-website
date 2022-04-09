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
    '@nuxtjs/firebase',
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

    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_USER_AVATARS_PRESET_NAME:
      process.env.CLOUDINARY_USER_AVATARS_PRESET_NAME,
    CLOUDINARY_USER_AVATARS_FOLDER_NAME:
      process.env.CLOUDINARY_USER_AVATARS_FOLDER_NAME,
    FIRE_API_KEY: process.env.FIRE_API_KEY,
    FIRE_DOMAIN: process.env.FIRE_DOMAIN,
    FIRE_PROJECT_ID: process.env.FIRE_PROJECT_ID,
    FIRE_STORAGE_BUCKET: process.env.FIRE_STORAGE_BUCKET,
    FIRE_SENDER_ID: process.env.FIRE_SENDER_ID,
    FIRE_APP_ID: process.env.FIRE_APP_ID,
  },
  gtm: {
    id: 'GTM-PBHXKWP',
  },
  firebase: {
    config: {
      apiKey: process.env.FIRE_API_KEY,
      authDomain: process.env.FIRE_DOMAIN,
      projectId: process.env.FIRE_PROJECT_ID,
      storageBucket: process.env.FIRE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIRE_SENDER_ID,
      appId: process.env.FIRE_APP_ID,
    },
    services: {
      auth: {
        initialize: {
          onAuthStateChangedAction: 'auth/onAuthStateChangedAction',
        },
        // ssr: false,
      },
    },
  },
}
