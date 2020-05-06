<template>
  <v-app id>
    <v-content>
      <v-container>
        <v-row justify="space-around" no-gutters>
          <v-card class="d-inline-block mx-auto" color="pink darken-2">
            <v-container>
              <v-row justify="space-between">
                <div id="terminal"></div>
              </v-row>
            </v-container>
          </v-card>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { Terminal } from "xterm";
//import { AttachAddon } from "xterm-addon-attach";

export default {
  mounted: function() {
    const term = new Terminal();
    console.log(term);

    term.open(document.getElementById("terminal"));

    term.write("$ ");
    term.onKey(data => {
      switch (data.domEvent.key) {
        case "Enter":
          term.write("\r\n$ ");
          break;
        default:
          term.write(data.key);
          break;
      }
    });
  }
};
</script>

<style scoped>
</style>