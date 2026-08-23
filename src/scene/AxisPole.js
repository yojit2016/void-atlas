import * as THREE from "three";

export default function createAxisPole() {
  const group = new THREE.Group();

  const STRAND_COUNT = 2;
  const POINTS_PER_STRAND = 1200;
  const HELIX_RADIUS = 45;
  const HELIX_PITCH = 0.06;
  const HELIX_HEIGHT = 380;

  const positions = [];
  const colors = [];

  const topColor = new THREE.Color("#e8f4ff");
  const midColor = new THREE.Color("#00d4ff");
  const bottomColor = new THREE.Color("#0040ff");

  for (let strand = 0; strand < STRAND_COUNT; strand++) {
    const strandOffset = strand * Math.PI;

    for (let i = 0; i < POINTS_PER_STRAND; i++) {
      const progress = i / POINTS_PER_STRAND;
      const y = progress * HELIX_HEIGHT - HELIX_HEIGHT / 2;
      const angle = y * HELIX_PITCH + strandOffset;

      const x = HELIX_RADIUS * Math.cos(angle);
      const z = HELIX_RADIUS * Math.sin(angle);

      positions.push(x, y, z);

      // Color lerp along height
      const vertexColor = new THREE.Color();
      if (progress < 0.5) {
        vertexColor.lerpColors(bottomColor, midColor, progress * 2);
      } else {
        vertexColor.lerpColors(midColor, topColor, (progress - 0.5) * 2);
      }

      colors.push(vertexColor.r, vertexColor.g, vertexColor.b);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3)
  );

  // Primary sharp core strand points
  const primaryMaterial = new THREE.PointsMaterial({
    size: 2.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.92,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });

  const primaryPoints = new THREE.Points(geometry, primaryMaterial);
  group.add(primaryPoints);

  // Secondary soft glow halo layer
  const haloMaterial = new THREE.PointsMaterial({
    size: 6.0,
    vertexColors: true,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });

  const haloPoints = new THREE.Points(geometry, haloMaterial);
  group.add(haloPoints);

  group.elapsed = 0;

  group.update = (delta) => {
    group.elapsed += delta;
    group.rotation.y += delta * 0.08;
    group.position.y = Math.sin(group.elapsed * 0.3) * 4;
  };

  return group;
}