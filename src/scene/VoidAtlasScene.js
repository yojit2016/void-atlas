import * as THREE from "three";

import createStarField from "./StarField3D";
import createAxisPole from "./AxisPole";
import CameraRig from "./CameraRig";

export default class VoidAtlasScene {
  constructor(canvas) {
    this.canvas = canvas;

    // =========================
    // Scene
    // =========================
    this.scene = new THREE.Scene();

    // =========================
    // Timer
    // (Clock will be replaced by Timer in a future cleanup.)
    // =========================
    this.clock = new THREE.Clock();

    // =========================
    // Camera Rig
    // =========================
    this.cameraRig = new CameraRig();

    this.scene.add(this.cameraRig.group);

    this.camera = this.cameraRig.camera;

    // =========================
    // Renderer
    // =========================
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
    });

    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    this.renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    this.renderer.setClearColor("#020208");

    // =========================
    // Starfield
    // =========================
    this.starField = createStarField();

    this.scene.add(this.starField);

    // =========================
    // Helix
    // =========================
    this.axisPole = createAxisPole();

    this.scene.add(this.axisPole);

    // =========================
    // Bindings
    // =========================
    this.animate = this.animate.bind(this);
    this.handleResize = this.handleResize.bind(this);

    window.addEventListener(
      "resize",
      this.handleResize
    );

    this.animationFrame =
      requestAnimationFrame(this.animate);
  }

  animate() {
    const delta = this.clock.getDelta();

    // =========================
    // Update Scene Components
    // =========================
    this.axisPole.update(delta);

    this.cameraRig.update(delta);

    this.renderer.render(
      this.scene,
      this.camera
    );

    this.animationFrame =
      requestAnimationFrame(this.animate);
  }

  handleResize() {
    this.cameraRig.handleResize(
      window.innerWidth,
      window.innerHeight
    );

    this.renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );
  }

  destroy() {
    cancelAnimationFrame(this.animationFrame);

    window.removeEventListener(
      "resize",
      this.handleResize
    );

    this.renderer.dispose();
  }
}