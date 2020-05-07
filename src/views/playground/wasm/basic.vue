<template>
  <v-app id>
    <v-content>
      <v-content>
        <v-row justify="space-around" no-gutters>
          <h1>Wasm + Vue basic sample</h1>
        </v-row>
        <v-row justify="space-around" no-gutters>
          <v-card>
            <v-card-title>Add</v-card-title>
            <v-row justify="space-around" no-gutters>
              <v-card-text>
                <h1>{{ data.add.result }}</h1>
              </v-card-text>
              <v-card-actions>
                <v-col>
                  <v-text-field v-model="data.add.param1" label="param1"></v-text-field>
                  <v-text-field v-model="data.add.param2" label="param2"></v-text-field>
                </v-col>
              </v-card-actions>
            </v-row>
          </v-card>
          <v-card>
            <v-card-title>Count</v-card-title>
            <v-row justify="space-around" no-gutters>
              <v-card-text>
                <h1>{{ data.count.result }}</h1>
              </v-card-text>
              <v-card-actions>
                <v-btn id="count">count</v-btn>
              </v-card-actions>
            </v-row>
          </v-card>
        </v-row>
      </v-content>
    </v-content>
  </v-app>
</template>


<script>
const wasm_file_path = {
  add: "wasm/add.wasm",
  count: "wasm/count.wasm"
};

export default {
  data: () => ({
    data: {
      count: {
        result: "-"
      },
      add: {
        param1: 0,
        param2: 0,
        result: 0
      }
    }
  }),
  watch: {
    "data.add.param1": function() {
      this.callAdd(this.data);
    },
    "data.add.param2": function() {
      this.callAdd(this.data);
    }
  },
  methods: {
    call(file_path, func) {
      fetch(file_path)
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
          func(instance);
        });
    },
    callAdd(data) {
      this.call(wasm_file_path.add, function(instance) {
        data.add.result = instance.exports.add(
          data.add.param1,
          data.add.param2
        );
      });
    },
    initCount(data) {
      this.call(wasm_file_path.count, function(instance) {
        document.getElementById("count").addEventListener(
          "click",
          function() {
            data.count.result = instance.exports.count();
          },
          false
        );
      });
    }
  },
  mounted() {
    this.initCount(this.data);
  },
  beforeDestroy() {}
};
</script>

<style scoped>
</style>