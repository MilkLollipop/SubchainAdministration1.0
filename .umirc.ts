import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/index',
      routes: [{ path: '/', component: './HomePage/HomePage.jsx' }],
    },
  ],
  fastRefresh: {},
});
