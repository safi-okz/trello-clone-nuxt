// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-server-utils'],

  ui: {},

  nuxtServerUtils: {
            mongodbUri: process.env.MONGODB_URI
  },

  serverMiddleware: [
    { path: '/api', handler: '~/api/signup.ts' },
  ],
})
