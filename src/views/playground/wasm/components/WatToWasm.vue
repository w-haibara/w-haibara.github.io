<template class="page">
  <div class="background">
    <v-content>
      <v-container fluid>
        <v-btn v-on:click="wat2wasm()">Wat->Wasm</v-btn>

        <v-dialog
          v-model="viewTreeDialog"
          fullscreen
          scrollable
          transition="dialog-bottom-transition"
        >
          <template v-slot:activator="{ on }">
            <v-btn v-on="on">View Tree</v-btn>
          </template>
          <v-card>
            <v-card-title>Tree</v-card-title>
            <div style="margin-right:auto;">
              <v-card-actions>
                <v-btn v-on:click="viewTreeDialog=false">Close</v-btn>
              </v-card-actions>
            </div>
            <v-card-text>
              <TreeView :moduleTree="treeRoot" />
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-btn v-on:click="runWasm()">Run</v-btn>

        <v-dialog v-if="errorReported" v-model="errorDialog" scrollable max-width="70%">
          <template v-slot:activator="{ on }">
            <v-btn color="error" v-on="on">Error</v-btn>
          </template>
          <v-card>
            <v-card-title>Error log</v-card-title>
            <v-card-text style="height: 300px;">
              <p>{{ errorMsg }}</p>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-row>
          <v-col cols="12" sm="6">
            <v-textarea
              class="codearea"
              spellcheck="false"
              filled
              label="Wat Code"
              auto-grow
              background-color="grey lighten-5"
              color="grey darken-4"
              v-model="wat_code"
            ></v-textarea>
          </v-col>
          <v-col cols="12" sm="6">
            <v-textarea
              class="codearea"
              spellcheck="false"
              filled
              label="Wasm Code"
              auto-grow
              background-color="grey lighten-5"
              color="grey darken-4"
              v-model="wasm_code_disp"
            ></v-textarea>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card class="mx-auto">
              <v-card-text>
                <div class="text--primary">{{js_code}}{{wasm_function_name}}</div>
              </v-card-text>
              <v-card-actions>
                <v-text-field label="function name & arguments" v-model="wasm_function_name"></v-text-field>
              </v-card-actions>
            </v-card>
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
        </v-row>
        <v-card class="mx-auto">
          <v-card-text>
            <div class="text--primary">
              <p class="display-1 text--primary">これはなに</p>
              <p>"WAT->WASM"ボタンでWebAssembly Text Format → WebAssembly の変換を行います。</p>
              <p>"VIEW TREE"ボタンで生成した WebAssembly バイナリのASTを表示します。</p>
              <p>"RUN"ボタンで生成した WebAssembly バイナリを実行します</p>
              <p>まだまだ開発中です。現在は関数名・引数・戻り値が固定された上で、引数同士の四則演算のみ可能です。</p>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </v-content>
  </div>
</template>


