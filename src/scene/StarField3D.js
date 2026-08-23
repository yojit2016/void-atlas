import * as THREE from "three";

export default class StarField3D {
  constructor() {
    const count = 12000;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const whiteColor = new THREE.Color("#ffffff");
    const warmColor = new THREE.Color("#fff8e7");
    const coolColor = new THREE.Color("#e8f0ff");

    for (let i = 0; i < count; i++) {
      // Radius between 300 and 5000 units
      let radius = 300 + Math.random() * 4700;
      let theta = Math.random() * Math.PI * 2;
      let phi = Math.acos(2 * Math.random() - 1);

      let x = radius * Math.sin(phi) * Math.cos(theta);
      let y = radius * Math.sin(phi) * Math.sin(theta);
      let z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color assignment
      const colRand = Math.random();
      let starColor = whiteColor;
      if (colRand > 0.92) {
        starColor = coolColor;
      } else if (colRand > 0.8) {
        starColor = warmColor;
      }

      colors[i * 3] = starColor.r;
      colors[i * 3 + 1] = starColor.g;
      colors[i * 3 + 2] = starColor.b;

      // Size distribution: 70% small, 25% medium, 5% large
      const sizeRand = Math.random();
      let size = 0.4 + Math.random() * 0.4;
      if (sizeRand > 0.95) {
        size = 2.5 + Math.random() * 1.5;
      } else if (sizeRand > 0.7) {
        size = 1.2 + Math.random() * 0.8;
      }
      sizes[i] = size;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    this.geometry = geometry;
    this.points = new THREE.Points(geometry, material);

    this.originalPositions = new Float32Array(positions);
    this.warpFactor = 1.0;
    this.elapsed = 0;
  }

  update(delta) {
    this.elapsed += delta;
    const positions = this.geometry.attributes.position.array;
    const speed = delta * 25 * this.warpFactor;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 2] += speed;

      // When star passes camera z = 1200, reset back to z = -3000
      if (positions[i + 2] > 1200) {
        let radius = 300 + Math.random() * 2500;
        let angle = Math.random() * Math.PI * 2;
        positions[i] = Math.cos(angle) * radius;
        positions[i + 1] = Math.sin(angle) * radius;
        positions[i + 2] = -3000;
      }
    }

    this.geometry.attributes.position.needsUpdate = true;
  }

  setWarp(factor) {
    this.warpFactor = Math.max(1.0, Math.min(6.0, factor));
  }
}