<template>
  <v-app>
    <v-content>
      <v-col>
        <markdown v-if="articleName != undefined" :mdName="articleName"></markdown>
      </v-col>
    </v-content>
  </v-app>
</template>

<script>
import Markdown from "./markdown.vue";
import Posts from "./posts/posts.json";

export default {
  components: {
    Markdown
  },
  data: () => ({}),
  computed: {
    articleName: {
      get() {
        var name = this.$route.path.split("/")[2];
        if (Posts.posts.indexOf(name) < 0) {
          name = undefined;
        }
        return name;
      }
    }
  },
  updated() {
    if (Posts.posts.indexOf(this.articleName) < 0) {
      this.$router.push("../NotFound.vue");
    }
  }
};
</script>