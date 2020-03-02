<template>
  <v-app id="#inspire">
    <v-content>
      <v-row justify="space-around" no-gutters>
        <div id="title">
          <ul>
            <div>
              <h3>TD4 Emulator</h3>
            </div>
            <div>
              <v-switch v-model="isPowerOn" label="Power" v-on:change="powerOn()"></v-switch>
            </div>
          </ul>
        </div>
      </v-row>

      <v-col no-gutters>
        <v-row justify="space-around" no-gutters>
          <v-card width="33%" outlined tile>
            <v-col no-gutters>
              <h4>Metrics</h4>
              <v-col>
                <v-row justify="space-around" class="mb-2">
                  <font size="3">Program Counter: {{ toBin(preJumpedProgramCounter) }}</font>
                </v-row>
                <v-row justify="space-around" class="mb-2">
                  <font size="3">C Flag: {{ toBin(CFlag, 1) }}</font>
                  <font size="3">Frequency: {{ frequency }} Hz</font>
                </v-row>
                <v-row justify="space-around" class="mb-2">
                  <font size="3">Opecode: {{ opcode }}</font>
                  <font size="3">Imdata: {{ imdata }}</font>
                </v-row>
                <v-row justify="space-around" class="mb-2">
                  <font size="3">Register A: {{ toBin(registerA) }}</font>
                  <font size="3">Register B: {{ toBin(registerB) }}</font>
                </v-row>
                <v-select
                  v-model="selectedProgram"
                  :items="programs"
                  item-text="name"
                  item-value="arry"
                  label="LOAD"
                  dense
                  return-object
                  single-line
                ></v-select>
              </v-col>
            </v-col>
          </v-card>
          <v-card width="33%" outlined tile>
            <v-col no-gutters>
              <h4>I/O</h4>
              <v-container>
                <h5>OUTP</h5>
                <v-row>
                  <v-col>
                    <v-row justify="space-around" class="mb-2">
                      <v-avatar
                        class="white--text headline"
                        :color="outp.color"
                        size="32"
                        v-for="outp in outps"
                        :key="outp.num"
                      >{{ outp.num }}</v-avatar>
                    </v-row>
                  </v-col>
                </v-row>
                <h5>INP</h5>
                <v-row>
                  <v-col>
                    <v-row justify="space-around" class="mb-2">
                      <v-btn icon v-for="inp in inps" :key="inp.num" @click="setInp(inp.num)">
                        <v-avatar
                          class="white--text headline"
                          :color="inp.color"
                          size="32"
                        >{{ inp.num }}</v-avatar>
                      </v-btn>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-card>
          <v-card width="33%" outlined tile>
            <v-col no-gutters>
              <h4>Clock Generator</h4>
              <v-col>
                <v-row justify="space-around" class="mb-1">
                  <v-btn :disabled="isManualFreqMode" v-on:click="setFrequency(1)">
                    <font size="2">1 Hz</font>
                  </v-btn>
                  <v-btn :disabled="isManualFreqMode" v-on:click="setFrequency(5)">
                    <font size="2">5 Hz</font>
                  </v-btn>
                  <v-btn :disabled="isManualFreqMode" v-on:click="setFrequency(10)">
                    <font size="2">10 Hz</font>
                  </v-btn>
                </v-row>
                <v-row justify="space-around" class="mb-1">
                  <v-btn :disabled="isManualFreqMode" v-on:click="setFrequency(0)">
                    <font size="2">STOP</font>
                  </v-btn>
                  <v-btn v-on:click="reset()">
                    <font size="2">RESET</font>
                  </v-btn>
                </v-row>
                <v-col>
                  <v-switch
                    v-model="isManualFreqMode"
                    label="Manual Frequency"
                    v-on:change="setFrequency(manualFreq)"
                  ></v-switch>
                  <v-slider
                    v-model="manualFreq"
                    :disabled="!isManualFreqMode"
                    class="align-center"
                    :max="freqMax"
                    :min="freqMin"
                    hide-details
                    :thumb-size="24"
                    thumb-label="always"
                    v-on:change="setFrequency(manualFreq)"
                  ></v-slider>
                </v-col>
              </v-col>
            </v-col>
          </v-card>
        </v-row>
        <v-card width="100%" outlined tile>
          <v-col no-gutters>
            <h4>Program Memory</h4>
            <v-col>
              <font size="2">
                <v-row justify="space-around" class="mb-1">
                  <v-card
                    v-for="instruction in instructions"
                    :key="instruction.addr"
                    :color="instruction.color"
                    width="12%"
                  >
                    <v-text-field v-model="instruction.val" :label="toBin(instruction.addr)"></v-text-field>
                  </v-card>
                </v-row>
              </font>
            </v-col>
          </v-col>
        </v-card>
      </v-col>
    </v-content>
  </v-app>
