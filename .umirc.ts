import { defineConfig } from 'umi';

export default defineConfig({
  chainWebpack(config) {
    config.module
      .rule('html-loader')
      .test(/\.html$/)
      .exclude.end()
      .use('html-loader')
      .loader('html-loader');
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/index',
      routes: [
        { path: '/', component: './HomePage/HomePage.jsx' },
        { path: '/Details', component: './Details/Details.jsx' },
        { path: '/Submit', component: './Submit/Submit.jsx' },
        {
          path: '/PrivacyNotice',
          component: './PrivacyNotice/PrivacyNotice.jsx',
        },
        {
          path: '/TermsOfService',
          component: './TermsOfService/TermsOfService.jsx',
        },
      ],
    },
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://192.168.1.237:8081',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '/api',
      },
    },
    '/ipfs': {
      target: 'http://192.168.1.237:8081',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/ipfs': '/ipfs',
      },
    },
  },
  publicPath: './',
  runtimePublicPath: true,
  history: {
    type: 'hash',
  },
  hash: true,
});
