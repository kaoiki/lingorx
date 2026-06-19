import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./layouts/default.vue'),
      children: [
        { path: '', name: 'dashboard', component: () => import('./pages/index.vue') },
        { path: 'courses', name: 'courses', component: () => import('./pages/courses.vue') },
        { path: 'achievements', name: 'achievements', component: () => import('./pages/achievements.vue') },
        { path: 'community', name: 'community', component: () => import('./pages/community.vue') },
        { path: 'playground', name: 'playground', component: () => import('./pages/playground.vue') }
      ]
    },
    {
      path: '/login',
      component: () => import('./layouts/blank.vue'),
      children: [
        { path: '', name: 'login', component: () => import('./pages/login.vue') }
      ]
    },
    {
      path: '/register',
      component: () => import('./layouts/blank.vue'),
      children: [
        { path: '', name: 'register', component: () => import('./pages/register.vue') }
      ]
    }
  ]
})

export default router
