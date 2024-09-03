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
      link: [
        {
          href: "https://cdn.jsdelivr.net/npm/bulma@1.0.1/css/bulma.min.css",
          rel: "stylesheet",
        },
      ],
    },
  },

  alias: {
    "@db": "./db",
  },

  modules: ["nuxt-auth-utils"],
});
