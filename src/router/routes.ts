import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/rs',
    component: () => import('layouts/RSLayout.vue'),
    children: [
      { path: '', component: () => import('pages/RS/Index.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