</template>

<script>
import { mask } from "vue-the-mask";

export default {
  directives: {
    mask
  },
  data: () => ({
    intervalId: undefined,
    isPowerOn: false,
    registerA: "0000",
    registerB: "0000",
    CFlag: 0,
    programCounter: 0,
    selectedBeepNum: { label: "--", value: "0" },
    beepNums: [
      { label: "-", value: "0" },
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" }
    ],
    frequency: 1,
    freqMax: 20,
    freqMin: 0,
    manualFreq: 1,
    isManualFreqMode: false,
    outps: [
      {
        num: 0,
        color: "blue-grey darken-1",
        state: false
      },
      {
        num: 1,
        color: "blue-grey darken-1",
        state: false
      },
      {
        num: 2,
        color: "blue-grey darken-1",
        state: false
      },
      {
        num: 3,
        color: "blue-grey darken-1",
        state: false
      }
    ],
    inps: [
      {
        num: 0,
        color: "blue-grey darken-1",
        state: false
      },
      {
        num: 1,
        color: "blue-grey darken-1",
        state: false
      },
      {
        num: 2,
        color: "blue-grey darken-1",
        state: false
      },
      {
        num: 3,
        color: "blue-grey darken-1",
        state: false
      }
    ],
    mask: "####-####",
    instructions: [
      {
        addr: 0,
        color: "white",
        state: true,
        val: "0000-0000"
      },
      {
        addr: 1,
        color: "white",
        state: false,
        val: "0000-0000"
      },
      {
        addr: 2,
        color: "white",
        state: false,
        val: "0000-0000"
      },
      {
        addr: 3,
        color: "white",
        state: false,
        val: "0000-0000"
      },
      {
        addr: 4,
        color: "white",
        state: false,
        val: "0000-0000"
      },
      {
        addr: 5,
        color: "white",
        state: false,
        val: "0000-0000"
      },
      {
        addr: 6,
        color: "white",
        state: false,
        val: "0000-0000"
      },
      {
        addr: 7,
        color: "white",
        state: false,
        val: "0000-0000"
      },
      {
        addr: 8,
        color: "white",
        state: false,
        val: "0000-0000"
      },
      {
        addr: 9,
        color: "white",
        state: false,
        val: "0000-0000"
      },
      {
        addr: 10,
        color: "white",
        state: false,
        val: "0000-0000"
      },
      {
        addr: 11,
        color: "white",
        state: false,
        val: "0000-0000"
      },
      {
        addr: 12,
        color: "white",
        state: false,
        val: "0000-0000"
      },
      {
        addr: 13,
        color: "white",
        state: false,
        val: "0000-0000"
      },
      {
        addr: 14,
        color: "white",
        state: false,
        val: "0000-0000"
      },
      {
        addr: 15,
        color: "white",
        state: false,
        val: "0000-0000"
      }
    ],
    opcode: "0000",
    imdata: "0000",
    programs: [
      {
        name: "--",
        array: [
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000"
        ]
      },
      {
        name: "brink",
        array: [
          "1011-0000",
          "1011-0001",
          "1011-0010",
          "1011-0011",
          "1011-0100",
          "1011-0101",
          "1011-0110",
          "1011-0111",
          "1011-1000",
          "1011-1001",
          "1011-1010",
          "1011-1011",
          "1011-1100",
          "1011-1101",
          "1011-1110",
          "1011-1111"
        ]
      },
      {
        name: "loop",
        array: [
          "1111-0010",
          "0000-0000",
          "1111-1111",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000"
        ]
      },
      {
        name: "add",
        array: [
          "0000-0001",
          "1111-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000"
        ]
      },
      {
        name: "io",
        array: [
          "1011-0000",
          "0010-0000",
          "0100-0000",
          "1001-0000",
          "1111-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000",
          "0000-0000"
        ]
      }
    ],
    innerSelectedProgram: {
      name: "--",
      array: [
        "0000-0000",
        "0000-0000",
        "0000-0000",
        "0000-0000",
        "0000-0000",
        "0000-0000",
        "0000-0000",
        "0000-0000",
        "0000-0000",
        "0000-0000",
        "0000-0000",
        "0000-0000",
        "0000-0000",
        "0000-0000",
        "0000-0000",
        "0000-0000"
      ]
    },
    isJmp: false,
    preJumpedProgramCounter: 0
  }),
  computed: {
    selectedProgram: {
      get() {
        return this.innerSelectedProgram;
      },
      set(value) {
        this.setProgram(value.array);
        this.innerSelectedProgram = value;
        this.reset();
      }
    }
  },
  methods: {
    addBin(binA, binB) {
      var ans = parseInt(binA, 2) + parseInt(binB, 2);
      if (ans >= 16) {
        this.CFlag = 1;
        ans = ans - 16;
      } else {
        this.CFlag = 0;
      }

      console.log(
        "binA: " +
          binA +
          " binB: " +
          binB +
          " ans: " +
          ans +
          " CFlag: " +
          this.CFlag
      );
      return ans.toString(2).padStart(4, "0");
    },
    imp2bin() {
      var ans = this.inps[3].state ? 1 : 0;
      ans += this.inps[2].state ? 2 : 0;
      ans += this.inps[1].state ? 4 : 0;
      ans += this.inps[0].state ? 8 : 0;
      return ans.toString(2).padStart(4, "0");
    },
    bin2outp(bin) {
      this.setOutp(3, bin[3] == 1);
      this.setOutp(2, bin[2] == 1);
      this.setOutp(1, bin[1] == 1);
      this.setOutp(0, bin[0] == 1);
    },
    MOV_A_Im() {
      this.registerA = this.imdata;
      this.CFlag = 0;
    },
    MOV_B_Im() {
      this.registerB = this.imdata;
      this.CFlag = 0;
    },
    MOV_A_B() {
      this.registerA = this.registerB;
      this.CFlag = 0;
    },
    MOV_B_A() {
      this.registerB = this.registerA;
      this.CFlag = 0;
    },
    ADD_A_Im() {
      this.registerA = this.addBin(this.registerA, this.imdata);
    },
    ADD_B_Im() {
      this.registerB = this.addBin(this.registerB, this.imdata);
    },
    IN_A() {
      console.log("IN_A: " + this.imp2bin());
      this.registerA = this.imp2bin();
      this.CFlag = 0;
    },
    IN_B() {
      console.log("IN_B: " + this.imp2bin());
      this.registerA = this.imp2bin();
      this.CFlag = 0;
    },
    OUT_Im() {
      console.log("OUT_Im: " + this.imdata);
      this.bin2outp(this.imdata);
      this.CFlag = 0;
    },
    OUT_B() {
      console.log("OUT_B: " + this.registerB);
      this.bin2outp(this.registerB);
      this.CFlag = 0;
    },
    JMP_Im() {
      console.log("JMP_im: " + this.imdata);
      this.preJumpedProgramCounter = this.programCounter;
      this.programCounter = parseInt(this.imdata, 2);
      this.isJmp = true;
      this.CFlag = 0;
    },
    JNC_Im() {
      console.log("JNC_Im: " + this.imdata);
      if (this.CFlag != 1) {
        if (this.CFlag == 0) {
          this.JMP_Im();
        } else {
          console.error("value of C Flag is invalid");
        }
      }
      this.CFlag = 0;
    },
    powerOn() {
      this.reset();
      if (this.isPowerOn) {
        this.setProgramCounter();
      } else {
        clearInterval(this.intervalId);
        this.instructions[this.preJumpedProgramCounter].color = "white";
      }
    },
    reset() {
      this.registerA = "0000";
      this.registerB = "0000";
      this.CFlag = 0;

      this.isManualFreqMode = false;

      this.setOutp(0, false);
      this.setOutp(1, false);
      this.setOutp(2, false);
      this.setOutp(3, false);

      this.opcode = "0000";
      this.imdata = "0000";

      this.programCounter = 0;
    },
    toBin(n, len) {
      if (len == undefined) len = 4;
      return (Array(len).join("0") + parseInt(n.toString(2))).slice(-len);
    },
    setOutp(n, state) {
      this.outps[n].state = state;
      if (state) {
        this.outps[n].color = "light-blue accent-3";
      } else {
        this.outps[n].color = "blue-grey darken-1";
      }
    },
    setInp(n, state) {
      if (state == undefined) state = !this.inps[n].state;
      this.inps[n].state = state;
      this.inps[n].color = this.inps[n].state
        ? "light-blue accent-3"
        : "blue-grey darken-1";
    },
    setProgramCounter() {
      this.intervalId = setInterval(
        function() {
          console.log("[pc: " + this.programCounter + "]------------------");
          this.setNextOpecode(this.programCounter);
          console.log("------------------");
        }.bind(this),
        1000 / this.frequency
      );
    },
    setFrequency(frequency) {
      if (this.intervalId != undefined) clearInterval(this.intervalId);
      this.frequency = frequency;
      if (frequency != 0) {
        this.setProgramCounter();
      } else {
        this.intervalId = undefined;
      }
    },
    setManualFrequency(frequency) {
      this.frequency = frequency;
      clearInterval(this.intervalId);
      this.setProgramCounter();
    },
    setNextOpecode() {
      this.instructions[this.preJumpedProgramCounter].color = "white";
      this.instructions[this.programCounter].color = "cyan lighten-1";

      this.readInstruction();

      if (!this.isJmp) {
        this.preJumpedProgramCounter = this.programCounter;
        this.programCounter =
          this.programCounter >= 15 ? 0 : this.programCounter + 1;
      } else {
        this.isJmp = false;
      }
    },
    readInstruction() {
      [this.opcode, this.imdata] = this.instructions[
        this.programCounter
      ].val.split("-");
      switch (this.opcode) {
        case "0011":
          this.MOV_A_Im();
          break;
        case "0111":
          this.MOV_B_Im();
          break;
        case "0001":
          this.MOV_A_B();
          break;
        case "0100":
          this.MOV_B_A();
          break;
        case "0000":
          this.ADD_A_Im();
          break;
        case "0101":
          this.ADD_B_Im();
          break;
        case "0010":
          this.IN_A();
          break;
        case "0110":
          this.IN_B();
          break;
        case "1011":
          this.OUT_Im();
          break;
        case "1001":
          this.OUT_B();
          break;
        case "1111":
          this.JMP_Im();
          break;
        case "1110":
          this.JNC_Im();
          break;
        default:
          console.error("Can not read the opcode[" + this.programCounter + "]");
      }
    },
    setProgram(instructionArray) {
      if (instructionArray.length != 16) {
        console.error(
          "length of instructionArray is invalid: " + instructionArray.length
        );
        return;
      }

      for (var i = 0; i < 16; i++) {
        this.instructions[i].val = instructionArray[i];
      }

      this.mask = "####-####";
    }
  },
  created() {},
  mounted() {
    if (this.isPowerOn) {
      this.setProgramCounter();
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  }
};
</script>

<style scoped>
#title ul div {
  display: inline-block;
  width: 150px;
  vertical-align: center;
}
</style>>