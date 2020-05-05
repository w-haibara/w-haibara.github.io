<template>
  <v-app id>
    <v-content class="blue-grey darken-4">
      <v-row justify="space-around" no-gutters>
        <canvas id="canvas"></canvas>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
import * as THREE from "three";

const canvas_width = 960;
const canvas_height = 540;

export default {
  data: () => ({
    stop: false,
    box: null,
    renderer: null,
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(
      45,
      canvas_width / canvas_height,
      1,
      10000
    ),
    rot: 0
  }),
  computed: {
    width: () => canvas_width,
    height: () => canvas_height
  },
  methods: {
    init() {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: document.querySelector("#canvas")
      });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.width, this.height);

      this.camera.position.set(0, 500, +1000);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      const directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(1, 1, 1);
      this.scene.add(directionalLight);

      const gnd = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 1000),
        new THREE.MeshStandardMaterial(0x00ff00)
      );
      gnd.rotation.x = -Math.PI / 2;
      this.scene.add(gnd);

      const container = new THREE.Object3D();
      this.scene.add(container);

      const geometryList = [
        new THREE.SphereGeometry(50), // 球体
        new THREE.BoxGeometry(100, 100, 100), // 直方体
        new THREE.PlaneGeometry(100, 100), // 平面
        new THREE.TetrahedronGeometry(100, 0), // カプセル形状
        new THREE.ConeGeometry(100, 100, 32), // 三角錐
        new THREE.CylinderGeometry(50, 50, 100, 32), // 円柱
        new THREE.TorusGeometry(50, 30, 16, 100) // ドーナツ形状
      ];

      geometryList.map((geometry, index) => {
        const mesh = new THREE.Mesh(
          geometry,
          new THREE.MeshStandardMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide
          })
        );
        container.add(mesh);
        mesh.position.x =
          400 * Math.sin((index / geometryList.length) * Math.PI * 2);
        mesh.position.z =
          400 * Math.cos((index / geometryList.length) * Math.PI * 2);
        mesh.position.y = 52;
      });

      this.tick();
    },
    tick() {
      if (this.stop) {
        return;
      }

      /*
       * ここでアニメーションを記述
       */

      this.rot += 0.04;

      // ラジアンに変換する
      const radian = (this.rot * Math.PI) / 180;
      // 角度に応じてカメラの位置を設定
      this.camera.position.x = 1000 * Math.sin(radian);
      this.camera.position.z = 1000 * Math.cos(radian);
      // 原点方向を見つめる
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));

      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.tick);
    },

    orbit() {
      // サイズを指定
      const width = 960;
      const height = 540;

      // レンダラーを作成
      const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#myCanvas")
      });
      renderer.setSize(width, height);

      // シーンを作成
      const scene = new THREE.Scene();

      // カメラを作成
      const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
      camera.position.set(0, 0, 1000);

      // カメラコントローラーを作成
//      const controls = new THREE.OrbitControls(camera);

      // 形状とマテリアルからメッシュを作成します
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(300, 300, 300),
        new THREE.MeshNormalMaterial()
      );
      scene.add(mesh);

      tick();

      // 毎フレーム時に実行されるループイベントです
      function tick() {
        // レンダリング
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
      }
    }
  },
  created() {},
  mounted() {
        this.init();
    //this.orbit();
  },
  beforeDestroy() {
    this.stop = true;
  }
};
</script>

<style></style>