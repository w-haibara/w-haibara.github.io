<template>
    <v-app id="#inspire">
<v-content>
<v-container>

<v-row>

<svg :width=vb_width :height=vb_height>
    <rect id="picsel_vb" x="0" y="0" :width=vb_width :height=vb_height fill="gray" stroke="black" stroke-width="2" ></rect>
    <!--
        <rect :x=player_x :y=player_y :width=player_widht :height=player_height fill="black"></rect>
    -->
    <rect id="pic" v-for="pic in picsels" :key=pic.index :x=pic.x :y=pic.y :width=pic_widht :height=pic_height :fill=pic.color></rect>
</svg>

</v-row>

</v-container>
</v-content>  
</v-app>
</template>

<script>
import { showMouseVals } from './mouse' // eslint-disable-line
var el = document.getElementById("#pic"); // eslint-disable-line
export default {
    data: () => ({
      intervalId: undefined,
      vb_width: 302,
      vb_height: 302,
      player_widht: 100,
      player_height: 10,
      player_x: 0,
      player_y: 0,
      pic_widht: 10,
      pic_height: 10,
      pic_col: 10,
      pic_low: 10,

      picsel_index: 0,
      color_index: 1,
      picsel_colors: ['white', 'red', 'green', 'blue', 'black'],

      picsels: [
        {
            x: 1,
            y: 1,
            color: 'white'
        }
      ],
    }),
    created: function() {
        for (var col = 0; col < 30; col++) {
            for (var row = 0; row < 30; row++) {
                if(col == 0 && row == 0){
                    continue
                }
                this.picsels.push(
                    {
                        x: row*10 + 1,
                        y: col*10 + 1,
                        color: 'white'
                    }
                )
            }
        }
    },
    mounted () {
        this.intervalId = setInterval(function () {
            //this.player_x = showMouseVals("pivsel_vb").x - this.player_widht/2
            //this.player_y = showMouseVals("pivsel_vb").y - this.player_height/2

            //this.picsels[this.picsel_index].color = (this.picsels[this.picsel_index].color === 'white')? 'black': 'white'
            this.picsels[this.picsel_index].color = this.picsel_colors[this.color_index]
            this.picsels[this.picsel_index+300].color = this.picsel_colors[this.color_index+1]
            this.picsels[this.picsel_index+600].color = this.picsel_colors[this.color_index+2]

            this.picsel_index++
            if(this.picsel_index == 300){
                this.picsel_index = 0
                this.color_index++
            } 
            if(this.color_index == 3){
                this.color_index  = 0
            }
        }.bind(this), 1)
    },
    beforeDestroy () {
      clearInterval(this.intervalId)
    },
    methods: {
    },
    computed: {
    }
}
</script>