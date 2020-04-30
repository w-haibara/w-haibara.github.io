<template>
  <v-app id>
    <v-content>
      <v-switch v-model="mode.gray" label="gray"></v-switch>

      <canvas id="canvas"></canvas>
    </v-content>
  </v-app>
</template>


<script>
export default {
  data: () => ({
    mode: {
      gray: false,
      nega: false,
      enhanceFil: false
    },
    canvas: null,
    ctx: null,
    offscreen: null,
    offscreenCtx: null,
    video: null,
    stream: null
  }),
  methods: {
    convolution: function(data, i, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
      for (let color = 0; color < 3; color++) {
        data[i + color] +=
          i - 4 - this.offscreen.width * 4 + color < 0 ||
          i + 4 + this.offscreen.width * 4 + color > data.length
            ? data[i + color]
            : data[i - 4 - this.offscreen.width * 4 + color] * a1 +
              data[i - this.offscreen.width * 4 + color] * a2 +
              data[i + 4 - this.offscreen.width * 4 + color] * a3 +
              data[i - 4 + color] * a4 +
              data[i + color] * a5 +
              data[i + 4 + color] * a6 +
              data[i - 4 + this.offscreen.width * 4 + color] * a7 +
              data[i + this.offscreen.width * 4 + color] * a8 +
              data[i + 4 + this.offscreen.width * 4 + color] * a9;
      }
    },
    enhanceFil: function(data) {
      for (let i = 0; i < data.length; i += 4) {
        this.convolution(data, i, -1, -2, -1, 0, 0, 0, 1, 2, 1);
      }
    },
    nega: function(data) {
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }
    },
    gray: function(data) {
      for (let i = 0; i < data.length; i += 4) {
        const color = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = data[i + 1] = data[i + 2] = color;
      }
    },
    filter: function(data) {
      if (this.mode.gray) {
        this.gray(data);
      }
      if (this.mode.nega) {
        this.nega(data);
      }
      if (this.mode.enhanceFil) {
        this.enhanceFil(data);
      }
    },
    tick: function() {
      this.offscreenCtx.drawImage(this.video, 0, 0);
      const imageData = this.offscreenCtx.getImageData(
        0,
        0,
        this.offscreen.width,
        this.offscreen.height
      );
      this.filter(imageData.data);
      this.offscreenCtx.putImageData(imageData, 0, 0);
      this.ctx.drawImage(this.offscreen, 0, 0);
      window.requestAnimationFrame(this.tick);
    },
    getData: function() {
      this.video.play();
      this.canvas.width = this.offscreen.width = this.video.videoWidth;
      this.canvas.height = this.offscreen.height = this.video.videoHeight;
      this.tick();
    },
    async main() {
      this.canvas = document.getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.offscreen = document.createElement("canvas");
      this.offscreenCtx = this.offscreen.getContext("2d");
      this.video = document.createElement("video");
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });
      this.video.srcObject = this.stream;
      this.video.onloadedmetadata = this.getData();
    }
  },
  mounted() {
    this.main();
  }
};
</script>

<style scoped>
</style>