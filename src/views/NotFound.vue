<template>
  <v-app id="inspire">
    <v-content>
      <v-col>
        <v-row justify="center">
          <h1 class="pagetitle font-weight-bold">404 Not Found</h1>
        </v-row>
      </v-col>

      <v-container>
        <v-row>
          <v-row justify="center" v-for="(card,i) in cards" :key="i">
            <v-hover v-slot:default="{ hover }">
              <v-card
                class="mx-auto"
                color="grey lighten-4"
                width="280"
                v-on:click="_goto(card.path, 0)"
              >
                <v-img :aspect-ratio="16/9" :src="card.src">
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-3 white--text"
                      style="height: 100%;"
                    ></div>
                  </v-expand-transition>
                  <v-card-text class="pt-6" style="position: relative;">
                    <h3 class="display-1 font-weight-bold white--text mb-2">{{ card.title }}</h3>
                  </v-card-text>
                </v-img>
              </v-card>
            </v-hover>
          </v-row>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import goTo from "vuetify/es5/services/goto";

export default {
  data: () => ({
    cards: [
      {
        src: require("../assets/notfound-home.jpg"),
        path: "/",
        title: "Home"
      }
    ]
  }),
  methods: {
    _goto(path, selector) {
      this.$router.push(path);
      if (selector != "0") {
        goTo(selector, 0);
      }
    }
  }
};
</script>