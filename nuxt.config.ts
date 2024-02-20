
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-server-utils', '@sidebase/nuxt-auth'],

  ui: {},

  runtimeConfig: {
        auth: {
          secret: process.env.AUTH_SECRET,
          origin: process.env.AUTH_ORIGIN
        }
  },

  nuxtServerUtils: {
            mongodbUri: process.env.MONGODB_URI
  },

  // serverMiddleware: [
  //   // { path: '/api', handler: '~/api/signup.ts' },
  //   // {path: '/api', handler: '~/api/boards/index.get.ts'}
  // ],

   auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: "authjs"
    }
  }
})
