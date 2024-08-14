import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import EventView from '@/views/EventView.vue'
import ListView from '@/views/ListView.vue'
import GmailView from '@/views/GmailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/event/:id',
      name: 'event',
      props: true,
      component: EventView,
    },
    {
      path: '/list',
      name: 'list',
      props: true,
      component: ListView,
    },
    {
      path: '/vmail',
      name: 'vmail',
      component: GmailView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
