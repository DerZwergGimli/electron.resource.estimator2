import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/HomeView.vue'),
  },
  {
    path: '/import',
    name: 'import',
    component: () => import('./views/ImportView.vue'),
  },
  {
    path: '/export',
    name: 'export',
    component: () => import('./views/ExportView.vue'),
  },
  {
    path: '/host',
    name: 'host',
    component: () => import('./views/HostView.vue'),
  },
  {
    path: '/vm',
    name: 'vm',
    component: () => import('./views/VMView.vue'),
  },
  {
    path: '/printout',
    name: 'printout',
    component: () => import('./views/ExportView.vue'),
  },
  {
    path: '/assignment',
    name: 'assignment',
    component: () => import('./views/AssignmentView.vue'),
  },
  {
    path: '/printout',
    name: 'printout',
    component: () => import('./views/PrintOutView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./views/ExportView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkExactActiveClass: 'active',
  routes,
})

export default router
