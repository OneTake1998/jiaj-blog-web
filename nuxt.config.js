const path = require("path");
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '快乐码男',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '快乐码男的个人博客' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  //axios
  axios: {
    baseUrl: "//110.40.140.27:8001"
    // baseUrl: "//localhost:8001"
  },
  // axios
  // axios: {
  //   proxy: true, //开启代理转发
  //   prefix: "/api" // 请求接口添加前缀 /api   /test > /api/test
  // },

  // proxy: {
  //   // 代理转发
  //   "/api": {
  //     // /api/test > http://mengxuegu.com:7300/mock/5ee6e6a9e56c02034c4c2e89/blog-web/test
  //     // target: "http://110.40.140.27:8001",
  //     target: "http://localhost:8001",
  //     pathRewrite: { "^/api": "" }
  //   }
  // },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~assets/css/index.scss",
    "gitalk/dist/gitalk.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/svg-icon.js",
    "~/plugins/vue2-scrollspy.js",
    "~/api/gitalk.js",
    "~/api/article.js",
    "~/api/about.js",
    "~/api/common.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt', // 针对服务端操作cookie
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, context) {
      // 排除 nuxt 原配置的影响,Nuxt 默认有vue-loader,会处理svg,img等
      // 找到匹配.svg的规则,然后将存放svg文件的目录排除
      const svgRule = config.module.rules.find(rule => rule.test.test(".svg"));
      svgRule.exclude = [path.resolve(__dirname, "assets/icons/svg")];
      // Includes /icons/svg for svg-sprite-loader
      config.module.rules.push({
        test: /\.svg$/,
        include: [path.resolve(__dirname, "assets/icons/svg")],
        loader: "svg-sprite-loader",
        options: {
          symbolId: "icon-[name]"
        }
      });
    }
  }
}
