<template>
  <v-app id="#inspire">
    <v-content>
      <v-container>
        <svg :width="vb_width" :height="vb_height">
          <rect
            id="picsel_vb"
            x="0"
            y="0"
            :width="vb_width"
            :height="vb_height"
            fill="gray"
            stroke="black"
            stroke-width="2"
          />
          <!--
        <rect :x=player_x :y=player_y :width=player_widht :height=player_height fill="black"></rect>
          -->
          <rect
            id="pic"
            v-for="pic in picsels"
            :key="pic.index"
            :x="pic.x"
            :y="pic.y"
            :width="pic_widht"
            :height="pic_height"
            :fill="pic.color"
          />
        </svg>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { showMouseVals } from "./mouse"; // eslint-disable-line
var el = document.getElementById("#pic"); // eslint-disable-line
export default {
  data: () => ({
    intervalId: undefined,
    vb_width: 302,
    vb_height: 302,

    pic_widht: 10,
    pic_height: 10,
    pic_col: 30,
    pic_low: 30,
    picsel_index: 0,
    color_index: 1,
    picsel_colors: ["white", "red", "green", "blue", "black"],
    picsels: [
      {
        x: 1,
        y: 1,
        color: "white"
      }
    ],

    player_x: 0,
    player_y: 0,

    ball_x: 10,
    ball_y: 10,
    ball_x_dir: true,
    ball_y_dir: true
  }),
  created: function() {
    for (var col = 0; col < this.pic_col; col++) {
      for (var row = 0; row < this.pic_low; row++) {
        if (col == 0 && row == 0) {
          continue;
        }
        this.picsels.push({
          x: row * 10 + 1,
          y: col * 10 + 1,
          color: "white"
        });
      }
    }
    window.addEventListener("keydown", this.keyAction);
  },
  methods: {
    keyAction(e) {
      var right = e.keyCode == 39;
      var left = e.keyCode == 37;
      var up = e.keyCode == 38;
      var down = e.keyCode == 40;

      if (up) {
        this.player_y =
          this.player_y >= this.pic_col - 4
            ? this.pic_col - 4
            : this.player_y + 1;
      } else if (down) {
        this.player_y = this.player_y <= 0 ? 0 : this.player_y - 1;
      }

      if (right) {
        this.player_x =
          this.player_x >= this.pic_low - 1
            ? this.pic_low - 1
            : this.player_x + 1;
      } else if (left) {
        this.player_x = this.player_x <= 0 ? 0 : this.player_x - 1;
      }

      //console.log(e.keyCode, right, left, up, down, this.player_x, this.player_y)
    },
    point: function(x, y, color) {
      // eslint-disable-line
      y = this.pic_low - y - 1;
      if (!color) color = "black";
      this.picsels[x + y * 30].color = color;
    },
    rect: function(x, y, width, height, color) {
      // eslint-disable-line
      for (var row = x; row < width + x; row++) {
        for (var col = y; col < height + y; col++) {
          this.point(row, col, color);
        }
      }
    },
    clear: function(color) {
      // eslint-disable-line
      if (!color) color = "white";
      this.rect(0, 0, this.pic_col, this.pic_low, color);
    },
    drawPlayer: function(x, y, color) {
      // eslint-disable-line
      this.rect(x, y, 1, 4, color);
    },
    moveBall: function(v_x, v_y, color) {
      // eslint-disable-line
      if (!color) color = "blue";

      if (this.ball_x >= this.pic_low - 1) this.ball_x_dir = false;
      if (this.ball_x <= 0) this.ball_x_dir = true;
      this.ball_x = this.ball_x_dir ? this.ball_x + 1 : this.ball_x - 1;

      if (this.ball_y >= this.pic_col - 2) this.ball_y_dir = false;
      if (this.ball_y <= 0) this.ball_y_dir = true;
      this.ball_y = this.ball_y_dir
        ? this.ball_y + 2
        : this.ball_y == this.pic_col - 2
        ? this.ball_y + 1
        : this.ball_y == 1
        ? 0
        : this.ball_y - 2;

      console.log(this.ball_x, this.ball_y);
      this.point(this.ball_x, this.ball_y, color);
    }
  },
  computed: {},
  mounted() {
    this.intervalId = setInterval(
      function() {
        this.clear();
        //this.rect(15, 0, 5, 1, 'gray')
        //this.rect(20, 0, 5, 2, 'gray')
        //this.rect(25, 0, 5, 4, 'gray')
        this.drawPlayer(this.player_x, this.player_y);
        this.moveBall(1, 3);
      }.bind(this),
      70
    );
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
    window.removeEventListener("keydown", this.keyAction);
  }
};
</script>