<template>
  <v-app>
    <v-content>
      <v-col>
        <v-col>
          <h1 class="pagetitle font-weight-bold">はじめてのArduino</h1>
        </v-col>
      </v-col>

      <v-col v-for="(article,i) in articles.names" :key="i">
        <div>
          <v-container>
            <v-card min-height="80" v-on:click="$router.push('/arduino/'+article)">
              <v-card-title>{{ articles.titles[i] }}</v-card-title>
              <v-card-text>{{ articles.keywords[i] }}</v-card-text>
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
        let keywords = [];
        for (let i in Posts.posts) {
          let source = require("./posts/" + Posts.posts[i] + ".md").default.split(/\n/);

          titles.push(
            source
              .slice(0, 1)
              .toString()
              .slice(1)
          );
          keywords.push(
            source
              .slice(1, 2)
              .toString()
              .slice(1)
          );
        }
        return { names: Posts.posts, titles: titles, keywords: keywords };
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