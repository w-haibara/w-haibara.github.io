<template>
  <div v-html="markedContent"></div>
</template>

<script>
import marked from "marked";

export default {
  props: {
    mdName: String,
    onlyTitle: Boolean
  },
  computed: {
    source() {
      return require("./posts/" + this.mdName + ".md").default;
    },
    _onlyTitle() {
      return this.onlyTitle == undefined ? false : this.onlyTitle;
    },
    markedContent() {
      return this._onlyTitle
        ? marked(this.source.slice(0, this.source.indexOf("\n", 0)))
        : marked(this.source);
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