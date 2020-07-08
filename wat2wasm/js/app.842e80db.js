(function(e){function t(t){for(var a,s,c=t[0],i=t[1],l=t[2],d=0,p=[];d<c.length;d++)s=c[d],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&p.push(n[s][0]),n[s]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);u&&u(t);while(p.length)p.shift()();return o.push.apply(o,l||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],a=!0,c=1;c<r.length;c++){var i=r[c];0!==n[i]&&(a=!1)}a&&(o.splice(t--,1),e=s(s.s=r[0]))}return e}var a={},n={app:0},o=[];function s(t){if(a[t])return a[t].exports;var r=a[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=a,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(r,a,function(t){return e[t]}.bind(null,a));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],i=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var u=i;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},3605:function(e,t,r){"use strict";var a=r("6f24"),n=r.n(a);n.a},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var a=r("2b0e"),n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",[r("v-app-bar",{attrs:{app:"",color:"primary",dark:""}}),r("WatToWasm",{staticClass:"page"})],1)},o=[],s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"background"},[r("v-content",[r("v-container",{attrs:{fluid:""}},[r("v-btn",{on:{click:function(t){return e.wat2wasm()}}},[e._v("Wat->Wasm")]),r("v-dialog",{attrs:{fullscreen:"",scrollable:"",transition:"dialog-bottom-transition"},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on;return[r("v-btn",e._g({},a),[e._v("View Tree")])]}}]),model:{value:e.viewTreeDialog,callback:function(t){e.viewTreeDialog=t},expression:"viewTreeDialog"}},[r("v-card",[r("v-card-title",[e._v("Tree")]),r("div",{staticStyle:{"margin-right":"auto"}},[r("v-card-actions",[r("v-btn",{on:{click:function(t){e.viewTreeDialog=!1}}},[e._v("Close")])],1)],1),r("v-card-text",[r("TreeView",{attrs:{moduleTree:e.treeRoot}})],1)],1)],1),r("v-btn",{on:{click:function(t){return e.runWasm()}}},[e._v("Run")]),e.errorReported?r("v-dialog",{attrs:{scrollable:"","max-width":"70%"},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on;return[r("v-btn",e._g({attrs:{color:"error"}},a),[e._v("Error")])]}}],null,!1,3394728838),model:{value:e.errorDialog,callback:function(t){e.errorDialog=t},expression:"errorDialog"}},[r("v-card",[r("v-card-title",[e._v("Error log")]),r("v-card-text",{staticStyle:{height:"300px"}},[r("p",[e._v(e._s(e.errorMsg))])])],1)],1):e._e(),r("v-row",[r("v-col",{attrs:{cols:"12",sm:"6"}},[r("v-textarea",{staticClass:"codearea",attrs:{spellcheck:"false",filled:"",label:"Wat Code","auto-grow":"","background-color":"grey lighten-5",color:"grey darken-4"},model:{value:e.wat_code,callback:function(t){e.wat_code=t},expression:"wat_code"}})],1),r("v-col",{attrs:{cols:"12",sm:"6"}},[r("v-textarea",{staticClass:"codearea",attrs:{spellcheck:"false",filled:"",label:"Wasm Code","auto-grow":"","background-color":"grey lighten-5",color:"grey darken-4"},model:{value:e.wasm_code_disp,callback:function(t){e.wasm_code_disp=t},expression:"wasm_code_disp"}})],1),r("v-col",{attrs:{cols:"12",sm:"6"}},[r("v-card",{staticClass:"mx-auto"},[r("v-card-text",[r("div",{staticClass:"text--primary"},[e._v(e._s(e.js_code)+e._s(e.wasm_function_name))])]),r("v-card-actions",[r("v-text-field",{attrs:{label:"function name & arguments"},model:{value:e.wasm_function_name,callback:function(t){e.wasm_function_name=t},expression:"wasm_function_name"}})],1)],1)],1),r("v-col",{attrs:{cols:"12",sm:"6"}},[r("v-textarea",{staticClass:"codearea",attrs:{readonly:!0,spellcheck:"false",filled:"",label:"Output","auto-grow":"","background-color":"grey lighten-5",color:"grey darken-4"},model:{value:e.output,callback:function(t){e.output=t},expression:"output"}})],1)],1),r("v-card",{staticClass:"mx-auto"},[r("v-card-text",[r("div",{staticClass:"text--primary"},[r("p",{staticClass:"display-1 text--primary"},[e._v("これはなに")]),r("p",[e._v('"WAT->WASM"ボタンでWebAssembly Text Format → WebAssembly の変換を行います。')]),r("p",[e._v('"VIEW TREE"ボタンで生成した WebAssembly バイナリのASTを表示します。')]),r("p",[e._v('"RUN"ボタンで生成した WebAssembly バイナリを実行します')]),r("p",[e._v("まだまだ開発中です。現在は関数名・引数・戻り値が固定された上で、引数同士の四則演算のみ可能です。")])])])],1)],1)],1)],1)},c=[],i=(r("99af"),r("a15b"),r("fb6a"),r("d3b7"),r("ac1f"),r("25f0"),r("466d"),r("5319"),r("1276"),r("b85c")),l=r("d4ec"),u=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("tree-chart",{attrs:{json:e.treeData}})},d=[],p=(r("b0c0"),r("5f73")),f=r.n(p),h={name:"TreeView",components:{TreeChart:f.a},props:{moduleTree:{value:"",children:Array}},data:function(){return{treeData:{name:"",children:[]}}},methods:{toThree:function(){function e(t){if(void 0!==t){for(var r=[],a=0;a<t.length;a++)t[a].children.length<=0?r.push(new Object({name:t[a].value})):r.push(new Object({name:t[a].value,children:e(t[a].children)}));return r}}this.treeData.name=this.moduleTree.value,this.treeData.children=e(this.moduleTree.children)}},watch:{moduleTree:function(){this.toThree()}},created:function(){this.toThree()}},v=h,m=r("2877"),b=Object(m["a"])(v,u,d,!1,null,null,null),g=b.exports,_=function e(t,r){Object(l["a"])(this,e),this.value=t,this.type=r},w=function e(t){Object(l["a"])(this,e),this.value=t,this.children=[]},y={nam:"WatToWasm",components:{TreeView:g},data:function(){return{js_code:"const instance = new WebAssembly.Instance(new WebAssembly.Module(Uint8Array.from(code)));\nreturn 'result: ' + instance.exports.",wasm_function_name:"add(3, 5)",output:"",wat_code:'(module\n\t(func $add (param $lhs i32) (param $rhs i32) (result i32)\n\t\tlocal.get $lhs\n\t\tlocal.get $rhs\n\t\ti32.add)\n\t(export "add" (func $add))\n)',wasm_code:[],wasm_code_disp:"",errorMsg:"",errorDialog:"false",errorReported:!1,viewTreeDialog:!1,treeRoot:{value:""}}},methods:{reportError:function(e){this.errorMsg=e,this.errorReported=!0},clearError:function(){this.errorMsg="",this.errorReported=!1},zeroPadding:function(e,t){return(Array(t).join("0")+e).slice(-t)},toDispCode:function(){for(var e in this.wasm_code_disp=[],this.wasm_code)this.wasm_code_disp+=(e%8||0==e?"":" ")+(e%16||0==e?"":"\n")+this.zeroPadding(this.wasm_code[e].toString(16),2)+(e!=this.wasm_code.length-1?" ":"")},toRowCode:function(){if(console.log("[toRowCode]"),this.wasm_code=[],0!==this.wasm_code_disp.length){var e=this.wasm_code_disp;e=e.replace(/\s+/g,"");for(var t=0;t<e.length;t+=2)this.wasm_code.push("0x"+e.slice(t,t+2))}else console.log("wasm_code_disp is empty")},runWasm:function(){console.log("[runWasm]"),this.clearError(),this.toRowCode();var e=this.wasm_code,t=this.js_code+this.wasm_function_name+";",r=new Function("code",t);try{var a=r(e);this.output=a}catch(n){this.reportError(n)}},printTokens:function(e){console.log("[printTokens]");var t,r=Object(i["a"])(e);try{for(r.s();!(t=r.n()).done;){var a=t.value;console.log("  "+a.type+": "+a.value)}}catch(n){r.e(n)}finally{r.f()}},tokenize:function(e){console.log("[tokenize]");var t=[];e=e.replace(/\(/g," ( ").replace(/\)/g," ) ").replace(/^(\s+)/,"").replace(/(\s+)$/,"");var r,a=Object(i["a"])(e.split(/\s+/));try{for(a.s();!(r=a.n()).done;){var n=r.value;null!=n.match(/^\(/)?t.push(new _(n,"rpar")):null!=n.match(/\)$/)?t.push(new _(n,"lpar")):t.push(new _(n,"elem"))}}catch(o){a.e(o)}finally{a.f()}return t},printTree:function(e,t){if(0===t&&console.log("[printTree]"),null!==e){console.log("  node"+t+" "+e.value),++t;var r,a=Object(i["a"])(e.children);try{for(a.s();!(r=a.n()).done;){var n=r.value;this.printTree(n,t)}}catch(o){a.e(o)}finally{a.f()}}},makeChilfNode:function(e,t){var r=new w(e.value);return null!=t&&t.children.push(r),r},parseChildren:function(e,t){for(var r=[],a=0,n=0,o=0,s=0;s<e.length;s++)"rpar"===e[s].type?++n:"lpar"===e[s].type&&++o,n===o&&(r.push(e.slice(a,s+1)),a=s+1);for(var c=0,i=r;c<i.length;c++){var l=i[c];this.parse(l,t)}},parse:function(e,t){console.log("[parse]"),"rpar"===e[0].type&&e.shift(),"lpar"===e[e.length-1].type&&e.pop();var r=this.makeChilfNode(e[0],t);return e.shift(),0!=e.length&&this.parseChildren(e,r),r},emitter:function(e){var t=[0,97,115,109],r=[1,0,0,0],a=[1,7,1,96,2,127,127,1,127,3,2,1,0,7,7,1,3,97,100,100,0,0,10],n=32,o=106,s=107,c=108,l=109,u=110,d=111,p=112,f=11,h=[];if("module"!==e.value)return this.reportError("'module' not found"),[];h=t.concat(r);var v,m=Object(i["a"])(e.children);try{for(m.s();!(v=m.n()).done;){var b=v.value;switch(b.value){case"func":var g=b.children.slice(4).length+2;h=h.concat(a).concat(g+2,1,g,0);var _,w=Object(i["a"])(b.children.slice(4));try{for(w.s();!(_=w.n()).done;){var y=_.value;switch(y.value){case"local.get":h.push(n);break;case"i32.add":h.push(o);break;case"i32.sub":h.push(s);break;case"i32.mul":h.push(c);break;case"i32.div_s":h.push(l);break;case"i32.div_u":h.push(u);break;case"i32.rem_s":h.push(d);break;case"i32.rem_u":h.push(p);break;case"$lhs":h.push(0);break;case"$rhs":h.push(1);break}}}catch(k){w.e(k)}finally{w.f()}break;case"export":this.printTree(b,0);break}}}catch(k){m.e(k)}finally{m.f()}return h.push(f),console.log(h),h},wat2wasm:function(){this.clearError();var e=this.wat_code.replace(/(;;.*)$/g,"").replace(/\n|\t/g," ").replace(/(\(;).*(;\))/g," "),t=this.tokenize(e),r=this.parse(t,null);this.treeRoot=r;var a=this.emitter(r);this.wasm_code=a,this.toDispCode()}},created:function(){this.toDispCode()},mounted:function(){}},k=y,T=(r("3605"),r("6544")),x=r.n(T),C=r("8336"),j=r("b0af"),O=r("99d9"),W=r("62ad"),V=r("a523"),D=r("a75b"),A=r("169a"),$=r("0fd9"),E=r("8654"),R=r("a844"),S=Object(m["a"])(k,s,c,!1,null,"58443f4d",null),M=S.exports;x()(S,{VBtn:C["a"],VCard:j["a"],VCardActions:O["a"],VCardText:O["b"],VCardTitle:O["c"],VCol:W["a"],VContainer:V["a"],VContent:D["a"],VDialog:A["a"],VRow:$["a"],VTextField:E["a"],VTextarea:R["a"]});var P={name:"App",components:{WatToWasm:M},data:function(){return{}}},z=P,F=(r("e983"),r("b0a0"),r("7496")),N=r("40dc"),B=Object(m["a"])(z,n,o,!1,null,"088d11ad",null),I=B.exports;x()(B,{VApp:F["a"],VAppBar:N["a"]});var J=r("f309");a["a"].use(J["a"]);var U=new J["a"]({});a["a"].config.productionTip=!1,new a["a"]({vuetify:U,render:function(e){return e(I)}}).$mount("#app")},"6f24":function(e,t,r){},"73ec":function(e,t,r){},b0a0:function(e,t,r){"use strict";var a=r("73ec"),n=r.n(a);n.a},e580:function(e,t,r){},e983:function(e,t,r){"use strict";var a=r("e580"),n=r.n(a);n.a}});
//# sourceMappingURL=app.842e80db.js.map