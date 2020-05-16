<template>
  <v-app>
    <v-content class="background">
      <vue-loading type="cylon" color="#333" :size="{ width: '150px', height: '150px' }"></vue-loading>

      <iframe
        :src="'https://docs.google.com/presentation/d/e/' + $route.params.src + '/embed?start=false&loop=false&delayms=3000'"
        frameborder="0"
        allowfullscreen="true"
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        @load="load"
        v-show="loaded"
      ></iframe>
    </v-content>
  </v-app>
</template>

<script>
import { VueLoading } from "vue-loading-template";

export default {
  components: {
    VueLoading
  },
  data: () => ({
    loaded: false
  }),
  methods: {
    load: function() {
      this.loaded = true;
    }
  },
  mounted() {
    console.log("src: " + this.$route.params.src);
  }
};
</script>

<style scoped>
iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
