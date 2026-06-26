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
        { path: 'courses/:courseId', name: 'course-detail', component: () => import('./pages/course-detail.vue') },
        { path: 'assessment', name: 'assessment', component: () => import('./pages/assessment.vue') },
        { path: 'reports', name: 'reports', component: () => import('./pages/reports.vue') },
        { path: 'my-courses', name: 'my-courses', component: () => import('./pages/my-courses.vue') },
        { path: 'achievements', name: 'achievements', component: () => import('./pages/achievements.vue') },
        { path: 'community', name: 'community', component: () => import('./pages/community.vue') },
        { path: 'playground', name: 'playground', component: () => import('./pages/playground.vue') },
        { path: 'stats', name: 'stats', component: () => import('./pages/stats.vue') },
        { path: 'settings', name: 'settings', component: () => import('./pages/settings.vue') },
        { path: 'play/:lessonId', name: 'play', component: () => import('./pages/play.vue') }
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
    },
    {
      path: '/forgot-password',
      component: () => import('./layouts/blank.vue'),
      children: [
        { path: '', name: 'forgot-password', component: () => import('./pages/forgot-password.vue') }
      ]
    }
  ]
})

export default router
