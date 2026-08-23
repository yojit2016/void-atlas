import * as THREE from "three";
import { gsap } from "gsap";
import TextureManager from "./TextureManager";
import OrbitLabels from "./OrbitLabels";

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
    
    this.focusedIndex = -1;
    this.textureManager = null;
    this.labels = null;

    this.build();
  }

  build(count = 6) {
    // Clear previous elements
    while(this.group.children.length > 0){
      const child = this.group.children[0];
      this.group.remove(child);
    }
    this.nodes = [];
    this.nodesPerLayer = Math.max(count, 6);

    const layerGroup = new THREE.Group();

    for (let i = 0; i < this.nodesPerLayer; i++) {
      const angle = (i / this.nodesPerLayer) * Math.PI * 2;

      // Card geometry
      const geometry = new THREE.PlaneGeometry(
        this.nodeWidth,
        this.nodeHeight
      );

      const material = new THREE.MeshBasicMaterial({
        color: "#0a0f1d",
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
      });

      const plane = new THREE.Mesh(geometry, material);

      plane.position.set(
        Math.cos(angle) * this.orbitRadius,
        0,
        Math.sin(angle) * this.orbitRadius
      );

      // Face camera position at center
      plane.lookAt(new THREE.Vector3(0, 0, 800));

      // Create glowing neon border outline
      const borderGeo = new THREE.PlaneGeometry(
        this.nodeWidth + 2.5,
        this.nodeHeight + 2.5
      );
      const borderMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#00d2ff"),
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
      });
      const borderMesh = new THREE.Mesh(borderGeo, borderMat);
      borderMesh.position.set(0, 0, -0.2);
      plane.add(borderMesh);
      plane.userData.borderMesh = borderMesh;

      layerGroup.add(plane);
      this.nodes.push(plane);
    }

    this.group.add(layerGroup);
  }

  // =====================================================
  // Apply image textures to every orbit node dynamically
  // =====================================================
  setImages(images) {
    if (!images || !images.length) return;

    this.images = images;
    
    // Rebuild carousel nodes to match exact count of fetched images
    this.build(images.length);

    if (this.labels) {
      this.labels.dispose();
      this.labels = null;
    }

    if (this.textureManager) {
      this.textureManager.dispose();
    }

    this.textureManager = new TextureManager(images);

    this.textureManager.onTextureReady = (index, texture) => {
      const node = this.nodes[index];
      if (!node) return;

      node.material.map = texture;
      node.material.color.set("#ffffff");
      node.material.transparent = false;
      node.material.opacity = 1;
      node.material.needsUpdate = true;

      node.userData = {
        ...node.userData,
        title: images[index].title,
        sourceUrl: images[index].sourceUrl,
        sourceName: images[index].sourceName,
        image: images[index],
      };
    };

    this.nodes.forEach((node, index) => {
      if (images[index]) {
        node.userData = {
          ...node.userData,
          title: images[index].title,
          sourceUrl: images[index].sourceUrl,
          sourceName: images[index].sourceName,
          image: images[index],
        };
      }
      node.material.map = this.textureManager.getTexture(index);
      node.material.needsUpdate = true;
    });

    // Start loading all textures upfront
    this.textureManager.loadAll();

    // ---------- Orbit Labels ----------
    this.labels = new OrbitLabels(this.nodes, images);
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
  this.onFocusChange?.(closestIndex);

  if(this.textureManager)
  {
    this.textureManager.setFocused(this.focusedIndex);
    if (this.labels) {
      this.labels.setFocused(this.focusedIndex);
    }
  }

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

dispose() {
    if (this.textureManager)
    {
      this.textureManager.dispose();
    }

    if (this.labels) {
      this.labels.dispose();
    }
  }

  update(delta) {
    // Reserved for future rotation.
  }
}