<template>
  <div class="background">
    <v-content>
      <v-container fluid>
        <!--
        <v-btn v-on:click="wat2wasm()">Wat->Wasm</v-btn>
        -->
        <v-btn v-on:click="runWasm()">Run</v-btn>
        <v-dialog v-if="errorReported" v-model="dialog" scrollable max-width="70%">
          <template v-slot:activator="{ on }">
            <v-btn color="error" dark v-on="on">Error</v-btn>
          </template>
          <v-card>
            <v-card-title>Error log</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;">
              <p>{{ errorMsg }}</p>
            </v-card-text>
            <v-divider></v-divider>
          </v-card>
        </v-dialog>

        <v-row>
          <v-col cols="12" sm="6">
            <v-textarea
              class="codearea"
              spellcheck="false"
              filled
              label="JS Code"
              auto-grow
              background-color="grey lighten-5"
              color="grey darken-4"
              v-model="js_code"
            ></v-textarea>
          </v-col>
          <v-col cols="12" sm="6">
            <v-textarea
              class="codearea"
              :readonly="true"
              spellcheck="false"
              filled
              label="Output"
              auto-grow
              background-color="grey lighten-5"
              color="grey darken-4"
              v-model="output"
            ></v-textarea>
          </v-col>
          <!--
          <v-col cols="12" sm="6">
            <v-textarea
              class="codearea"
              spellcheck="false"
              filled
              label="Wat Code"
              auto-grow
              background-color="grey lighten-5"
              color="grey darken-4"
              v-model="wasm_code"
            ></v-textarea>
          </v-col>
          -->
          <v-col cols="12" sm="6">
            <v-textarea
              class="codearea"
              spellcheck="false"
              filled
              label="Wasm Code"
              auto-grow
              background-color="grey lighten-5"
              color="grey darken-4"
              v-model="wat_code_disp"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>


<script>
class Token {
  constructor(value, type) {
    this.value = value;
    this.type = type;
  }
}

class MultiWayTreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

