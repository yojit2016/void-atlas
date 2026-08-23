import * as THREE from 'three';

export default class GalaxyCore {
  constructor() {
    this.group = new THREE.Group();
    this.elapsed = 0;

    this._buildGalaxy();
    this._buildCorGlow();
  }

  _buildGalaxy() {
    const PARTICLE_COUNT = 18000;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    const colorInner = new THREE.Color('#fffbe6'); // warm white-gold core
    const colorMid = new THREE.Color('#00d4ff');   // cyan arms
    const colorOuter = new THREE.Color('#0040ff'); // deep blue outer

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spiral arm math
      const armCount = 3;
      const arm = Math.floor(Math.random() * armCount);
      const armAngle = (arm / armCount) * Math.PI * 2;

      const radius = Math.pow(Math.random(), 0.6) * 320;
      const spinAngle = radius * 0.012;
      const branchAngle = armAngle + spinAngle;

      // Scatter particles off the arm
      const scatter = (1 - Math.pow(radius / 320, 0.5)) * 0.6;
      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * scatter * 60;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * scatter * 60;
      // Very flat — Y is tiny
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 8;

      positions[i * 3]     = Math.cos(branchAngle) * radius + randomX;
      positions[i * 3 + 1] = randomY;
      positions[i * 3 + 2] = Math.sin(branchAngle) * radius + randomZ;

      // Color by radius
      const t = radius / 320;
      let c;
      if (t < 0.3) {
        c = colorInner.clone().lerp(colorMid, t / 0.3);
      } else {
        c = colorMid.clone().lerp(colorOuter, (t - 0.3) / 0.7);
      }
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      // Size by radius — core particles larger
      sizes[i] = Math.max(0.8, (1 - t) * 3.5 + Math.random() * 1.2);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    this.points = new THREE.Points(geo, mat);
    this.group.add(this.points);
  }

  _buildCorGlow() {
    // Bright glowing core — a small sphere of dense particles
    const CORE_COUNT = 800;
    const corePositions = new Float32Array(CORE_COUNT * 3);

    for (let i = 0; i < CORE_COUNT; i++) {
      const r = Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      corePositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      corePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.3;
      corePositions[i * 3 + 2] = r * Math.cos(phi);
    }

    const coreGeo = new THREE.BufferGeometry();
    coreGeo.setAttribute('position', new THREE.Float32BufferAttribute(corePositions, 3));

    const coreMat = new THREE.PointsMaterial({
      color: 0xfff8d6,
      size: 4.0,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    this.corePoints = new THREE.Points(coreGeo, coreMat);
    this.group.add(this.corePoints);
  }

  update(delta) {
    this.elapsed += delta;
    // Slow galaxy rotation — one full turn every 120 seconds
    this.group.rotation.y += delta * 0.052;
    // Subtle breathing pulse on core opacity
    if (this.corePoints) {
      this.corePoints.material.opacity = 0.85 + Math.sin(this.elapsed * 0.8) * 0.1;
    }
  }
}