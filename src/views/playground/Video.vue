<template>
  <v-app id>
    <v-content>
      <v-row>
        <v-switch v-model="mode.gray" flat label="グレースケール"></v-switch>
        <v-switch v-model="mode.nega" flat label="ネガポジ反転"></v-switch>
        <v-switch v-model="mode.enhanceFil" flat label="Sobel 水平フィルタ"></v-switch>
        <v-switch v-model="mode.laplaceFil" flat label="ラプラシアンフィルタ"></v-switch>
      </v-row>
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
      enhanceFil: false,
      laplaceFil: false
    },
    width: 600,
    height: 600,
    video: {},
    canvas: {},
    captures: []
  }),
  methods: {
    async main(mode) {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      const offscreen = document.createElement("canvas");
      const offscreenCtx = offscreen.getContext("2d");
      const video = document.createElement("video");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
        canvas.width = offscreen.width = video.videoWidth;
        canvas.height = offscreen.height = video.videoHeight;
        tick();
      };

      function tick() {
        offscreenCtx.drawImage(video, 0, 0);
        const imageData = offscreenCtx.getImageData(
          0,
          0,
          offscreen.width,
          offscreen.height
        );
        filter(imageData.data);
        offscreenCtx.putImageData(imageData, 0, 0);
        ctx.drawImage(offscreen, 0, 0);
        window.requestAnimationFrame(tick);
      }

      function filter(data) {
        if (mode.gray) {
          gray(data);
        }
        if (mode.nega) {
          nega(data);
        }
        if (mode.enhanceFil) {
          enhanceFil(data);
        }
        if (mode.laplaceFil) {
          laplaceFil(data);
        }
      }

      function gray(data) {
        for (let i = 0; i < data.length; i += 4) {
          const color = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = data[i + 1] = data[i + 2] = color;
        }
      }

      function nega(data) {
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i];
          data[i + 1] = 255 - data[i + 1];
          data[i + 2] = 255 - data[i + 2];
        }
      }

      function enhanceFil(data) {
        for (let i = 0; i < data.length; i += 4) {
          convolution(data, i, -1, -2, -1, 0, 0, 0, 1, 2, 1);
        }
      }

      function laplaceFil(data) {
        for (let i = 0; i < data.length; i += 4) {
          convolution(data, i, 0, 1, 0, 1, -4, 1, 0, 1, 0);
        }
      }

      function convolution(data, i, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        for (let color = 0; color < 3; color++) {
          data[i + color] +=
            i - 4 - offscreen.width * 4 + color < 0 ||
            i + 4 + offscreen.width * 4 + color > data.length
              ? data[i + color]
              : data[i - 4 - offscreen.width * 4 + color] * a1 +
                data[i - offscreen.width * 4 + color] * a2 +
                data[i + 4 - offscreen.width * 4 + color] * a3 +
                data[i - 4 + color] * a4 +
                data[i + color] * a5 +
                data[i + 4 + color] * a6 +
                data[i - 4 + offscreen.width * 4 + color] * a7 +
                data[i + offscreen.width * 4 + color] * a8 +
                data[i + 4 + offscreen.width * 4 + color] * a9;
        }
      }
    }
  },
  mounted() {
    this.main(this.mode);
  }
};
</script>

<style scoped>
</style>