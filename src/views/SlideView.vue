<template>
  <v-app>
    <v-content>
      <v-col cols="12">
        <v-row v-show="!loaded" align="center" justify="center">
          <v-progress-circular indeterminate color="primary" size="100"></v-progress-circular>
        </v-row>
      </v-col>

      <iframe
        :src="$route.params.src"
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
export default {
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
