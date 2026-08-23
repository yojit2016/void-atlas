import * as THREE from "three";

export default class CameraRig {
  constructor() {
    // Parent object that moves through the world
    this.group = new THREE.Group();

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      5000
    );

    // Base camera position
    this.baseX = 0;
    this.baseY = 180;
    this.baseZ = 620;

    this.camera.position.set(
      this.baseX,
      this.baseY,
      this.baseZ
    );
    this.camera.rotation.x = -0.28;

    // Parent camera to rig
    this.group.add(this.camera);

    // Mouse targets
    this.targetX = 0;
    this.targetY = 0;

    this.currentX = 0;
    this.currentY = 0;

    this.lookStrength = 4;
    this.smoothing = 0.04;
  }

  setMouse(x, y) {
    this.targetX = x;
    this.targetY = y;
  }

  update() {
    this.currentX +=
      (this.targetX - this.currentX) *
      this.smoothing;

    this.currentY +=
      (this.targetY - this.currentY) *
      this.smoothing;

    // Apply offset relative to the base position
    this.camera.position.x =
      this.baseX +
      this.currentX * this.lookStrength;

    this.camera.position.y =
      this.baseY +
      this.currentY * this.lookStrength * 0.4;
  }

  handleResize(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}