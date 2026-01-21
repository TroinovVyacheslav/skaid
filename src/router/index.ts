import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/UsersList.vue'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/UsersList.vue'),
  },
  {
    path: '/users/create',
    name: 'user-create',
    component: () => import('@/views/UserCreate.vue'),
  },
  {
    path: '/users/:id/edit',
    name: 'user-edit',
    component: () => import('@/views/UserEdit.vue'),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
