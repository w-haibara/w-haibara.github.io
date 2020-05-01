<template>
  <v-app id>
    <v-content>
      <v-row justify="space-around" no-gutters>
        <canvas id="canvas"></canvas>
      </v-row>

      <v-row justify="space-around" no-gutters>
        <v-row justify="space-around" no-gutters>
          <v-switch v-model="mode.gray" label="グレースケール"></v-switch>
          <v-switch v-model="mode.nega" label="ネガポジ反転"></v-switch>
          <v-switch v-model="mode.binarize" label="二値化"></v-switch>
          <v-switch v-model="mode.gamma" label="ガンマ補正"></v-switch>
        </v-row>
        <v-row justify="space-around" no-gutters>
          <v-switch v-model="mode.sobelHFil" label="Sobel 水平フィルタ"></v-switch>
          <v-switch v-model="mode.sobelVFil" label="Sobel 垂直フィルタ"></v-switch>
          <v-switch v-model="mode.laplaceFil" label="ラプラシアンフィルタ"></v-switch>
          <v-switch v-model="mode.enhanceFil" label="エッジ強調フィルタ"></v-switch>
          <v-switch v-model="mode.aveFil" label="平滑化フィルタ"></v-switch>
        </v-row>
      </v-row>
    </v-content>
  </v-app>
</template>


