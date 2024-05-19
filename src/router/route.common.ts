// 不需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router';

const commonRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '',
      icon: '',
    },
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/deploy',
    name: 'deploy',
    meta: {
      title: '',
      icon: '',
    },
    component: () => import('@/views/deploy/index.vue'),
  },
  {
    path: '/tokens',
    name: 'tokens',
    meta: {
      title: '',
      icon: '',
    },
    component: () => import('@/views/tokens/index.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      title: '',
      icon: '',
    },
    component: () => import('@/views/profile/index.vue'),
  },
  {
    path: '/marketplace',
    name: 'marketplace',
    meta: {
      title: '',
      icon: '',
    },
    component: () => import('@/views/marketplace/index.vue'),
  },
  {
    path: '/marketplace/order/:tick',
    name: 'order',
    meta: {
      title: '',
      icon: '',
    },
    component: () => import('@/views/order/index.vue'),
  },
  {
    path: '/address/:address',
    name: 'address',
    meta: {
      title: '',
      icon: '',
    },
    component: () => import('@/views/profile/index.vue'),
  },
];

export default commonRoutes;
