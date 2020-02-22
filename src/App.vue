<template>
  <v-app id="app">
    <v-app-bar
      app
      color="black"
      dark
    >
      <v-toolbar-title>Wataru HAIBARA </v-toolbar-title>
    </v-app-bar>

    <router-view />

    <v-footer
      color="black"
      app
      class="font-weight-medium"
      title
    >
      <v-row>

        <v-btn text color="white" v-on:click="_goto('/', '0')">
          <span class="white--text">Home</span>
        </v-btn>

        <v-btn text color="white" v-on:click="_goto('/profile', '0')">
          <span class="white--text">Profile</span>
        </v-btn>

        <v-btn text color="white" v-on:click="_goto('/works', '0')">
          <span class="white--text">Works</span>
        </v-btn>

        <v-btn text color="white" v-on:click="_goto('/library', '0')">
          <span class="white--text">Library</span>
        </v-btn>

      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
  import goTo from 'vuetify/es5/services/goto'

  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      items: [
        require('./assets/slide1.png'),
        require('./assets/slide2.png'),
        require('./assets/slide3.png'),
        require('./assets/slide4.png'),
//        require('./assets/slide5.png'),
        require('./assets/slide6.png'),
        require('./assets/slide7.png'),
      ],
      dialog1: false,
      dialog2: false,
    }),
    methods: {
      moveLink (url) {
        window.open(url, '_blank')
      },
      _goto(path, selector) {
        this.$router.push(path).catch(
          e => // eslint-disable-line
          {
          })
        if(selector != '0'){
          goTo(selector, 0)
        }
      },
    },
  }
</script>