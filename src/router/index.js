import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'
import Works from '@/views/Works.vue'
import Slides from '@/views/Slides.vue'
import SlideView from '@/views/SlideView.vue'
import Ball from '@/views/playground/Ball.vue'
import Picsel from '@/views/playground/Picsel.vue'
import td4 from '@/views/playground/td4.vue'
import Arduino from '@/views/seminar/arduino.vue'
import ArduinoArticle from '@/views/seminar/article.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter)

export default new VueRouter({
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
      path: '/slides',
      name: 'Slides',
      component: Slides
    },
    {
      path: '/slides/:src',
      name: 'SlideView',  
      component: SlideView
    },
    {
      path: '/picsel',
      name: 'Picsel',
      component: Picsel
    },
    {
      path: '/ball',
      name: 'Ball',
      component: Ball
    },
    {
      path: '/td4',
      name: 'td4',
      component: td4
    },
    {
      path: '/arduino',
      name: 'arduino',
      component: Arduino
    },
    {
      path: '/arduino/:id',
      name: 'ArduinoArticle',
      component: ArduinoArticle
    },
    {
      path: '*',
      name: NotFound,
      component: NotFound
    }
  ]
})