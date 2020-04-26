<template>
  <v-app>
    <v-content>
      <v-row>
        <div class="my-2">
          <v-btn to="/arduino" class="mx-2" text active-class="white">Back</v-btn>
        </div>
      </v-row>

      <v-col>
        <markdown v-if="articleName != undefined" :mdName="articleName"></markdown>
      </v-col>

      <v-row>
        <div class="my-2">
          <v-btn to="/arduino" class="mx-2" text active-class="white">Back</v-btn>
        </div>
        <div class="my-2">
          <yandex-share v-bind="options" />
        </div>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
import Markdown from "./markdown.vue";
import Posts from "./posts/posts.json";
import YandexShare from "@cookieseater/vue-yandex-share";

export default {
  components: {
    Markdown,
    "yandex-share": YandexShare
  },
  data: () => ({
    options: {
      accessToken: null,
      bare: false,
      counter: false,
      copy: "last",
      description: null,
      direction: "horizontal",
      hashtags: null,
      image: null,
      lang: "ru",
      limit: 24,
      popupDirection: "bottom",
      popupPosition: "inner",
      size: "m",
      title: "",
      url: null,
      services: [
        "twitter",
        "facebook"
      ]
    }
  }),
  computed: {
    articleName: {
      get() {
        var name = this.$route.path.split("/")[2];
        return Posts.posts.indexOf(name) < 0 ? undefined : name;
      }
    }
  },
  mounted() {
    this.options.title = "Arduino入門#" + this.articleName;
  },
  updated() {
    if (Posts.posts.indexOf(this.articleName) < 0) {
      this.$router.push("../NotFound.vue");
    }
  }
};
</script> 

<style scoped>
</style>
