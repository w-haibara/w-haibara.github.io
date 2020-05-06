<template>
  <v-app id>
    <v-content>
      <v-content>
        <v-row justify="space-around" no-gutters>
          <h1>wasm-count</h1>
        </v-row>
        <v-row justify="space-around" no-gutters>
          <v-btn id="countup">count</v-btn>
          <h1>{{ data.val }}</h1>
        </v-row>
      </v-content>
    </v-content>
  </v-app>
</template>


<script>
const wasm_file_name = "count.wasm";

export default {
  data: () => ({
    data: {
      val: "-"
    }
  }),
  methods: {
    main(data) {
      console.log("file: " + wasm_file_name);

      fetch(wasm_file_name)
        .then(function(response) {
          return response.arrayBuffer();
        })
        .then(function(buffer) {
          return WebAssembly.compile(buffer);
        })
        .then(function(module) {
          return WebAssembly.instantiate(module);
        })
        .then(function(instance) {
          document.getElementById("countup").addEventListener(
            "click",
            function() {
              data.val = instance.exports.count();
            },
            false
          );
        });
    }
  },
  mounted() {
    this.main(this.data);
  },
  beforeDestroy() {}
};
</script>

<style scoped>
</style>