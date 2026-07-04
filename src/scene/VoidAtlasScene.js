import * as THREE from "three";

import createStarField from "./StarField3D";
import createAxisPole from "./AxisPole";
import CameraRig from "./CameraRig";
import CosmicCarousel3D from "./CosmicCarousel3D";

export default class VoidAtlasScene {
  constructor(canvas) {
    this.canvas = canvas;

    // =========================
    // Scene
    // =========================
    this.scene = new THREE.Scene();

    // =========================
    // Timer
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
    this.axisPole.position.y = -50;

    // =========================
    // Orbit Carousel
    // =========================
    this.carousel = new CosmicCarousel3D();
    this.scene.add(this.carousel.group);

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
    // Update Components
    // =========================
    this.axisPole.update(delta);
    this.carousel.update(delta);
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