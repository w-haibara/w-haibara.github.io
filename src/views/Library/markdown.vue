<template>
  <div v-html="markedContent"></div>
</template>

<script>
import marked from "marked";

export default {
  props: {
    mdName: String
  },
  computed: {
    source() {
      return require("./posts/" + this.mdName + ".md");
    },
    markedContent() {
      return marked(this.source);
    }
  }
};
</script>

<style scoped>
.horizontal-list {
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  padding: 0;
}

.horizontal-list li {
  display: inline-block;
}
</style>