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
import Video from '@/views/playground/Video.vue'
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
      path: '/slides/https:%2F%2Fdocs.google.com%2Fpresentation%2Fd%2Fe%2F2PACX-1vSkb3gsaoyCpDjz-D_O3tluDR-8HJuO80nzwe0GX4KPLEacfKVaEZ3Cq2-brWmS16Bn6_JbzbP9hNM6%2Fembed%3Fstart=false&loop=false&delayms=3000',
      redirect: '/slides/2PACX-1vSkb3gsaoyCpDjz-D_O3tluDR-8HJuO80nzwe0GX4KPLEacfKVaEZ3Cq2-brWmS16Bn6_JbzbP9hNM6'
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
      path: '/video',
      name: 'Video',
      component: Video
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