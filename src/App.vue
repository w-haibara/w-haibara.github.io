<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <router-link v-for="menu in menus" :key="menu.title" :to="menu.src">
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <v-list-group no-action sub-group value="true">
          <template v-slot:activator>
            <v-list-item-title>Playground</v-list-item-title>
          </template>
          <v-list v-for="menu in playground_menus" :key="menu.title">
            <router-link :to="menu.src">
              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>{{ menu.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </v-list>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dense color="black" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>w_haibara</v-toolbar-title>
    </v-app-bar>

    <router-view />
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    items: [
      require("./assets/slide1.png"),
      require("./assets/slide2.png"),
      require("./assets/slide3.png"),
      require("./assets/slide4.png"),
      //        require('./assets/slide5.png'),
      require("./assets/slide6.png"),
      require("./assets/slide7.png")
    ],
    menus: [
      {
        title: "Home",
        src: "/"
      },
      {
        title: "Profile",
        src: "/profile"
      },
      {
        title: "Works",
        src: "/works"
      },
      {
        title: "Library",
        src: "/library"
      },
      {
        title: "Arduino入門",
        src: "/arduino"
      }
    ],
    playground_menus: [
      {
        title: "Ball",
        src: "/ball"
      },
      {
        title: "Picsel",
        src: "/picsel"
      },
      {
        title: "TD4 Emulator",
        src: "/td4"
      }
    ],
    dialog1: false,
    dialog2: false
  }),
  methods: {
    moveLink(url) {
      window.open(url, "_blank");
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}

#title ul div {
  display: inline-block;
  margin: 10px;
  vertical-align: center;
}
</style>