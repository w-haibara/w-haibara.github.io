<template>
  <v-app id="app">
    <transition name="fade">
      <div v-if="!loaded">
        <animation @animationd="loaded = true" />
      </div>
    </transition>

    <transition name="fade">
      <div v-if="loaded">
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

        <transition>
          <router-view />
        </transition>
      </div>
    </transition>
  </v-app>
</template>

<script>
import animation from "./Animation.vue";

export default {
  components: {
    animation
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
        title: "Slides",
        src: "/slides"
      },
      {
        title: "Arduino入門",
        src: "/arduino"
      }
    ],
    playground_menus: [
      /*
      {
        title: "Ball",
        src: "/ball"
      },
      {
        title: "Picsel",
        src: "/picsel"
      },
*/
      {
        title: "TD4 Emulator",
        src: "/td4"
      },
      {
        title: "Video Filter",
        src: "/video"
      }
    ],
    dialog1: false,
    dialog2: false,
    loaded: false
  }),
  methods: {
    moveLink(url) {
      window.open(url, "_blank");
    }
  },
  created() {
    this.loaded = this.$route.path != "/";
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

.fade-enter-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.v-enter {
  transform: translate(0, 100px);
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
.v-enter-active {
  transition: all 1s 0s ease;
}
.v-leave {
  transform: translate(0, 0);
  opacity: 1;
}
.v-leave-to {
  transform: translate(0, -100px);
  opacity: 0;
}
.v-leave-active {
  transition: all 0.5s 0s ease;
}
</style>