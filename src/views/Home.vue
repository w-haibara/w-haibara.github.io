<template>
  <v-app>
    <v-content class="homePage">
      <v-row id="home">
        <v-carousel
          cycle
          height="170"
          interval="3000"
          hide-delimiter-background
          hide-delimiters
          :show-arrows="false"
          :show-arrows-on-hover="false"
        >
          <v-carousel-item v-for="(item,i) in items" :key="i" :src="item"></v-carousel-item>
        </v-carousel>
      </v-row>

      <v-col>
        <v-row justify="center">
          <h1 class="pagetitle font-weight-bold">w_haibara Portfolio</h1>
        </v-row>
        <v-row justify="center">
          <nav class="Counter">
            <ul>
              <li>
                <p>あなたは</p>
              </li>
              <li class="CounterMain">
                <div class="CounterText">{{ accessCounter }}</div>
              </li>
              <li>
                <p>人目の訪問者です。</p>
              </li>
            </ul>
          </nav>
        </v-row>
      </v-col>

      <v-container>
        <v-row>
          <v-row justify="center" v-for="(card,i) in cards" :key="i">
            <v-hover v-slot:default="{ hover }">
              <v-card
                class="mx-auto"
                color="grey lighten-4"
                width="280"
                v-on:click="_goto(card.path, 0)"
              >
                <v-img :aspect-ratio="16/9" :src="card.src">
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-3 white--text"
                      style="height: 100%;"
                    ></div>
                  </v-expand-transition>
                  <v-card-text class="pt-6" style="position: relative;">
                    <h3 class="display-1 font-weight-bold white--text mb-2">{{ card.title }}</h3>
                  </v-card-text>
                </v-img>
              </v-card>
            </v-hover>
          </v-row>
        </v-row>
      </v-container>

      <v-container>
        <v-row>
          <v-row justify="center">
            <v-btn class="ma-1" href="https://github.com/w-haibara/" target="_blank">
              Github
              <v-icon dark right>fab fa-github</v-icon>
            </v-btn>

            <v-btn class="ma-1" href="https://twitter.com/w_haibara" target="_blank">
              Twitter
              <v-icon dark right>fab fa-twitter</v-icon>
            </v-btn>

            <v-btn class="ma-1" href="https://www.facebook.com/wataru.haibara.923" target="_blank">
              Facebook
              <v-icon dark right>fab fa-facebook</v-icon>
            </v-btn>

            <v-btn class="ma-1" href="https://haibara-works.hatenablog.com/" target="_blank">
              Blog
              <v-icon dark right>fas fa-book</v-icon>
            </v-btn>
          </v-row>
        </v-row>
        <v-row justify="end">
          <a href="https://github.com/keshikan/DSEG">Font "DSEG" by けしかん</a>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import goTo from "vuetify/es5/services/goto";
import axios from "axios";

export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    items: [
      require("../assets/slide1.png"),
      require("../assets/slide2.png"),
      require("../assets/slide3.png"),
      require("../assets/slide4.png"),
      require("../assets/slide5.png"),
      require("../assets/slide6.png"),
      require("../assets/slide7.png")
    ],
    cards: [
      {
        src: require("../assets/home-profile.png"),
        path: "/profile",
        title: "Profile"
      },
      {
        src: require("../assets/home-works.png"),
        path: "/works",
        title: "Works"
      },
      {
        src: require("../assets/home-library.png"),
        path: "/slides",
        title: "Slides"
      }
    ],
    activeBtn: 1,
    accessCounter: "--------"
  }),
  methods: {
    moveLink(url) {
      window.open(url, "_blank");
    },
    _goto(path, selector) {
      this.$router.push(path);
      if (selector != "0") {
        goTo(selector, 0);
      }
    },
    async count() {
      function zeroPadding(num, len) {
        return (Array(len).join("0") + num).slice(-len);
      }

      var result = 0;
      await axios
        .get(
          "https://script.google.com/macros/s/AKfycbwuIODk4RGEI9m_n7rX6ljynPh9SS6-Gp4scCp4MQ0WnBTu2M4/exec"
        )
        .then(response => {
          result = zeroPadding(response.data.count, 8);
        })
        .catch(err => {
          console.log("axios_err:", err);
        });
      return result;
    }
  },
  async created() {
    const param = this.$route.params["count"];
    this.accessCounter = Number.isInteger(Number(param))
      ? param
      : await this.count();
  }
};
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}

/* アクセスカウンタの装飾 */
@font-face {
  font-family: "DSEG";
  src: url("fonts-DSEG_v046/DSEG7-Modern-MINI/DSEG7ModernMini-Bold.woff")
    format("woff");
}
.Counter {
  text-align: center;
}
.Counter ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.Counter li {
  display: inline-block;
}
.Counter li p {
  display: block;
  padding: 8px;
}
.CounterText {
  color: white;
  font-family: "DSEG";
  font-size: 18px;
}
.CounterMain {
  padding: 0em 0em;
  margin: 0em 0;
  background: black;
  border: double 5px #83b3a4;
}

/* スタートアニメ―ションからHomeを表示する際のアニメーション */
.homePage {
  animation: fade 2.4s ease-in 0s 1 forwards;
  -webkit-animation: fade 2.4s ease-in 0s 1 forwards;
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