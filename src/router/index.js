import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'
import Works from '@/views/Works.vue'
import Library from '@/views/Library/Library.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter)

export default new VueRouter ({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/works',
      name: 'Works',
      component: Works
    },
    {
      path: '/library',
      name: 'Library',
      component: Library
    },
    {
      path: '*',
      name: NotFound,
      component: NotFound
    }
  ]
})