<template>
  <v-app>
    <v-content>
      <v-col>
        <v-img class="brack--text" height="90px" src="../assets/slide5.png">
          <v-col>
            <h1 class="pagetitle font-weight-bold">Slides</h1>
          </v-col>
        </v-img>
      </v-col>

      <div class="grid">
        <div class="item" v-for="(slide,i) in slides" :key="i">
          <v-container>
            <v-card
              width="400"
              min-height="200"
              :loading="slide.loading"
              v-on:click="$router.push({name: 'SlideView', params: { src: slide.id } })"
            >
              <v-card-title>{{ slide.title }}</v-card-title>
              <v-card-text>{{ slide.text }}</v-card-text>
            </v-card>
          </v-container>
        </div>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";

class slide {
  constructor(id, loading, title, text) {
    this.id = id;
    this.loading = loading;
    this.title = title;
    this.text = text;
  }
}

export default {
  data: () => ({
    ids: [
      "2PACX-1vTX9uUR4lQDktc0mTuTcHZj6flarl-7N4JDsvm1pYLMDoQFiKeKc5fcQK5VbvKtzQM7y0s-wKmxGPwi",
      "2PACX-1vSkb3gsaoyCpDjz-D_O3tluDR-8HJuO80nzwe0GX4KPLEacfKVaEZ3Cq2-brWmS16Bn6_JbzbP9hNM6",
      "2PACX-1vT1XIpafcbjijZVInZA6T3LF9BmMA-pM8ijH1Uiy6WRLMmyC2XUyhB_vqdpROYv3TKdhHo8haK_FtEX",
      "2PACX-1vQ0gX4zJRVfeKHzrhJaidJseJrk-xyQFGxIObCMr1Xs5laxahBzdV3SNhHqnrSr9aVAbmLsSygtnKyV",
      "2PACX-1vTes5SBAcxBFhm4UcK6gjWxkMlBp-psBN7L_ptVFb-l_v3LhuRYQKm_U29UDuOt9_GrIZcplnRkpCuT",
      "2PACX-1vRPPGZz4zBfKcz1dMu4pnATGQh2ZYXRUJIL7QKuvgxygGB0ZJIBMSJ5elCOya-tasHictLT7brYrDk4",
      "2PACX-1vQAO0BBiAk8wFS1kSwg2zXbc0G_9E0QNgpdgBOSQmMXhVwBtUwt8jVxitXEl6RvXxEts-T-Bg_vb-wA",
      "2PACX-1vQRCrDQD_Vy8-V63iL7owU4YayRBzZvz472usc47SFnbLYaWvxVR6n2Hea3SJ7MrAoCm1lGjUIsPSIc",
      "2PACX-1vQjR0Gb67JgXhzVgnXlpiiH2oF4T0s1mvr658_2gX2wyV4VI6cDVBKhzOH6GH6DNR91OPUNtRSScOTq"
    ],
    slides: new Array()
  }),
  methods: {
    setSlideData: function() {
      for (let i in this.ids) {
        this.slides.push(new slide(this.ids[i], true, "", ""));

        axios
          .get(
            "https://docs.google.com/presentation/d/e/" +
              this.slides[i].id +
              "/embed?start=false&loop=false&delayms=3000"
          )
          .then(response => {
            this.slides[i].title = response.data.match(
              /<meta property="og:title" content="(.*?)"*?>/
            )[1];

            this.slides[i].text = response.data.match(
              /<meta property="og:description" content="(.*?)"*?>/
            )[1];

            this.slides[i].loading = false;
          })
          .catch(err => {
            console.log("axios_err:", err);
          });
      }
    }
  },
  created() {
    this.setSlideData();
  }
};
</script>

<style scoped>
.grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}
.item {
  border-radius: 10px;
}
</style>
