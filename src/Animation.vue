<template>
  <div>
    <div class="page">
      <div class="box">
        <span class="title1">w-haibara portfolio</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    var _this = this;
    var el = document.querySelector(".title1");

    el.addEventListener("animationend", function() {
      _this.$emit("animationd");
    });
  }
};
</script>

<style scoped>
.page {
  height: 100vh;
  overflow: scroll;
  -ms-overflow-style: none; /* for IE, Edge */
  scrollbar-width: none; /* for Firefox */
}
.page::-webkit-scrollbar {
  /* forChrome, Safari */
  display: none;
}

.box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;

  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;

  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  padding: 30px;
  box-sizing: border-box;

  width: auto;
  height: auto;
  min-height: 100%;

  background-size: cover;
  background-position: center;

  background: #abbaab; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #ffffff,
    #abbaab
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ffffff,
    #abbaab
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

span.title1 {
  font-size: xx-large;
  animation: fade 2s ease-in 0s 1 forwards;
  -webkit-animation: fade 2s ease-in 0s 1 forwards;
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  80% {
    opacity: 1;
  }
}

@-webkit-keyframes fade {
  0% {
    opacity: 0;
  }
  80% {
    opacity: 1;
  }
}
</style>
