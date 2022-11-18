import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - cooknet",
    title: "cooknet",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/globalFunction.js", "~/plugins/fontawesome.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/auth",
  ],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/auth/signin",
            method: "post",
            propertyName: "accessToken",
          },
          refresh: { url: "/refresh", method: "post", propertyName: "refresh" },
          user: {
            url: "/auth/account",
            method: "get",
            propertyName: "",
          },
          logout: false,
        },
        tokenRequired: true,
        tokenType: "Bearer",
      },
    },
    token: {
      prefix: "_token.",
      global: true,
    },
    redirect: {
      login: "/signin",
      logout: "/signin",
      callback: "/signin",
      home: "/home",
    },
  },

  router: {
    // base: "/",
    middleware: ["auth"],
  },

  env: {
    user: process.env.user_service,
    recipe: process.env.recipe_service,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.user_service,
    credentials: false,
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    defaultAssets: {
      font: {
        family: "Kanit",
      },
    },
    theme: {
      dark: false,
      themes: {
        light: {
          primary: "#388E3C",
          secondary: "#ef6c00",
          accent: "#8c9eff",
          error: "#ED4732",
          background: "#E5E5E5",
          green_bar: "#503B13",
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
