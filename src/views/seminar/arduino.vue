<template>
  <v-app>
    <v-content>
      <v-col>
        <v-img class="brack--text" height="90px" src="../../assets/slide5.png">
          <v-col>
            <h1 class="pagetitle font-weight-bold">はじめてのArduino</h1>
          </v-col>
        </v-img>
      </v-col>

      <v-col v-for="(article,i) in articles.names" :key="i">
        <div>
          <v-container>
            <v-card min-height="100" v-on:click="$router.push('/arduino/'+article)">
              <v-card-title>{{ articles.titles[i] }}</v-card-title>
            </v-card>
          </v-container>
        </div>
      </v-col>
    </v-content>
  </v-app>
</template>

<script>
import Posts from "./posts/posts.json";

export default {
  data: () => ({}),
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
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style scoped>
</style>