<template>
  <v-app id>
    <v-content class="background">
      <v-col>
        <v-img class="white--text" height="90px" src="../assets/slide3.png">
          <v-col>
            <h1 class="pagetitle font-weight-bold">Works</h1>
          </v-col>
        </v-img>
      </v-col>

      <div class="grid">
        <div class="item" v-for="(item,i) in items" :key="i">
          <v-card class="mx-auto" max-width="550" height="305">
            <v-img class="white--text" height="100px" :src="item.src"></v-img>
            <v-card-title>
              <div>
                <span>{{ item.title }}</span>
              </div>
              <div>
                <v-btn text :href="item.link" target="_blank">
                  <v-icon>fab fa-github</v-icon>
                </v-btn>
              </div>
            </v-card-title>
            <v-card-subtitle>{{ item.keyword }}</v-card-subtitle>
            <v-card-text>
              {{ item.msg }}
              <router-link v-if="item.routerLinkTo !== undefined" :to="item.routerLinkTo">
                <a>{{ item.routerLinkMsg }}</a>
              </router-link>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      {
        src: require("../assets/vtd4.png"),
        title: "vtd4",
        keyword: "TD4 / CPU Emulator / Vue.js",
        msg:
          "4ビットCPU TD4のエミュレータです。Vue.js・Vuetifyで作成しました。",
        link: "https://github.com/w-haibara/vtd4",
        routerLinkTo: "/td4",
        routerLinkMsg: "こちらで試すことができます。"
      },
      {
        src: require("../assets/portfolio.png"),
        title: "portfolio",
        keyword: "Vue.js / Vue Router / Github Actions",
        msg:
          "このポートフォリオです。Vue.jsでSPAを構築しています。また、Github Actionsを用いて、ビルドとデプロイを自動化しています。",
        link: "https://github.com/w-haibara/w-haibara.github.io"
      },
      {
        src: require("../assets/caes.jpg"),
        title: "caes",
        keyword: "C / AES Encryption",
        msg:
          "AES暗号の理解を深めるために，C言語でAES-128-CTRをフルスクラッチ実装しました．",
        link: "https://github.com/w-haibara/caes"
      },
      {
        src: require("../assets/syshello.jpg"),
        title: "syshello",
        keyword: "Linux System Call / ShellScript",
        msg:
          "Linuxシステムコールの開発に必要な， Linuxソースコードのダウンロードやシステムコールテーブルの書き換え， Linuxのビルドなどの作業を自動化するスクリプトです",
        link: "https://github.com/w-haibara/syshello"
      },
      {
        src: require("../assets/chttp.jpg"),
        title: "chttp",
        keyword: "C / Linux / Socket Programming",
        msg:
          "C言語によるソケットプログラミングで作成した，HTTP サーバー・クライアントです．",
        link: "https://github.com/w-haibara/chttp"
      },
      {
        src: require("../assets/esp8266.jpg"),
        title: "自走式Webサーバー",
        keyword: "ESP8266 / Web Server / Robotics",
        msg:
          "WiFIを扱えるマイコン ESP8266を使って制作した，走るWebサーバです．",
        link: "https://github.com/w-haibara/Self-propelledWebServer"
      }
    ],
    model: 0
  }),
  methods: {
    moveLink(url) {
      window.open(url, "_blank");
    }
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