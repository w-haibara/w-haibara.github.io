<template>
  <v-app>
    <v-content>
      <v-col>
        <v-img class="white--text" height="90px" src="../assets/slide1.png">
          <v-col>
            <h1 class="pagetitle font-weight-bold">Profile</h1>
          </v-col>
        </v-img>
      </v-col>

      <v-container>
        <v-container>
          <v-row class="white lighten-4">
            <v-col>
              <h1 class="pagetitle font-weight-bold">Wataru HAIBARA</h1>
              <v-row>
                <v-btn class="ma-2" color="gray" dark @click.stop="dialog1 = true">
                  所属
                  <v-icon dark right>fas fa-school</v-icon>
                </v-btn>
                <v-dialog v-model="dialog1" max-width="500">
                  <v-card>
                    <v-card-title class="headline">所属</v-card-title>
                    <v-card-text>
                      <span>室蘭工業大学 情報電子工学系学科 2年</span>
                      <br />
                      <span>一般社団法人LOCAL (学生部 部長)</span>
                    </v-card-text>
                  </v-card>
                </v-dialog>
                <span>
                  <span>室蘭工業大学 B2</span>
                  <br />
                  <span>一般社団法人LOCAL (学生部)</span>
                </span>
              </v-row>
              <v-row>
                <v-btn class="ma-2" color="gray" dark @click.stop="dialog2 = true">
                  活動
                  <v-icon dark right>fas fa-walking</v-icon>
                </v-btn>
                <v-dialog v-model="dialog2" max-width="500">
                  <v-card>
                    <v-card-title class="headline">活動</v-card-title>
                    <v-card-text>
                      <span>LOCAL学生部 部長</span>
                      <br />
                      <span>NICT主催『SecHack365』 学習駆動コース フィジカルゼミ トレーニー</span>
                      <br />
                      <span>『JANOG45』 プログラム発表</span>
                      <br />
                      <span>技術同人誌執筆『ESP-WROOM-02で作る 自走式Webサーバー入門』</span>
                      <br />
                      <span>『高専カンファレンス in 北海道』 登壇</span>
                      <br />
                      <span>『LOCAL DEVELOPER DAY ’19 /Security』 登壇</span>
                      <br />
                      <span>株式会社ミクシィ『Bug Shooting Challenge』『TDD challenge』参加</span>
                    </v-card-text>
                  </v-card>
                </v-dialog>
                <span>
                  <span>SecHack365 トレーニー</span>
                  <br />
                  <span>JANOG45 プログラム発表</span>
                  <br />
                  <span>etc.</span>
                </span>
              </v-row>
            </v-col>

            <v-col>
              <div>
                <p>
                  北海道産まれ北海道育ちの生粋の道産子です．
                  電気工作やDIYに熱中した小学生時代を過ごし，油絵を描いたりメディアアートに憧れたりした中高時代を過ごしていました．
                  大学に入ってからはコミュニティ活動に出合い，道内の情報系学生達との関わりを持つようになりました．
                  技術的には低レイヤーやWebフロントエンドなどに関する開発をしています．
                </p>
              </div>
            </v-col>
          </v-row>
        </v-container>

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
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    dialog1: false,
    dialog2: false
  }),
  methods: {
    moveLink(url) {
      window.open(url, "_blank");
    }
  }
};
</script>
