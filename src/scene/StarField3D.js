import * as THREE from "three";

export default function createStarField() {
  const starCount = 8000;

  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    let x, y, z;
    let distance = 0;

    while (distance < 250) {
      x = (Math.random() - 0.5) * 4000;
      y = (Math.random() - 0.5) * 4000;
      z = (Math.random() - 0.5) * 4000;

      distance = Math.sqrt(
        x * x +
        y * y +
        z * z
      );
    }

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.15,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
    depthWrite: false,
  });

  return new THREE.Points(
    geometry,
    material
  );
}