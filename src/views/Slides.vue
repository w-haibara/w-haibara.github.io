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
              v-on:click="$router.push({name: 'SlideView', params: { src: slide.src } })"
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
  constructor(src, loading, title, text) {
    this.src = src;
    this.loading = loading;
    this.title = title;
    this.text = text;
  }
}

export default {
  data: () => ({
    urls: [
      "https://docs.google.com/presentation/d/e/2PACX-1vSkb3gsaoyCpDjz-D_O3tluDR-8HJuO80nzwe0GX4KPLEacfKVaEZ3Cq2-brWmS16Bn6_JbzbP9hNM6/embed?start=false&loop=false&delayms=3000",
      "https://docs.google.com/presentation/d/e/2PACX-1vT1XIpafcbjijZVInZA6T3LF9BmMA-pM8ijH1Uiy6WRLMmyC2XUyhB_vqdpROYv3TKdhHo8haK_FtEX/embed?start=false&loop=false&delayms=3000",
      "https://docs.google.com/presentation/d/e/2PACX-1vQ0gX4zJRVfeKHzrhJaidJseJrk-xyQFGxIObCMr1Xs5laxahBzdV3SNhHqnrSr9aVAbmLsSygtnKyV/embed?start=false&loop=false&delayms=3000",
      "https://docs.google.com/presentation/d/e/2PACX-1vTes5SBAcxBFhm4UcK6gjWxkMlBp-psBN7L_ptVFb-l_v3LhuRYQKm_U29UDuOt9_GrIZcplnRkpCuT/embed?start=false&loop=false&delayms=3000",
      "https://docs.google.com/presentation/d/e/2PACX-1vRPPGZz4zBfKcz1dMu4pnATGQh2ZYXRUJIL7QKuvgxygGB0ZJIBMSJ5elCOya-tasHictLT7brYrDk4/embed?start=false&loop=false&delayms=3000",
      "https://docs.google.com/presentation/d/e/2PACX-1vQAO0BBiAk8wFS1kSwg2zXbc0G_9E0QNgpdgBOSQmMXhVwBtUwt8jVxitXEl6RvXxEts-T-Bg_vb-wA/embed?start=false&loop=false&delayms=3000",
      "https://docs.google.com/presentation/d/e/2PACX-1vQRCrDQD_Vy8-V63iL7owU4YayRBzZvz472usc47SFnbLYaWvxVR6n2Hea3SJ7MrAoCm1lGjUIsPSIc/embed?start=false&loop=false&delayms=3000",
      "https://docs.google.com/presentation/d/e/2PACX-1vQjR0Gb67JgXhzVgnXlpiiH2oF4T0s1mvr658_2gX2wyV4VI6cDVBKhzOH6GH6DNR91OPUNtRSScOTq/embed?start=false&loop=false&delayms=3000"
    ],
    slides: new Array()
  }),
  methods: {
    setSlideData: function() {
      for (let i in this.urls) {
        this.slides.push(new slide(this.urls[i], true, "", ""));
        axios
          .get(this.slides[i].src)
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
  },
  mounted() {
    axios
      .get(
        "https://script.googleusercontent.com/macros/echo?user_content_key=ji4hf12naLfzPuuvQ8IO9qQoQbBCIoEekoxj7B91VP8YMwrzXvw_YrNdAOjMSD6ba-MNGWcig9p0iSSyHrFS--5UbyAbFabVm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnG9LwKSWZ_qWjR4caUAyHt7idmn3BIx8zQiJp941BO1H-8BgMUk46liQfrUzz_bRL1qzZpJOFiwY&lib=MLfSIyJUMaFmghreu_0uRkS6v9c9Fnerm"
      )
      .then(response => console.log(response.data.message));
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
