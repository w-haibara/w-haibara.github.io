<template>
  <div class="background">
    <WatToWasm class="page" />  
  </div>
</template>

<script>
import WatToWasm from "./vuewat/src/components/WatToWasm";
export default {
  name: "App",
  components: {
    WatToWasm
  }
}