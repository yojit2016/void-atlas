import * as THREE from "three";

export default class StarField3D {
  constructor() {
    const starCount = 4000;

    this.positions = new Float32Array(
      starCount * 3
    );

    this.originalPositions =
      new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const x =
        (Math.random() - 0.5) * 4000;

      const y =
        (Math.random() - 0.5) * 2500;

      const z =
        (Math.random() - 0.5) * 4000;

      this.positions[i * 3] = x;
      this.positions[i * 3 + 1] = y;
      this.positions[i * 3 + 2] = z;

      this.originalPositions[i * 3] = x;
      this.originalPositions[i * 3 + 1] = y;
      this.originalPositions[i * 3 + 2] = z;
    }

    const geometry =
      new THREE.BufferGeometry();

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        this.positions,
        3
      )
    );

    const material =
      new THREE.PointsMaterial({
        color: "#ffffff",
        size: 2,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.85,
      });

    this.geometry = geometry;

    this.points =
      new THREE.Points(
        geometry,
        material
      );

    this.warpFactor = 1.0;
  }

  update(delta) {
    const positions = this.positions;

    const speed =
      80 * this.warpFactor;

    for (
      let i = 0;
      i < positions.length;
      i += 3
    ) {
      positions[i + 2] +=
        delta * speed;

      if (positions[i + 2] > 850) {
        positions[i] =
          (Math.random() - 0.5) *
          4000;

        positions[i + 1] =
          (Math.random() - 0.5) *
          2500;

        positions[i + 2] = -2000;
      }
    }

    this.geometry.attributes.position.needsUpdate =
      true;
  }

  setWarp(factor) {
    this.warpFactor = factor;
  }
}