export default {
  data: () => ({
    js_code:
      "const instance = new WebAssembly.Instance(new WebAssembly.Module(Uint8Array.from(code)));\nreturn 'result: ' + instance.exports.add(3, 5);",
    output: "",
    wasm_code:
      '(module\n\t(func $add (param $lhs i32) (param $rhs i32) (result i32)\n\t\tlocal.get $lhs\n\t\tlocal.get $rhs\n\t\ti32.add)\n\t(export "add" (func $add))\n)',
    wat_code: [
      0x00,
      0x61,
      0x73,
      0x6d,
      0x01,
      0x00,
      0x00,
      0x00,
      0x01,
      0x87,
      0x80,
      0x80,
      0x80,
      0x00,
      0x01,
      0x60,
      0x02,
      0x7f,
      0x7f,
      0x01,
      0x7f,
      0x03,
      0x82,
      0x80,
      0x80,
      0x80,
      0x00,
      0x01,
      0x00,
      0x07,
      0x87,
      0x80,
      0x80,
      0x80,
      0x00,
      0x01,
      0x03,
      0x61,
      0x64,
      0x64,
      0x00,
      0x00,
      0x0a,
      0x8d,
      0x80,
      0x80,
      0x80,
      0x00,
      0x01,
      0x87,
      0x80,
      0x80,
      0x80,
      0x00,
      0x00,
      0x20,
      0x00,
      0x20,
      0x01,
      0x6a,
      0x0b
    ],
    wat_code_disp: "",
    errorMsg: "",
    errorReported: false
  }),
  methods: {
    printTree(root, index) {
      if (index === 0) {
        console.log("[printTree]");
      }

      if (root === null) {
        return;
      }

      console.log("  node" + index + " " + root.value);

      ++index;

      for (let node of root.children) {
        this.printTree(node, index);
      }
    },
    multiWayTree() {
      // ノードを作る
      const a = new MultiWayTreeNode("A");
      const b = new MultiWayTreeNode("B");
      const c = new MultiWayTreeNode("C");
      const d = new MultiWayTreeNode("D");
      const e = new MultiWayTreeNode("E");
      const f = new MultiWayTreeNode("F");
      const g = new MultiWayTreeNode("G");
      const h = new MultiWayTreeNode("H");

      // 各ノードをつなぐ
      a.children.push(b);

      b.children.push(c);
      b.children.push(d);
      b.children.push(e);

      c.children.push(f);
      d.children.push(g);
      d.children.push(h);

      this.printTree(a, 0);
    },
    printTokens(tokens) {
      console.log("[printTokens]");
      for (let token of tokens) {
        console.log("  " + token.type + ": " + token.value);
      }
    },
    /* 子ノードをそれぞれのトークン列に分割 */
    parseChildren(tokens, parent) {
      if (
        tokens[0].type != "rpar" ||
        tokens[tokens.length - 1].type != "lpar"
      ) {
        return null;
      }

      let childrenTokens = [];
      let childrenIndex = 0;
      let rpar = 0;
      let lpar = 0;

      for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].type === "rpar") {
          ++rpar;
        } else if (tokens[i].type === "lpar") {
          ++lpar;
        }

        if (rpar === lpar) {
          console.log(childrenIndex + " " + (i + 1));
          console.log(tokens.slice(childrenIndex, i + 1));
          childrenTokens.push(tokens.slice(childrenIndex, i + 1));
          childrenIndex = i + 1;
        }
      }

      for (let token of childrenTokens) {
        //console.log(token);
        this.parse(token, parent);
      }
    },
    parse(tokens, parentNode) {
      /* parse時のエラーの報告 */
      function parseError(msg) {
        console.error("parse error [" + msg + "]");
      }

      console.log("[parse]");

      if (tokens[0].type != "rpar") {
        parseError("最初の(がないよ tokens[0].type:" + tokens[0].type);
      }
      if (tokens[tokens.length - 1].type != "lpar") {
        parseError(
          "最後の)がないよ tokens[tokens.length - 1].type:" +
            tokens[tokens.length - 1].type
        );
      }
      tokens.shift(); // 最初の(を削除
      tokens.pop(); // 最後の)を削除

      const node = new MultiWayTreeNode(tokens[0].value); //ノードを設定
      tokens.shift(); // トークン列から設定したノードに該当するトークンを削除

      // 親ノードと着目しているノードを繋げる
      if (parentNode != null) {
        parentNode.children.push(node);
      }

      if (tokens.length != 0) {
        this.parseChildren(tokens, node);
      }

      return node;
    },
    tokenize(code) {
      console.log("[tokenize]");

      let tokens = [];

      code = code.replace(/\(/g, " ( ");
      code = code.replace(/\)/g, " ) ");
      code = code.replace(/^(\s+)/, "");
      code = code.replace(/(\s+)$/, "");

      for (let cur of code.split(/\s+/)) {
        if (cur.match(/^\(/) != null) {
          tokens.push(new Token(cur, "rpar"));
        } else if (cur.match(/\)$/) != null) {
          tokens.push(new Token(cur, "lpar"));
        } else {
          tokens.push(new Token(cur, "elem"));
        }
      }

      return tokens;
    },
    wat2wasm() {
      console.log("------------");

      let code = this.wasm_code;
      code = code.replace(/\n|\t/gm, "");

      const tokens = this.tokenize(code);
      this.printTokens(tokens);

      const rootNode = this.parse(tokens, null);
      this.printTree(rootNode, 0);

      //      this.multiWayTree();

      console.log("------------");
    },

    /* 
    foo
    */
    zeroPadding(num, len) {
      return (Array(len).join("0") + num).slice(-len);
    },
    toDispCode() {
      for (let i in this.wat_code) {
        this.wat_code_disp +=
          (i % 8 || i == 0 ? "" : " ") +
          (i % 16 || i == 0 ? "" : "\n") +
          this.zeroPadding(this.wat_code[i].toString(16), 2) +
          (i != this.wat_code.length - 1 ? " " : "");
      }
    },
    toRowCode() {
      console.log("toRowCode");

      this.wat_code = [];

      let code = this.wat_code_disp;

      for (let elem of code.split(/\s+/)) {
        this.wat_code.push("0x" + elem);
      }

      console.log(this.wat_code);
    },
    runWasm() {
      console.log("[runWasm]");

      this.toRowCode();
      const code = this.wat_code;

      let functionBody = this.js_code.replace(/\n|\t/g, "");
      const run = new Function("code", functionBody);

      try {
        const result = run(code);
        this.output = result;
        this.errorReported = false;
      } catch (e) {
        this.errorMsg = e;
        this.errorReported = true;
      }
    }
  },
  watch: {},
  created() {
    this.toDispCode();
  },
  mounted() {}
};
</script>

<style scoped>
.codearea {
  font-family: "Ricty Diminished", "Monaco", "Consolas", "Courier New", Courier,
    monospace, sans-serif;
  -moz-tab-size: 2;
  -o-tab-size: 2;
  tab-size: 2;
}
</style>