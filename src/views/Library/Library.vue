<template>
  <v-app>
    <v-content>
      <v-col>
        <v-img class="brack--text" height="90px" src="../../assets/slide5.png">
          <v-col>
            <h1 class="pagetitle font-weight-bold">Library</h1>
          </v-col>
        </v-img>
      </v-col>

      <v-container>
        <v-container>
          <v-row>
            <v-carousel height="360">
              <v-carousel-item v-for="(item,i) in items" :key="i">
                <v-card class="mx-auto" max-width="480" height="299">
                  <iframe
                    :src="item.src"
                    frameborder="0"
                    width="480"
                    height="299"
                    allowfullscreen="true"
                    mozallowfullscreen="true"
                    webkitallowfullscreen="true"
                  ></iframe>
                </v-card>
              </v-carousel-item>
            </v-carousel>
          </v-row>
        </v-container>
      </v-container>

      <ul class="horizontal-list">
        <li v-for="(article,i) in articles.names" :key="i">
          <div>
            <v-container>
              <v-hover v-slot:default="{ hover }">
                <v-card
                  class="mx-auto"
                  color="cyan lighten-4"
                  width="400"
                  min-height="200"
                  v-on:click="$router.push('article/'+article)"
                >
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-3 white--text"
                      style="height: 100%;"
                    ></div>
                  </v-expand-transition>
                  <v-card-title>{{ articles.titles[i] }}</v-card-title>
                </v-card>
              </v-hover>
            </v-container>
          </div>
        </li>
      </ul>
    </v-content>
  </v-app>
</template>

<script>
import Posts from "./posts/posts.json";

export default {
  data: () => ({
    items: [
      {
        src:
          "https://docs.google.com/presentation/d/e/2PACX-1vRPPGZz4zBfKcz1dMu4pnATGQh2ZYXRUJIL7QKuvgxygGB0ZJIBMSJ5elCOya-tasHictLT7brYrDk4/embed?start=false&loop=false&delayms=3000",
        loaded: false
      },
      {
        src:
          "https://docs.google.com/presentation/d/e/2PACX-1vQAO0BBiAk8wFS1kSwg2zXbc0G_9E0QNgpdgBOSQmMXhVwBtUwt8jVxitXEl6RvXxEts-T-Bg_vb-wA/embed?start=false&loop=false&delayms=3000",
        loaded: false
      },
      {
        src:
          "https://docs.google.com/presentation/d/e/2PACX-1vQRCrDQD_Vy8-V63iL7owU4YayRBzZvz472usc47SFnbLYaWvxVR6n2Hea3SJ7MrAoCm1lGjUIsPSIc/embed?start=false&loop=false&delayms=3000",
        loaded: false
      },
      {
        src:
          "https://docs.google.com/presentation/d/e/2PACX-1vQjR0Gb67JgXhzVgnXlpiiH2oF4T0s1mvr658_2gX2wyV4VI6cDVBKhzOH6GH6DNR91OPUNtRSScOTq/embed?start=false&loop=false&delayms=3000",
        loaded: false
      }
    ]
  }),
  computed: {
    articles: {
      get() {
        let titles = [];
        for (let i in Posts.posts) {
          const source = require("./posts/" + Posts.posts[i] + ".md");
          titles.push(source.slice(2, source.indexOf("\n", 0)));
        }
        return { names: Posts.posts, titles: titles };
      }
    },
    getTitle: {
      get() {
        let mdName = 1;
        const source = require("./posts/" + mdName + ".md");
        return source.slice(2, source.indexOf("\n", 0));
      }
    }
  },
  method: {}
};
</script>

<style scoped>
.horizontal-list {
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.horizontal-list li {
  display: inline-block;
  vertical-align: top;
}
</style>