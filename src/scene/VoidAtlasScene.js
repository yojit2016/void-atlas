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
    // Raycaster (NEW)
    // =========================
    this.raycaster = new THREE.Raycaster();

    this.pointer = new THREE.Vector2();

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

    // NEW
    this.handlePointerDown =
      this.handlePointerDown.bind(this);

    // =========================
    // Events
    // =========================
    window.addEventListener(
      "resize",
      this.handleResize
    );

    // NEW
    this.renderer.domElement.addEventListener(
      "pointerdown",
      this.handlePointerDown
    );

    // =========================
    // Start render loop
    // =========================
    this.animationFrame =
      requestAnimationFrame(this.animate);
  }

  // =========================================
  // NEW: Raycaster click handler
  // =========================================
  handlePointerDown(event) {
    const rect =
      this.renderer.domElement.getBoundingClientRect();

    this.pointer.x =
      ((event.clientX - rect.left) / rect.width) * 2 - 1;

    this.pointer.y =
      -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(
      this.pointer,
      this.camera
    );

    const intersections =
      this.raycaster.intersectObjects(
        this.carousel.nodes,
        false
      );

    if (intersections.length === 0) return;

    const node =
      intersections[0].object;

    const sourceUrl =
      node.userData?.sourceUrl;

    if (sourceUrl) {
      window.open(
        sourceUrl,
        "_blank",
        "noopener,noreferrer"
      );
    }
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

    // NEW
    this.renderer.domElement.removeEventListener(
      "pointerdown",
      this.handlePointerDown
    );

    this.renderer.dispose();
  }
}
