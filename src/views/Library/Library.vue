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

      <ul class="horizontal-list">
        <li>
          <h1>Slides</h1>
        </li>
        <li v-for="(slide,i) in slides" :key="i">
          <div>
            <v-container>
              <v-card
                width="400"
                min-height="200"
                :loading="slide.loading"
                v-on:click="slide.dialog=true"
              >
                <v-card-title>{{ slide.title }}</v-card-title>
                <v-card-text>{{ slide.text }}</v-card-text>
              </v-card>
              <v-dialog v-model="slide.dialog" width="480" height="299">
                <v-card width="480" height="299">
                  <iframe
                    :src="slide.src"
                    frameborder="0"
                    width="480"
                    height="299"
                    allowfullscreen="true"
                    mozallowfullscreen="true"
                    webkitallowfullscreen="true"
                  ></iframe>
                </v-card>
              </v-dialog>
            </v-container>
          </div>
        </li>
      </ul>

      <ul class="horizontal-list">
        <li>
          <h1>Brog</h1>
        </li>
        <li v-for="(article,i) in articles.names" :key="i">
          <div>
            <v-container>
              <v-card width="400" min-height="150" v-on:click="$router.push('article/'+article)">
                <v-card-title>{{ articles.titles[i] }}</v-card-title>
              </v-card>
            </v-container>
          </div>
        </li>
      </ul>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import Posts from "./posts/posts.json";

export default {
  data: () => ({
    slides: [ 
      {
        src:
           "https://docs.google.com/presentation/d/e/2PACX-1vTes5SBAcxBFhm4UcK6gjWxkMlBp-psBN7L_ptVFb-l_v3LhuRYQKm_U29UDuOt9_GrIZcplnRkpCuT/embed?start=false&loop=false&delayms=3000",
        loading: true,
        title: "",
        text: "",
        dialog: false
      },
      {
        src:
          "https://docs.google.com/presentation/d/e/2PACX-1vRPPGZz4zBfKcz1dMu4pnATGQh2ZYXRUJIL7QKuvgxygGB0ZJIBMSJ5elCOya-tasHictLT7brYrDk4/embed?start=false&loop=false&delayms=3000",
        loading: true,
        title: "",
        text: "",
        dialog: false
      },
      {
        src:
          "https://docs.google.com/presentation/d/e/2PACX-1vQAO0BBiAk8wFS1kSwg2zXbc0G_9E0QNgpdgBOSQmMXhVwBtUwt8jVxitXEl6RvXxEts-T-Bg_vb-wA/embed?start=false&loop=false&delayms=3000",
        loading: true,
        title: "",
        text: "",
        dialog: false
      },
      {
        src:
          "https://docs.google.com/presentation/d/e/2PACX-1vQRCrDQD_Vy8-V63iL7owU4YayRBzZvz472usc47SFnbLYaWvxVR6n2Hea3SJ7MrAoCm1lGjUIsPSIc/embed?start=false&loop=false&delayms=3000",
        loading: true,
        title: "",
        text: "",
        dialog: false
      },
      {
        src:
          "https://docs.google.com/presentation/d/e/2PACX-1vQjR0Gb67JgXhzVgnXlpiiH2oF4T0s1mvr658_2gX2wyV4VI6cDVBKhzOH6GH6DNR91OPUNtRSScOTq/embed?start=false&loop=false&delayms=3000",
        loading: true,
        title: "",
        text: "",
        dialog: false
      },
      {
        src:
          "https://docs.google.com/presentation/d/e/2PACX-1vQ0gX4zJRVfeKHzrhJaidJseJrk-xyQFGxIObCMr1Xs5laxahBzdV3SNhHqnrSr9aVAbmLsSygtnKyV/embed?start=false&loop=false&delayms=3000"
        loading: true,
        title: "",
        text: "",
        dialog: false
      },      
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
    }
  },
  methods: {
    setSlideData: function() {
      for (let i in this.slides) {
        axios
          .get(this.slides[i].src)
          .then(response => {
            this.slides[i].title = response.data.match(
              /<meta property="og:title" content="(.*?)"*?>/
            )[1];

            this.slides[i].text = response.data.match(
              /<meta property="og:description" content="(.*?)"*?>/
            )[1];

            this.slides[i].loading = false;
          })
          .catch(err => {
            console.log("axios_err:", err);

            //this.slides[i].loading = false;
          });
      }
    }
  },
  created() {
    this.setSlideData();
  },
  mounted() {}
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
