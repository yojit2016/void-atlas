import * as THREE from "three";
import createStarField from "./StarField3D";

export default class VoidAtlasScene {
  constructor(canvas) {
    this.canvas = canvas;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      5000
    );

    this.camera.position.set(0, 0, 10);

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

    this.renderer.setClearColor("#000000");

    // STARFIELD
    this.starField = createStarField();
    this.scene.add(this.starField);

    this.animate = this.animate.bind(this);
    this.handleResize = this.handleResize.bind(this);

    window.addEventListener(
      "resize",
      this.handleResize
    );

    this.animationFrame = requestAnimationFrame(
      this.animate
    );
  }

  animate() {
    this.renderer.render(
      this.scene,
      this.camera
    );

    this.animationFrame = requestAnimationFrame(
      this.animate
    );
  }

  handleResize() {
    this.camera.aspect =
      window.innerWidth / window.innerHeight;

    this.camera.updateProjectionMatrix();

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