<script>
export default {
  data: () => ({
    mode: {
      gray: false,
      nega: false,
      binarize: false,
      gamma: false,
      sobelHFil: false,
      sobelVFil: false,
      laplaceFil: false,
      enhanceFil: false,
      prop: {
        binarize_threshold: 127.5,
        gamma_val: 2.0
      }
    },

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
        if (mode.binarize) {
          binarize(data);
        }
        if (mode.gamma) {
          gamma(data);
        }
        if (mode.sobelHFil) {
          sobelHFil(data);
        }
        if (mode.sobelVFil) {
          sobelVFil(data);
        }
        if (mode.laplaceFil) {
          laplaceFil(data);
        }
        if (mode.enhanceFil) {
          enhanceFil(data);
        }
        if (mode.aveFil) {
          aveFil(data);
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

      function binarize(data) {
        for (let i = 0; i < data.length; i += 4) {
          data[i] = data[i + 1] = data[i + 2] =
            (data[i] + data[i + 1] + data[i + 2]) / 3 >
            mode.prop.binarize_threshold
              ? 0
              : 255;
        }
      }

      function gamma(data) {
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 * Math.pow(data[i] / 255, 1 / mode.prop.gamma_val);
          data[i + 1] =
            255 * Math.pow(data[i + 1] / 255, 1 / mode.prop.gamma_val);
          data[i + 2] =
            255 * Math.pow(data[i + 2] / 255, 1 / mode.prop.gamma_val);
        }
      }

      function sobelHFil(data) {
        //convolution3x3(data, -1, -2, -1, 0, 0, 0, 1, 2, 1);
        convolution3x3(data, -3, -6, -4, 0, 0, 0, 3, 6, 3);
      }

      function sobelVFil(data) {
        //convolution3x3(data, -1, 0, 1, -2, 0, 2, -3, 0, 3);
        convolution3x3(data, -3, 0, 3, -6, 0, 6, -9, 0, 9);
      }

      function laplaceFil(data) {
        convolution3x3(data, 1, 1, 1, 1, -9, 1, 1, 1, 1);
      }

      function enhanceFil(data) {
        const pre_data = data.slice(0, data.length);
        convolution3x3(pre_data, -1, -2, -1, 0, 0, 0, 1, 2, 1);
        for (let i = 0; i < data.length; i += 4) {
          for (let color = 0; color < 3; color++) {
            data[i + color] += pre_data[i + color];
          }
        }
      }

      function aveFil(data) {
        convolution3x3(data, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3);
      }

      /*
      |a1|a2|a3|
      |a4|a5|a6|
      |a7|a8|a9|
      */
      function convolution3x3(data, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        const pre_data = data.slice(0, data.length);
        for (let i = 0; i < data.length; i += 4) {
          for (let color = 0; color < 3; color++) {
            data[i + color] +=
              i - 4 - offscreen.width * 4 + color < 0 ||
              i + 4 + offscreen.width * 4 + color > data.length
                ? pre_data[i + color]
                : pre_data[i - 4 - offscreen.width * 4 + color] * a1 +
                  pre_data[i - offscreen.width * 4 + color] * a2 +
                  pre_data[i + 4 - offscreen.width * 4 + color] * a3 +
                  pre_data[i - 4 + color] * a4 +
                  pre_data[i + color] * a5 +
                  pre_data[i + 4 + color] * a6 +
                  pre_data[i - 4 + offscreen.width * 4 + color] * a7 +
                  pre_data[i + offscreen.width * 4 + color] * a8 +
                  pre_data[i + 4 + offscreen.width * 4 + color] * a9;
          }
        }
      }

      /*
      |a 1|a 2|a 3|a 4|a 5|
      |a 6|a 7|a 8|a 9|a10|
      |a11|a12|a13|a14|a15|
      |a16|a17|a18|a19|a20|
      |a21|a22|a23|a24|a25|
      */
      /*
      function convolution5x5(
        data,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7,
        a8,
        a9,
        a10,
        a11,
        a12,
        a13,
        a14,
        a15,
        a16,
        a17,
        a18,
        a19,
        a20,
        a21,
        a22,
        a23,
        a24,
        a25
      ) {
        const pre_data = data.slice(0, data.length);
        for (let i = 0; i < data.length; i += 4) {
          for (let color = 0; color < 3; color++) {
            data[i + color] +=
              i - 8 - offscreen.width * 8 + color < 0 ||
              i + 8 + offscreen.width * 8 + color > data.length
                ? pre_data[i + color]
                : pre_data[i - 8 - offscreen.width * 8 + color] * a1 +
                  pre_data[i - 4 - offscreen.width * 8 + color] * a2 +
                  pre_data[i - offscreen.width * 8 + color] * a3 +
                  pre_data[i + 4 - offscreen.width * 8 + color] * a4 +
                  pre_data[i + 8 - offscreen.width * 8 + color] * a5 +
                  pre_data[i - 8 - offscreen.width * 4 + color] * a6 +
                  pre_data[i - 4 - offscreen.width * 4 + color] * a7 +
                  pre_data[i - offscreen.width * 4 + color] * a8 +
                  pre_data[i + 4 - offscreen.width * 4 + color] * a9 +
                  pre_data[i + 8 - offscreen.width * 4 + color] * a10 +
                  pre_data[i - 8 + color] * a11 +
                  pre_data[i - 4 + color] * a12 +
                  pre_data[i + color] * a13 +
                  pre_data[i + 3 + color] * a14 +
                  pre_data[i + 8 + color] * a15 +
                  pre_data[i - 8 + offscreen.width * 4 + color] * a16 +
                  pre_data[i - 4 + offscreen.width * 4 + color] * a17 +
                  pre_data[i + offscreen.width * 4 + color] * a18 +
                  pre_data[i + 4 + offscreen.width * 4 + color] * a19 +
                  pre_data[i + 8 + offscreen.width * 4 + color] * a20 +
                  pre_data[i - 8 + offscreen.width * 8 + color] * a21 +
                  pre_data[i - 4 + offscreen.width * 8 + color] * a22 +
                  pre_data[i + offscreen.width * 8 + color] * a23 +
                  pre_data[i + 4 + offscreen.width * 8 + color] * a24 +
                  pre_data[i + 8 + offscreen.width * 8 + color] * a25;
          }
        }
      }
      */
    }
  },
  mounted() {
    this.main(this.mode);
  }
};
</script>

<style scoped>
</style>