<script>
import TreeView from "./TreeView";

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
  nam: "WatToWasm",
  components: {
    TreeView
  },
  data: () => ({
    js_code:
      "const instance = new WebAssembly.Instance(new WebAssembly.Module(Uint8Array.from(code)));\nreturn 'result: ' + instance.exports.",
    wasm_function_name: "add(3, 5)",
    output: "",
    wat_code:
      '(module\n\t(func $add (param $lhs i32) (param $rhs i32) (result i32)\n\t\tlocal.get $lhs\n\t\tlocal.get $rhs\n\t\ti32.add)\n\t(export "add" (func $add))\n)',
    wasm_code: [],
    wasm_code_disp: "",
    errorMsg: "",
    errorDialog: "false",
    errorReported: false,
    viewTreeDialog: false,
    treeRoot: { value: "" }
  }),
  methods: {
    /*--------------------*
     * Util
     *--------------------*/
    reportError(msg) {
      this.errorMsg = msg;
      this.errorReported = true;
    },
    clearError() {
      this.errorMsg = "";
      this.errorReported = false;
    },
    zeroPadding(num, len) {
      return (Array(len).join("0") + num).slice(-len);
    },
    toDispCode() {
      this.wasm_code_disp = [];

      for (let i in this.wasm_code) {
        this.wasm_code_disp +=
          (i % 8 || i == 0 ? "" : " ") +
          (i % 16 || i == 0 ? "" : "\n") +
          this.zeroPadding(this.wasm_code[i].toString(16), 2) +
          (i != this.wasm_code.length - 1 ? " " : "");
      }
    },
    toRowCode() {
      console.log("[toRowCode]");

      this.wasm_code = [];
      if (this.wasm_code_disp.length === 0) {
        console.log("wasm_code_disp is empty");
        return;
      }

      let code = this.wasm_code_disp;
      code = code.replace(/\s+/g, "");

      for (let i = 0; i < code.length; i += 2) {
        this.wasm_code.push("0x" + code.slice(i, i + 2));
      }
    },
    runWasm() {
      console.log("[runWasm]");

      this.clearError();

      this.toRowCode();

      const code = this.wasm_code;

      let functionBody = this.js_code + this.wasm_function_name + ";";
      const run = new Function("code", functionBody);

      try {
        const result = run(code);
        this.output = result;
      } catch (e) {
        this.reportError(e);
      }
    },

    /*--------------------*
     * Compiler
     *--------------------*/

    /*
     * Tokenizer
     */
    printTokens(tokens) {
      console.log("[printTokens]");
      for (let token of tokens) {
        console.log("  " + token.type + ": " + token.value);
      }
    },
    tokenize(code) {
      console.log("[tokenize]");

      let tokens = [];

      code = code
        .replace(/\(/g, " ( ")
        .replace(/\)/g, " ) ")
        .replace(/^(\s+)/, "")
        .replace(/(\s+)$/, "");

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

    /*
     * Parser
     */
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
    makeChilfNode(token, parentNode) {
      const node = new MultiWayTreeNode(token.value); //ノードを設定

      // 親ノードと着目しているノードを繋げる
      if (parentNode != null) {
        parentNode.children.push(node);
      }

      return node;
    },
    /* 子ノードをそれぞれのトークン列に分割 */
    parseChildren(tokens, parentNode) {
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
          childrenTokens.push(tokens.slice(childrenIndex, i + 1));
          childrenIndex = i + 1;
        }
      }

      for (let token of childrenTokens) {
        //console.log(token);
        this.parse(token, parentNode);
      }
    },
    parse(tokens, parentNode) {
      /* parse時のエラーの報告 */
      /*
      function parseError(msg) {
        console.error("parse error [" + msg + "]");
      }
      */

      console.log("[parse]");

      if (tokens[0].type === "rpar") {
        tokens.shift(); // 最初の(を削除
      }
      if (tokens[tokens.length - 1].type === "lpar") {
        tokens.pop(); // 最後の)を削除
      }

      const node = this.makeChilfNode(tokens[0], parentNode);
      tokens.shift(); // トークン列から設定したノードに該当するトークンを削除

      if (tokens.length != 0) {
        this.parseChildren(tokens, node);
      }

      return node;
    },

    /*
     * Emitter
     */
    emitter(node) {
      const magicModuleHeader = [0x00, 0x61, 0x73, 0x6d];
      const moduleVersion = [0x01, 0x00, 0x00, 0x00];

      const tmp = [
        0x01,
        0x07,
        0x01,
        0x60,
        0x02,
        0x7f,
        0x7f,
        0x01,
        0x7f,
        0x03,
        0x02,
        0x01,
        0x00,
        0x07,
        0x07,
        0x01,
        0x03,
        0x61,
        0x64,
        0x64,
        0x00,
        0x00,
        0x0a
      ];

      const local_get = 0x20;
      const i32_add = 0x6a;
      const i32_sub = 0x6b;
      const i32_mul = 0x6c;
      const i32_div_s = 0x6d;
      const i32_div_u = 0x6e;
      const i32_rem_s = 0x6f;
      const i32_rem_u = 0x70;
      const end = 0x0b;

      let code = [];

      if (node.value === "module") {
        code = magicModuleHeader.concat(moduleVersion);
      } else {
        this.reportError("'module' not found");
        return [];
      }

      for (let rootChild of node.children) {
        switch (rootChild.value) {
          case "func":
            {
              let count = rootChild.children.slice(4).length + 2;
              code = code.concat(tmp).concat(count + 2, 0x01, count, 0x00);
            }
            for (let node of rootChild.children.slice(4)) {
              switch (node.value) {
                case "local.get":
                  code.push(local_get);
                  break;
                case "i32.add":
                  code.push(i32_add);
                  break;
                case "i32.sub":
                  code.push(i32_sub);
                  break;
                case "i32.mul":
                  code.push(i32_mul);
                  break;
                case "i32.div_s":
                  code.push(i32_div_s);
                  break;
                case "i32.div_u":
                  code.push(i32_div_u);
                  break;
                case "i32.rem_s":
                  code.push(i32_rem_s);
                  break;
                case "i32.rem_u":
                  code.push(i32_rem_u);
                  break;
                case "$lhs":
                  code.push(0x00);
                  break;
                case "$rhs":
                  code.push(0x01);
                  break;
              }
            }
            break;
          case "export":
            this.printTree(rootChild, 0);
            break;
        }
      }

      code.push(end);

      console.log(code);

      return code;
    },

    /*
     * War code to Wasm bytecode
     */
    wat2wasm() {
      this.clearError();

      const wat_code = this.wat_code
        .replace(/(;;.*)$/g, "") //delete line comments
        .replace(/\n|\t/g, " ")
        .replace(/(\(;).*(;\))/g, " "); //delete block comments

      const tokens = this.tokenize(wat_code);
      //this.printTokens(tokens);

      const rootNode = this.parse(tokens, null);
      this.treeRoot = rootNode;

      const wasm_code = this.emitter(rootNode);
      this.wasm_code = wasm_code;
      this.toDispCode();
    }
  },
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