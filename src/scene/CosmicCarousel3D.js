import * as THREE from "three";
import { gsap } from "gsap";

export default class CosmicCarousel3D {
  constructor() {
    this.group = new THREE.Group();

    // ---------- Layout ----------
    this.orbitRadius = 320;
    this.layerSpacing = 300;
    this.nodesPerLayer = 6;
    this.layerCount = 1;

    this.nodeWidth = 80;
    this.nodeHeight = 52;

    this.nodes = [];

    // NEW
    this.textureLoader = new THREE.TextureLoader();
    this.focusedIndex = -1;

    this.build();
  }

  build() {
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

        const geometry = new THREE.PlaneGeometry(
          this.nodeWidth,
          this.nodeHeight
        );

        const material =
          new THREE.MeshBasicMaterial({
            color: "#4a4a4a",
            transparent: true,
            opacity: 0.65,
            side: THREE.DoubleSide,
          });

        const plane = new THREE.Mesh(
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

        // Face camera position
        plane.lookAt(new THREE.Vector3(0, 0, 800));

        layerGroup.add(plane);

        this.nodes.push(plane);
      }

      this.group.add(layerGroup);
    }
  }

  // =====================================================
  // NEW
  // Apply image textures to every orbit node
  // =====================================================
  setImages(images) {
    console.log("setImages called",images);
    if (!images || !images.length) return;

    this.nodes.forEach((node, index) => {
      const image =
        images[index % images.length];

      if (!image?.image) return;

      this.textureLoader.load(
        image.image,
        (texture) => {
          console.log("Loaded texture", image.title);
          texture.colorSpace =
            THREE.SRGBColorSpace;

          node.material.map = texture;
          node.material.color.set("#ffffff");
          node.material.opacity = 1;
          node.material.transparent = false;

          node.material.needsUpdate = true;

          // Save metadata for later
          node.userData = {
            title: image.title,
            sourceUrl: image.sourceUrl,
            sourceName: image.sourceName,
            image,
          };
          (err) =>{console.error("Texture failed", image.image, err);}
        }
      );
    });
  }

  // =====================================================
  // NEW
  updateFocus(camera) {
  const cameraWorldPos = new THREE.Vector3();
  camera.getWorldPosition(cameraWorldPos);

  let closestIndex = 0;
  let closestDist = Infinity;

  this.nodes.forEach((node, i) => {
    const nodeWorldPos = new THREE.Vector3();
    node.getWorldPosition(nodeWorldPos);

    const dist =
      cameraWorldPos.distanceTo(nodeWorldPos);

    if (dist < closestDist) {
      closestDist = dist;
      closestIndex = i;
    }
  });

  if (closestIndex === this.focusedIndex) return;

  this.focusedIndex = closestIndex;

  this.nodes.forEach((node, i) => {
    const diff = Math.abs(i - closestIndex);

    const wrapped = Math.min(
      diff,
      this.nodes.length - diff
    );

    let targetScale;
    let targetOpacity;

    if (wrapped === 0) {
      targetScale = 1.15;
      targetOpacity = 1.0;
    } else if (wrapped === 1) {
      targetScale = 0.95;
      targetOpacity = 0.85;
    } else {
      targetScale = 0.8;
      targetOpacity = 0.6;
    }

    gsap.to(node.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });

    gsap.to(node.material, {
      opacity: targetOpacity,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  });
}

  update(delta) {
    // Reserved for future rotation.
  }
}