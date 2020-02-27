<template>
  <v-app id="#inspire">
    <v-content>
      <v-container>
        <v-row>
          <svg id="ball" :width="vb_width" :height="vb_height">
            <rect
              id="game_vb"
              x="0"
              y="0"
              :width="vb_width"
              :height="vb_height"
              fill="white"
              stroke="black"
              stroke-width="2"
            />

            <circle :cx="ball_x" :cy="ball_y" :r="ball_r" />

            <rect
              :x="player_x"
              :y="player_y"
              :width="player_widht"
              :height="player_height"
              fill="black"
            />
          </svg>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { showMouseVals } from "./mouse";

export default {
  data: () => ({
    intervalId: undefined,
    vb_width: "600",
    vb_height: "400",
    ball_x: 30,
    ball_y: 30,
    ball_r: 20,
    ball_x_dir: true,
    ball_y_dir: true,
    player_widht: 100,
    player_height: 10,
    player_x: 0,
    player_y: 0
  }),
  mounted() {
    this.intervalId = setInterval(
      function() {
        this.moveBall(1, 2);
        this.player_x = showMouseVals("game_vb").x - this.player_widht / 2;
        this.player_y = showMouseVals("game_vb").y - this.player_height / 2;
      }.bind(this),
      10
    );
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    moveBall: function(x_diff, y_diff) {
      if (this.ball_x <= 0 || this.ball_x >= this.vb_width) {
        this.ball_x_dir = !this.ball_x_dir;
      }
      this.ball_x = this.ball_x_dir
        ? this.ball_x + x_diff
        : this.ball_x - x_diff;

      if (
        this.ball_y <= 0 ||
        this.ball_y >= this.vb_height ||
        (this.ball_x >= this.player_x &&
          this.ball_x <= this.player_x + this.player_widht &&
          this.ball_y >= this.player_y - 1 &&
          this.ball_y <= this.player_y + 1)
      ) {
        this.ball_y_dir = !this.ball_y_dir;
      }
      this.ball_y = this.ball_y_dir
        ? this.ball_y + y_diff
        : this.ball_y - y_diff;
    }
  }
};
</script>