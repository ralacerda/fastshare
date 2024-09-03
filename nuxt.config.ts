// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  runtimeConfig: {
    public: {
      hostURL: "http://localhost:3000",
    },
    tursoUrl: "",
    tursoToken: "",
    oauth: {
      google: {
        clientId: "",
        clientSecret: "",
      },
    },
  },

  app: {
    head: {
      title: "Fast Share",
      htmlAttrs: {
        lang: "en",
      },
    },
  },

  alias: {
    "@db": "./db",
  },

  modules: ["nuxt-auth-utils"],
});
