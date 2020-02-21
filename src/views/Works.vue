<template>

    <v-app id="inspire">
        <v-content>

                <v-col>
                    <v-img class="black--text" height="90px" src="../assets/slide4.png">
                        <v-col>
                            <h1 class="pagetitle font-weight-bold">Works</h1>
                        </v-col>
                    </v-img>
                </v-col>

            <v-container>

                <v-container>
                    <v-row>
                        <v-carousel cycle interval="10000" height="360">
                            <v-carousel-item v-for="(item,i) in items" :key="i">
                                <v-card class="mx-auto" max-width="550" height="305">
                                    <v-img class="white--text" height="100px" :src="item.src"></v-img>
                                    <v-card-title>
                                        <div><span>{{ item.title }}</span></div>
                                        <div><v-btn text :href=item.link target="_blank">
                                            <v-icon>fab fa-github</v-icon>
                                        </v-btn></div>
                                    </v-card-title>
                                    <v-card-subtitle>{{ item.keyword }}</v-card-subtitle>
                                    <v-card-text>{{ item.msg }}</v-card-text>
                                </v-card>
                            </v-carousel-item>
                        </v-carousel>
                    </v-row>
                </v-container>

            </v-container>

    </v-content>  
</v-app>

</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      items: [
        {
            src: require('../assets/caes.jpg'),
            title: "caes",
            keyword: "C / AES Encryption",
            msg: "AES暗号の理解を深めるために，C言語でAES-128-CTRをフルスクラッチ実装しました．",
            link: "https://github.com/w-haibara/caes",
        },
        {
            src: require('../assets/syshello.jpg'),
            title: "syshello",
            keyword: "Linux System Call / ShellScript",
            msg: "Linuxシステムコールの開発に必要な， Linuxソースコードのダウンロードやシステムコールテーブルの書き換え， Linuxのビルドなどの作業を自動化するスクリプトです",
            link: "https://github.com/w-haibara/syshello",
        },
        {
            src: require('../assets/chttp.jpg'),
            title: "chttp",
            keyword: "C / Linux / Socket Programming",
            msg: "C言語によるソケットプログラミングで作成した，HTTP サーバー・クライアントです．",
            link: "https://github.com/w-haibara/chttp",
        },
        {
            src: require('../assets/esp8266.jpg'),
            title: "自走式Webサーバー",
            keyword: "ESP8266 / Web Server / Robotics",
            msg: "ESP8266は簡単にTCP/IPプロトコルを扱えるマイコンです． あくまで「マイコン」なので，GPIOの処理も可能です． 「それじゃあ，ESP8266をWebサーバーとして動かしながら，モーター制御もさせてみようかぁ」 という思い付きで作ったものです．",
            link: "https://github.com/w-haibara/Self-propelledWebServer",
        },
      ],
      model: 0,
    }),
    methods: {
      moveLink (url) {
        window.open(url, '_blank')
      }
    },
  }
</script>