import * as THREE from "three";

export default class CosmicCarousel3D {
  constructor() {
    this.group = new THREE.Group();

    // ---------- Layout ----------
    this.orbitRadius = 250;
    this.layerSpacing = 300;
    this.nodesPerLayer = 4;
    this.layerCount = 5;

    this.nodeWidth = 80;
    this.nodeHeight = 52;

    this.nodes = [];

    this.build();
  }

  build() {
    const geometry = new THREE.PlaneGeometry(
      this.nodeWidth,
      this.nodeHeight
    );

    for (
      let layer = 0;
      layer < this.layerCount;
      layer++
    ) {
      const layerGroup = new THREE.Group();

      layerGroup.position.z =
        -(layer * this.layerSpacing);

      for (
        let i = 0;
        i < this.nodesPerLayer;
        i++
      ) {
        const angle =
          (i / this.nodesPerLayer) *
          Math.PI *
          2;

        const material =
          new THREE.MeshBasicMaterial({
            color: "#4a4a4a",
            transparent: true,
            opacity: 0.65,
            side: THREE.DoubleSide,
          });

        const plane =
          new THREE.Mesh(
            geometry,
            material
          );

        plane.position.set(
          Math.cos(angle) *
            this.orbitRadius,
          0,
          Math.sin(angle) *
            this.orbitRadius
        );

        // Face inward toward helix
        plane.rotation.y = angle + Math.PI;

        layerGroup.add(plane);

        this.nodes.push(plane);
      }

      this.group.add(layerGroup);
    }
  }

  update(delta) {
    // Reserved for future rotation.
  }
}