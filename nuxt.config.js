import pkg from './package'
import articleList from './contents/summary.json'
import splitExt from './modules/splitExt'

export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa',
    '@nuxtjs/markdownit',

    '~/modules/splitExt'
  ],

  markdownit: {
    preset: 'default',
    linkify: false,
    breaks: true,
    html: true,
    typegraphy: true,
    injected: true,
    htmlOut: true,
    langPrefix: 'language-',
    use: [
      'markdown-it-meta',
      'markdown-it-highlightjs',
      'markdown-it-table-of-contents',
      'markdown-it-footnote',
      'markdown-it-mark',
      'markdown-it-video'
    ]
  },

  vuetify: {
    // Vuetify の設定はここに書く
    theme: {
      primary: '#3f51b5',
      secondary: '#b0bec5',
      accent: '#8c9eff',
      error: '#b71c1c'
    }
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    quiet: false,
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    routes() {
      const routes = []

      // カテゴリ
      const summary = articleList.fileMap
      let categories = Object.keys(summary).map(key => summary[key].category)
      categories = Array.from(new Set(categories))
      categories.map((item) => {
        routes.push(`categories/${item}`)
      })

      // 記事
      const articles = Object.keys(summary).map(key => summary[key].base)
      articles.map((item) => {
        routes.push(`articles/${splitExt(item)[0]}`)
      })
      return routes
    }
  }
}
