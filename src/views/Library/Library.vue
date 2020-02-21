<template>

  <v-app id="inspire">
    <v-content>
      <v-col>
        <v-img class="brack--text" height="90px" src="../../assets/slide5.png">
          <v-col>
            <h1 class="pagetitle font-weight-bold">Library</h1>
          </v-col>
        </v-img>
      </v-col>

      <v-container>

        <v-container>
          <v-row>
            <v-carousel height="360">
              <v-carousel-item v-for="(item,i) in items" :key="i">
                <v-card class="mx-auto" max-width="480" height="299">
                  <iframe :src="item.src" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
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
      items: [
        {
          src: "https://docs.google.com/presentation/d/e/2PACX-1vQAO0BBiAk8wFS1kSwg2zXbc0G_9E0QNgpdgBOSQmMXhVwBtUwt8jVxitXEl6RvXxEts-T-Bg_vb-wA/embed?start=false&loop=false&delayms=3000",
        },
        {
          src: "https://docs.google.com/presentation/d/e/2PACX-1vQRCrDQD_Vy8-V63iL7owU4YayRBzZvz472usc47SFnbLYaWvxVR6n2Hea3SJ7MrAoCm1lGjUIsPSIc/embed?start=false&loop=false&delayms=3000"
        },
        {
          src: "https://docs.google.com/presentation/d/e/2PACX-1vQjR0Gb67JgXhzVgnXlpiiH2oF4T0s1mvr658_2gX2wyV4VI6cDVBKhzOH6GH6DNR91OPUNtRSScOTq/embed?start=false&loop=false&delayms=3000"
        },
      ],
    }),
  }
</script>