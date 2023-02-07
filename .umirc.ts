import { defineConfig } from 'umi';

export default defineConfig({
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
      ],
    },
  ],
  fastRefresh: {},
});
