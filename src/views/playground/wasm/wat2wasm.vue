<template>
  <div class="background">
    <WatToWasm class="page" />  
  </div>
</template>

<script>
import WatToWasm from "../vuewat/src/components/WatToWasm.vue";
export default {
  name: "App",
  components: {
    WatToWasm
  }
}
